import {PinoLogger} from 'nestjs-pino';
import {
    BSC_BASED_CURRENCIES,
    bscGetGasPriceInWei,
    CONTRACT_ADDRESSES,
    Currency,
    DeployEthErc20,
    EstimateGasEth,
    generateAddressFromXPub,
    generatePrivateKeyFromMnemonic,
    generateWallet,
    prepareBscOrBep20SignedTransaction,
    prepareBscSmartContractWriteMethodInvocation,
    prepareCustomBep20SignedTransaction,
    prepareDeployBep20SignedTransaction,
    sendBscSmartContractReadMethodInvocationTransaction,
    SmartContractMethodInvocation,
    TransactionHash,
    TransferBscBep20,
    TransferCustomErc20,
} from '@tatumio/tatum';
import Web3 from 'web3';
import {fromWei} from 'web3-utils';
import ERC20_TOKEN_ABI from '@tatumio/tatum/dist/src/contracts/erc20/token_abi';
import axios from 'axios';
import {SignatureId} from '@tatumio/tatum/dist/src/model/response/common/SignatureId';
import {BscError} from './BscError';
import {Block} from 'web3-eth';
import BigNumber from 'bignumber.js';

export abstract class BscService {

    private static mapBlock(block: any) {
        return {
            difficulty: parseInt(block.difficulty, 16),
            extraData: block.extraData,
            gasLimit: parseInt(block.gasLimit, 16),
            gasUsed: parseInt(block.gasUsed, 16),
            hash: block.hash,
            logsBloom: block.logsBloom,
            miner: block.miner,
            nonce: block.nonce,
            number: parseInt(block.number, 16),
            parentHash: block.parentHash,
            sha3Uncles: block.sha3Uncles,
            size: parseInt(block.size, 16),
            stateRoot: block.stateRoot,
            timestamp: parseInt(block.timestamp, 16),
            totalDifficulty: parseInt(block.totalDifficulty, 16),
            transactions: block.transactions.map(BscService.mapTransaction),
            uncles: block.uncles,
        };
    }

    private static mapTransaction(tx: any) {
        return {
            ...tx,
            blockNumber: parseInt(tx.blockNumber, 16),
            gas: parseInt(tx.gas, 16),
            nonce: parseInt(tx.nonce, 16),
            transactionIndex: parseInt(tx.transactionIndex, 16),
            value: new BigNumber(tx.value).toString(),
            gasUsed: new BigNumber(tx.gasUsed).toString(),
            cumulativeGasUsed: new BigNumber(tx.cumulativeGasUsed).toString(),
            status: parseInt(tx.status || '1', 16),
            logs: (tx.logs || []).map(l => ({
                ...l,
                logIndex: parseInt(l.logIndex, 16),
                transactionIndex: parseInt(l.transactionIndex, 16),
                blockNumber: parseInt(l.blockNumber, 16),
            }))
        };
    };

    protected constructor(protected readonly logger: PinoLogger) {
    }

    protected abstract isTestnet(): Promise<boolean>

    protected abstract getNodesUrl(testnet: boolean): Promise<string[]>

    protected abstract storeKMSTransaction(txData: string, currency: string, signatureId: string[]): Promise<string>;

    protected abstract completeKMSTransaction(txId: string, signatureId: string): Promise<void>;

    private async getFirstNodeUrl(testnet: boolean): Promise<string> {
        const nodes = await this.getNodesUrl(testnet);
        if (nodes.length === 0) {
            new BscError('Nodes url array must have at least one element.', 'bsc.nodes.url');
        }
        return nodes[0];
    }

    private async getClient(testnet: boolean): Promise<Web3> {
        return new Web3(await this.getFirstNodeUrl(testnet));
    }

    public async broadcast(txData: string, signatureId?: string, withdrawalId?: string): Promise<{
        txId: string,
        failed?: boolean,
    }> {
        this.logger.info(`Broadcast tx for BSC with data '${txData}'`);
        const client = await this.getClient(await this.isTestnet());
        const result: { txId: string } = await new Promise((async (resolve, reject) => {
            client.eth.sendSignedTransaction(txData)
                .once('transactionHash', txId => resolve({txId}))
                .on('error', e => reject(new BscError(`Unable to broadcast transaction due to ${e.message}.`, 'bsc.broadcast.failed')));
        }));

        if (signatureId) {
            try {
                await this.completeKMSTransaction(result.txId, signatureId);
            } catch (e) {
                this.logger.error(e);
                return {txId: result.txId, failed: true};
            }
        }

        return result;
    }

    public async getCurrentBlock(testnet?: boolean): Promise<number> {
        const t = testnet === undefined ? await this.isTestnet() : testnet;
        return (await this.getClient(t)).eth.getBlockNumber();
    }

