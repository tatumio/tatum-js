import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import {generateTronWallet, TransferTron, TronAccount, TronBlock, TronTransaction} from '@tatumio/tatum';
import {prepareTronSignedTransaction} from '@tatumio/tatum/dist/src/transaction/tron';

export abstract class TronBlockchainService {

    private static mapTransaction(t: any): TronTransaction {
        return {
            ret: t.ret,
            signature: t.signature,
            txID: t.txID,
            netFee: t.net_fee,
            netUsage: t.net_usage,
            energyFee: t.energy_fee,
            energyUsage: t.energy_usage,
            energyUsageTotal: t.energy_usage_total,
            internalTransactions: t.internal_transactions,
            rawData: t.raw_data,
        }
    }

    protected constructor(protected readonly logger: PinoLogger) {
    }

    protected abstract isTestnet(): Promise<boolean>;

    protected abstract getNodesUrl(): Promise<string[]>;

    public async broadcast(txData: string, signatureId?: string) {
        const url = (await this.getNodesUrl())[0];
        const broadcast = (await axios.post(`${url}/wallet/broadcasttransaction`, JSON.parse(txData))).data;
        if (broadcast.result) {
            return {txId: broadcast.txid};
        }
        throw new Error(`Broadcast failed due to ${broadcast.message}`);
    }

    public async getBlockChainInfo(): Promise<{ testnet: boolean, hash: string, blockNumber: number }> {
        const [urls, testnet] = await Promise.all([this.getNodesUrl(), this.isTestnet()]);
        const block = (await axios.post(urls[0] + '/wallet/getnowblock')).data;
        return {testnet, hash: block.blockID, blockNumber: block.block_header.raw_data.number};
    }

    public async getBlock(hashOrHeight: string): Promise<TronBlock> {
        const url = (await this.getNodesUrl())[0];
        let block;
        if (hashOrHeight.length > 32) {
            block = (await axios.post(`${url}/wallet/getblockbyid`, {value: hashOrHeight})).data;
        } else {
            block = (await axios.post(`${url}/wallet/getblockbynum`, {num: parseInt(hashOrHeight)})).data;
        }
        return {
            blockNumber: block.block_header.raw_data.number,
            hash: block.blockID,
            parentHash: block.block_header.raw_data.parentHash,
            timestamp: block.block_header.raw_data.timestamp,
            witnessAddress: block.block_header.raw_data.witness_address,
            witnessSignature: block.block_header.witness_signature,
            transactions: block.transactions?.map(TronBlockchainService.mapTransaction) || [],
        };
    }

    public async getTransaction(txId: string): Promise<TronTransaction> {
        const url = (await this.getNodesUrl())[0];
        const [{data: tx}, {data: info}] = await Promise.all([axios.post(`${url}/wallet/gettransactionbyid`, {value: txId}),
            axios.post(`${url}/wallet/gettransactioninfobyid`, {value: txId})])
        return TronBlockchainService.mapTransaction({...tx, ...info.receipt});
    }

    public async getAccount(address: string): Promise<TronAccount> {
        const url = (await this.getNodesUrl())[0];
        const accounts = (await axios.post(`${url}/wallet/getaccount`, {address, visible: address.length === 34})).data;
        if (!accounts.data?.length) {
            throw new Error('No such account.');
        }
        const acc = accounts.data[0];
        return {
            address: acc.add,
            assetIssuedId: acc.asset_issued_ID,
            assetIssuedName: acc.asset_issued_name,
            balance: acc.balance,
            createTime: acc.create_time,
            freeNetUsage: acc.free_net_usage,
            trc10: acc.assetV2,
            trc20: acc.trc20,
        };
    }

    public async getTransactionsByAccount(address: string, next?: string): Promise<{ transactions: TronTransaction[], next?: string }> {
        const url = (await this.getNodesUrl())[0];
        let u = `${url}/v1/accounts/${address}/transactions?limit=200`;
        if (next) {
            u += '&fingerprint=' + next;
        }
        const result = (await axios.get(u)).data;
        return {
            transactions: result.data.map(TronBlockchainService.mapTransaction),
            next: result.meta?.fingerprint
        };
    }

    public generateWallet() {
        return generateTronWallet();
    }

    public async sendTransaction(body: TransferTron) {
        return this.broadcast(await prepareTronSignedTransaction(await this.isTestnet(), body));
    }
}
