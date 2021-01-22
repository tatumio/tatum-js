import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import {
    CreateTronTrc10,
    CreateTronTrc20,
    Currency,
    FreezeTron,
    generateAddressFromXPub,
    generatePrivateKeyFromMnemonic,
    generateWallet,
    prepareTronCreateTrc10SignedKMSTransaction,
    prepareTronCreateTrc10SignedTransaction,
    prepareTronCreateTrc20SignedKMSTransaction,
    prepareTronCreateTrc20SignedTransaction,
    prepareTronFreezeKMSTransaction,
    prepareTronFreezeTransaction,
    prepareTronSignedKMSTransaction,
    prepareTronSignedTransaction,
    prepareTronTrc10SignedKMSTransaction,
    prepareTronTrc10SignedTransaction,
    prepareTronTrc20SignedKMSTransaction,
    prepareTronTrc20SignedTransaction,
    TransferTron,
    TransferTronTrc10,
    TransferTronTrc20,
    TronAccount,
    TronBlock,
    TronTransaction,
    TronTrc10
} from '@tatumio/tatum';

export abstract class TronService {

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
        };
    }

    protected constructor(protected readonly logger: PinoLogger) {
    }

    protected abstract isTestnet(): Promise<boolean>;

    protected abstract getNodesUrl(testnet: boolean): Promise<string[]>;

    protected abstract storeKMSTransaction(txData: string, currency: string, signatureId: string[]): Promise<string>;

    public async broadcast(txData: string, signatureId?: string) {
        const url = (await this.getNodesUrl(await this.isTestnet()))[0];
        const broadcast = (await axios.post(`${url}/wallet/broadcasttransaction`, JSON.parse(txData))).data;
        if (broadcast.result) {
            return {txId: broadcast.txid};
        }
        throw new Error(`Broadcast failed due to ${broadcast.message}`);
    }

    public async getBlockChainInfo(testnet?: boolean): Promise<{ testnet: boolean, hash: string, blockNumber: number }> {
        const t = testnet !== undefined ? testnet : await this.isTestnet();
        const urls = await this.getNodesUrl(t);
        const block = (await axios.post(urls[0] + '/wallet/getnowblock')).data;
        return {testnet: t, hash: block.blockID, blockNumber: block.block_header.raw_data.number};
    }

    public async getBlock(hashOrHeight: string, testnet?: boolean): Promise<TronBlock> {
        const url = (await this.getNodesUrl(testnet !== undefined ? testnet : await this.isTestnet()))[0];
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
            transactions: block.transactions?.map(TronService.mapTransaction) || [],
        };
    }

    public async getTransaction(txId: string, testnet?: boolean): Promise<TronTransaction> {
        const url = (await this.getNodesUrl(testnet !== undefined ? testnet : await this.isTestnet()))[0];
        const [{data: tx}, {data: info}] = await Promise.all([axios.post(`${url}/wallet/gettransactionbyid`, {value: txId}),
            axios.post(`${url}/wallet/gettransactioninfobyid`, {value: txId})]);
        return TronService.mapTransaction({...tx, ...info.receipt});
    }

    public async getAccount(address: string): Promise<TronAccount> {
        const url = (await this.getNodesUrl(await this.isTestnet()))[0];
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
        const url = (await this.getNodesUrl(await this.isTestnet()))[0];
        let u = `${url}/v1/accounts/${address}/transactions?limit=200`;
        if (next) {
            u += '&fingerprint=' + next;
        }
        const result = (await axios.get(u)).data;
        return {
            transactions: result.data.map(TronService.mapTransaction),
            next: result.meta?.fingerprint
        };
    }

    public async generateWallet(mnem?: string) {
        return generateWallet(Currency.TRON, await this.isTestnet(), mnem);
    }

    public async generateAddress(xpub: string, i: number) {
        return {address: await generateAddressFromXPub(Currency.TRON, await this.isTestnet(), xpub, i)};
    }

    public async generatePrivateKey(mnemonic: string, i: number) {
        return {key: await generatePrivateKeyFromMnemonic(Currency.TRON, await this.isTestnet(), mnemonic, i)};
    }

    public async sendTransaction(body: TransferTron) {
        if (body.signatureId) {
            const txData = await prepareTronSignedKMSTransaction(await this.isTestnet(), body);
            return {signatureId: await this.storeKMSTransaction(txData, Currency.TRON, [body.signatureId])};
        } else {
            return this.broadcast(await prepareTronSignedTransaction(await this.isTestnet(), body));
        }
    }

    public async sendTrc10Transaction(body: TransferTronTrc10) {
        if (body.signatureId) {
            const txData = await prepareTronTrc10SignedKMSTransaction(await this.isTestnet(), body);
            return {signatureId: await this.storeKMSTransaction(txData, Currency.TRON, [body.signatureId])};
        } else {
            return this.broadcast(await prepareTronTrc10SignedTransaction(await this.isTestnet(), body));
        }
    }

    public async sendTrc20Transaction(body: TransferTronTrc20) {
        if (body.signatureId) {
            const txData = await prepareTronTrc20SignedKMSTransaction(await this.isTestnet(), body);
            return {signatureId: await this.storeKMSTransaction(txData, Currency.TRON, [body.signatureId])};
        } else {
            return this.broadcast(await prepareTronTrc20SignedTransaction(await this.isTestnet(), body));
        }
    }

    public async createTrc10Transaction(body: CreateTronTrc10) {
        if (body.signatureId) {
            const txData = await prepareTronCreateTrc10SignedKMSTransaction(await this.isTestnet(), body);
            return {signatureId: await this.storeKMSTransaction(txData, Currency.TRON, [body.signatureId])};
        } else {
            return this.broadcast(await prepareTronCreateTrc10SignedTransaction(await this.isTestnet(), body));
        }
    }

    public async createTrc20Transaction(body: CreateTronTrc20) {
        if (body.signatureId) {
            const txData = await prepareTronCreateTrc20SignedKMSTransaction(await this.isTestnet(), body);
            return {signatureId: await this.storeKMSTransaction(txData, Currency.TRON, [body.signatureId])};
        } else {
            return this.broadcast(await prepareTronCreateTrc20SignedTransaction(await this.isTestnet(), body));
        }
    }

    public async freezeBalance(body: FreezeTron) {
        if (body.signatureId) {
            const txData = await prepareTronFreezeKMSTransaction(await this.isTestnet(), body);
            return {signatureId: await this.storeKMSTransaction(txData, Currency.TRON, [body.signatureId])};
        } else {
            return this.broadcast(await prepareTronFreezeTransaction(await this.isTestnet(), body));
        }
    }

    public async getTrc10Detail(id: string): Promise<TronTrc10> {
        const url = `${(await this.getNodesUrl(await this.isTestnet()))[0]}/v1/assets/${id}`;
        const {data} = (await axios.get(url)).data;
        if (!data?.length) {
            throw new Error('No such asset.');
        }
        return {
            abbr: data[0].abbr,
            description: data[0].description,
            id: data[0].id,
            name: data[0].name,
            ownerAddress: data[0].owner_address,
            precision: data[0].precision,
            totalSupply: data[0].total_supply,
            url: data[0].url,
        };
    }
}