    public async getBlock(hash: string | number, testnet?: boolean) {
        const t = testnet === undefined ? await this.isTestnet() : testnet;
        try {
            const isHash = typeof hash === 'string' && hash.length >= 64;
            const block = (await axios.post(await this.getFirstNodeUrl(t), {
                jsonrpc: '2.0',
                id: 0,
                method: isHash ? 'eth_getBlockByHash' : 'eth_getBlockByNumber',
                params: [
                    isHash ? hash : `0x${new BigNumber(hash).toString(16)}`,
                    true
                ]
            }, {headers: {'Content-Type': 'application/json'}})).data.result;
            return BscService.mapBlock(block);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async getTransaction(txId: string, testnet?: boolean) {
        const t = testnet === undefined ? await this.isTestnet() : testnet;
        try {
            const {r, s, v, hash, ...transaction} = (await axios.post(await this.getFirstNodeUrl(t), {
                jsonrpc: '2.0',
                id: 0,
                method: 'eth_getTransactionByHash',
                params: [
                    txId
                ]
            }, {headers: {'Content-Type': 'application/json'}})).data?.result;
            let receipt = {};
            try {
                receipt = (await axios.post(await this.getFirstNodeUrl(t), {
                    jsonrpc: '2.0',
                    id: 0,
                    method: 'eth_getTransactionReceipt',
                    params: [
                        txId
                    ]
                }, {headers: {'Content-Type': 'application/json'}})).data?.result;
            } catch (_) {
                transaction.transactionHash = hash;
            }
            return BscService.mapTransaction({...transaction, ...receipt});
        } catch (e) {
            this.logger.error(e);
            throw new BscError('Transaction not found. Possible not exists or is still pending.', 'tx.not.found');
        }
    }

    private async broadcastOrStoreKMSTransaction({transactionData, signatureId}: BroadcastOrStoreKMSTransaction) {
        if (signatureId) {
            return {
                signatureId: await this.storeKMSTransaction(transactionData, Currency.BSC, [signatureId]),
            };
        }
        return this.broadcast(transactionData);
    }

    public async web3Method(body: any) {
        const node = await this.getFirstNodeUrl(await this.isTestnet());
        return (await axios.post(node, body, {headers: {'Content-Type': 'application/json'}})).data;
    }

    public async generateWallet(mnemonic?: string) {
        return generateWallet(Currency.BSC, await this.isTestnet(), mnemonic);
    }

    public async generatePrivateKey(mnemonic: string, index: number) {
        const key = await generatePrivateKeyFromMnemonic(Currency.BSC, await this.isTestnet(), mnemonic, index);
        return {key};
    }

    public async generateAddress(xpub: string, derivationIndex: string): Promise<{ address: string }> {
        const address = await generateAddressFromXPub(Currency.BSC, await this.isTestnet(), xpub, parseInt(derivationIndex));
        return {address};
    }

    public async estimateGas(body: EstimateGasEth) {
        const client = await this.getClient(await this.isTestnet());
        return {
            gasLimit: await client.eth.estimateGas(body),
            gasPrice: await bscGetGasPriceInWei(),
        };
    }

    public async getBalance(address: string): Promise<{ balance: string }> {
        const client = await this.getClient(await this.isTestnet());
        return {balance: fromWei(await client.eth.getBalance(address), 'ether')};
    }

    public async getBep20Balance(address: string, currency?: string, contractAddress?: string): Promise<{ balance: string }> {
        if (await this.isTestnet() && currency) {
            throw new BscError('Unsupported BEP20 currency for testnet, only mainet supports currency parameter. Please use contractAddress instead.', 'bep20.not.supported');
        }
        const contract = currency && BSC_BASED_CURRENCIES.includes(currency) ? CONTRACT_ADDRESSES[currency] : contractAddress;

        const client = await this.getClient(await this.isTestnet());
        // @ts-ignore
        const web3Contract = new client.eth.Contract(ERC20_TOKEN_ABI, contract);
        return {balance: await web3Contract.methods.balanceOf(address).call()};
    }

    public async sendBscOrBep20Transaction(transfer: TransferBscBep20): Promise<TransactionHash | SignatureId> {
        const transactionData = await prepareBscOrBep20SignedTransaction(transfer, await this.getFirstNodeUrl(await this.isTestnet()));
        return this.broadcastOrStoreKMSTransaction({transactionData, signatureId: transfer.signatureId});
    }

    public async sendCustomBep20Transaction(transferCustomErc20: TransferCustomErc20): Promise<TransactionHash | SignatureId> {
        const transactionData = await prepareCustomBep20SignedTransaction(transferCustomErc20, await this.getFirstNodeUrl(await this.isTestnet()));
        return this.broadcastOrStoreKMSTransaction({transactionData, signatureId: transferCustomErc20.signatureId});
    }

    public async getTransactionCount(address: string) {
        const client = await this.getClient(await this.isTestnet());
        return client.eth.getTransactionCount(address, 'pending');
    }

    public async invokeSmartContractMethod(smartContractMethodInvocation: SmartContractMethodInvocation) {
        const node = await this.getFirstNodeUrl(await this.isTestnet());
        if (smartContractMethodInvocation.methodABI.stateMutability === 'view') {
            return sendBscSmartContractReadMethodInvocationTransaction(smartContractMethodInvocation, node);
        }

        const transactionData = await prepareBscSmartContractWriteMethodInvocation(smartContractMethodInvocation, node);
        return this.broadcastOrStoreKMSTransaction({
            transactionData,
            signatureId: smartContractMethodInvocation.signatureId
        });
    }

    public async deployBep20(deploy: DeployEthErc20) {
        const transactionData = await prepareDeployBep20SignedTransaction(deploy, await this.getFirstNodeUrl(await this.isTestnet()));
        return this.broadcastOrStoreKMSTransaction({transactionData, signatureId: deploy.signatureId});
    }
}
