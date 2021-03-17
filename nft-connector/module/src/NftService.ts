import {PinoLogger} from 'nestjs-pino';
import {NftError} from './NftError';
import {
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    Currency,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    prepareCeloBurnErc721SignedTransaction,
    prepareCeloDeployErc721SignedTransaction,
    prepareCeloMintErc721SignedTransaction,
    prepareCeloMintMultipleErc721SignedTransaction,
    prepareCeloTransferErc721SignedTransaction,
    prepareEthBurnErc721SignedTransaction,
    prepareEthDeployErc721SignedTransaction,
    prepareEthMintErc721SignedTransaction,
    prepareEthMintMultipleErc721SignedTransaction,
    prepareEthTransferErc721SignedTransaction,
    TransactionHash
} from '@tatumio/tatum';
import erc721_abi from '@tatumio/tatum/dist/src/contracts/erc721/erc721_abi';
import Web3 from 'web3';
import {Transaction, TransactionReceipt} from 'web3-eth';

export abstract class NftService {

    protected constructor(protected readonly logger: PinoLogger) {
    }

    protected abstract storeKMSTransaction(txData: string, currency: string, signatureId: string[]): Promise<string>;

    protected abstract isTestnet(): Promise<boolean>;

    protected abstract getNodesUrl(chain: Currency, testnet: boolean): Promise<string[]>;

    protected abstract broadcast(chain: Currency, txData: string, signatureId?: string)

    public async getMetadataErc721(chain: Currency, token: string, contractAddress: string): Promise<{ data: string }> {
        // @ts-ignore
        const c = new (await this.getClient(chain, await this.isTestnet())).eth.Contract(erc721_abi, contractAddress);
        try {
            return {data: await c.methods.tokenURI(token).call()};
        } catch (e) {
            this.logger.error(e);
            throw new NftError(`Unable to obtain information for token. ${e}`, 'nft.erc721.failed');
        }
    }

    public async getTokensOfOwner(chain: Currency, address: string, contractAddress: string): Promise<{ data: string }> {
        // @ts-ignore
        const c = new (await this.getClient(chain, await this.isTestnet())).eth.Contract(erc721_abi, contractAddress);
        try {
            return {data: await c.methods.tokensOfOwner(address).call()};
        } catch (e) {
            this.logger.error(e);
            throw new NftError(`Unable to obtain information for token. ${e}`, 'nft.erc721.failed');
        }
    }

    public async getTransaction(chain: Currency, txId: string): Promise<Transaction & TransactionReceipt> {
        try {
            const web3 = await this.getClient(chain, await this.isTestnet());
            const {r, s, v, hash, ...transaction} = (await web3.eth.getTransaction(txId)) as any;
            let receipt: TransactionReceipt = undefined;
            try {
                receipt = await web3.eth.getTransactionReceipt(hash);
            } catch (_) {
                transaction.transactionHash = hash;
            }
            return {...transaction, ...receipt};
        } catch (e) {
            this.logger.error(e);
            throw new NftError('Transaction not found. Possible not exists or is still pending.', 'tx.not.found');
        }
    }

    public async transferErc721(chain: Currency, body: CeloTransferErc721 | EthTransferErc721): Promise<TransactionHash | { signatureId: string }> {
        const testnet = await this.isTestnet();
        let txData;
        switch (chain) {
            case Currency.ETH:
                txData = await prepareEthTransferErc721SignedTransaction(body, (await this.getNodesUrl(chain, testnet))[0]);
                break;
            case Currency.CELO:
                txData = await prepareCeloTransferErc721SignedTransaction(testnet, body as CeloTransferErc721, (await this.getNodesUrl(chain, testnet))[0]);
                break;
        }
        if (body.signatureId) {
            return {signatureId: await this.storeKMSTransaction(txData, chain, [body.signatureId])};
        } else {
            return this.broadcast(chain, txData);
        }
    }

    public async mintErc721(chain: Currency, body: CeloMintErc721 | EthMintErc721): Promise<TransactionHash | { signatureId: string }> {
        const testnet = await this.isTestnet();
        let txData;
        switch (chain) {
            case Currency.ETH:
                txData = await prepareEthMintErc721SignedTransaction(body, (await this.getNodesUrl(chain, testnet))[0]);
                break;
            case Currency.CELO:
                txData = await prepareCeloMintErc721SignedTransaction(testnet, body as CeloMintErc721, (await this.getNodesUrl(chain, testnet))[0]);
                break;
        }
        if (body.signatureId) {
            return {signatureId: await this.storeKMSTransaction(txData, chain, [body.signatureId])};
        } else {
            return this.broadcast(chain, txData);
        }
    }

    public async mintMultipleErc721(chain: Currency, body: CeloMintMultipleErc721 | EthMintMultipleErc721): Promise<TransactionHash | { signatureId: string }> {
        const testnet = await this.isTestnet();
        let txData;
        switch (chain) {
            case Currency.ETH:
                txData = await prepareEthMintMultipleErc721SignedTransaction(body, (await this.getNodesUrl(chain, testnet))[0]);
                break;
            case Currency.CELO:
                txData = await prepareCeloMintMultipleErc721SignedTransaction(testnet, body as CeloMintMultipleErc721, (await this.getNodesUrl(chain, testnet))[0]);
                break;
        }
        if (body.signatureId) {
            return {signatureId: await this.storeKMSTransaction(txData, chain, [body.signatureId])};
        } else {
            return this.broadcast(chain, txData);
        }
    }

    public async burnErc721(chain: Currency, body: CeloBurnErc721 | EthBurnErc721): Promise<TransactionHash | { signatureId: string }> {
        const testnet = await this.isTestnet();
        let txData;
        switch (chain) {
            case Currency.ETH:
                txData = await prepareEthBurnErc721SignedTransaction(body, (await this.getNodesUrl(chain, testnet))[0]);
                break;
            case Currency.CELO:
                txData = await prepareCeloBurnErc721SignedTransaction(testnet, body as CeloBurnErc721, (await this.getNodesUrl(chain, testnet))[0]);
                break;
        }
        if (body.signatureId) {
            return {signatureId: await this.storeKMSTransaction(txData, chain, [body.signatureId])};
        } else {
            return this.broadcast(chain, txData);
        }
    }

    public async deployErc721(chain: Currency, body: CeloDeployErc721 | EthDeployErc721): Promise<TransactionHash | { signatureId: string }> {
        const testnet = await this.isTestnet();
        let txData;
        switch (chain) {
            case Currency.ETH:
                txData = await prepareEthDeployErc721SignedTransaction(body, (await this.getNodesUrl(chain, testnet))[0]);
                break;
            case Currency.CELO:
                txData = await prepareCeloDeployErc721SignedTransaction(testnet, body as CeloDeployErc721, (await this.getNodesUrl(chain, testnet))[0]);
                break;
        }
        if (body.signatureId) {
            return {signatureId: await this.storeKMSTransaction(txData, chain, [body.signatureId])};
        } else {
            return this.broadcast(chain, txData);
        }
    }

    private async getClient(chain: Currency, testnet: boolean) {
        return new Web3((await this.getNodesUrl(chain, testnet))[0]);
    }
}
