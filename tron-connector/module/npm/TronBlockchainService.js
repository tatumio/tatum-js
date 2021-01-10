"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronBlockchainService = void 0;
const axios_1 = __importDefault(require("axios"));
const tatum_1 = require("@tatumio/tatum");
const tron_1 = require("@tatumio/tatum/dist/src/transaction/tron");
class TronBlockchainService {
    constructor(logger) {
        this.logger = logger;
    }
    static mapTransaction(t) {
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
    async broadcast(txData, signatureId) {
        const url = (await this.getNodesUrl())[0];
        const broadcast = (await axios_1.default.post(`${url}/wallet/broadcasttransaction`, JSON.parse(txData))).data;
        if (broadcast.result) {
            return { txId: broadcast.txid };
        }
        throw new Error(`Broadcast failed due to ${broadcast.message}`);
    }
    async getBlockChainInfo() {
        const [urls, testnet] = await Promise.all([this.getNodesUrl(), this.isTestnet()]);
        const block = (await axios_1.default.post(urls[0] + '/wallet/getnowblock')).data;
        return { testnet, hash: block.blockID, blockNumber: block.block_header.raw_data.number };
    }
    async getBlock(hashOrHeight) {
        var _a;
        const url = (await this.getNodesUrl())[0];
        let block;
        if (hashOrHeight.length > 32) {
            block = (await axios_1.default.post(`${url}/wallet/getblockbyid`, { value: hashOrHeight })).data;
        }
        else {
            block = (await axios_1.default.post(`${url}/wallet/getblockbynum`, { num: parseInt(hashOrHeight) })).data;
        }
        return {
            blockNumber: block.block_header.raw_data.number,
            hash: block.blockID,
            parentHash: block.block_header.raw_data.parentHash,
            timestamp: block.block_header.raw_data.timestamp,
            witnessAddress: block.block_header.raw_data.witness_address,
            witnessSignature: block.block_header.witness_signature,
            transactions: ((_a = block.transactions) === null || _a === void 0 ? void 0 : _a.map(TronBlockchainService.mapTransaction)) || [],
        };
    }
    async getTransaction(txId) {
        const url = (await this.getNodesUrl())[0];
        const [{ data: tx }, { data: info }] = await Promise.all([axios_1.default.post(`${url}/wallet/gettransactionbyid`, { value: txId }),
            axios_1.default.post(`${url}/wallet/gettransactioninfobyid`, { value: txId })]);
        return TronBlockchainService.mapTransaction({ ...tx, ...info.receipt });
    }
    async getAccount(address) {
        var _a;
        const url = (await this.getNodesUrl())[0];
        const accounts = (await axios_1.default.post(`${url}/wallet/getaccount`, { address, visible: address.length === 34 })).data;
        if (!((_a = accounts.data) === null || _a === void 0 ? void 0 : _a.length)) {
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
    async getTransactionsByAccount(address, next) {
        var _a;
        const url = (await this.getNodesUrl())[0];
        let u = `${url}/v1/accounts/${address}/transactions?limit=200`;
        if (next) {
            u += '&fingerprint=' + next;
        }
        const result = (await axios_1.default.get(u)).data;
        return {
            transactions: result.data.map(TronBlockchainService.mapTransaction),
            next: (_a = result.meta) === null || _a === void 0 ? void 0 : _a.fingerprint
        };
    }
    generateWallet() {
        return tatum_1.generateTronWallet();
    }
    async sendTransaction(body) {
        return this.broadcast(await tron_1.prepareTronSignedTransaction(await this.isTestnet(), body));
    }
}
exports.TronBlockchainService = TronBlockchainService;
