"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScryptaBlockchainService = void 0;
const core_1 = __importDefault(require("@scrypta/core"));
const constants_1 = require("./constants");
const Tatum = __importStar(require("@tatumio/tatum"));
const tatum_1 = require("@tatumio/tatum");
class ScryptaBlockchainService {
    constructor(logger) {
        this.logger = logger;
        this.scrypta = new core_1.default();
        this.scrypta.staticnodes = true;
    }
    getNetwork() {
        return this.isTestnet() ? constants_1.LYRA_TEST_NETWORK : constants_1.LYRA_NETWORK;
    }
    getBlockChainInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrypta.testnet = this.isTestnet();
            this.scrypta.nodes = yield this.getNodesUrl();
            this.scrypta.staticnodes = true;
            try {
                const info = yield this.scrypta.get('/wallet/getinfo');
                return info;
            }
            catch (e) {
                this.logger.error(e);
                throw new Error(`${e.message} Code: ${e.code}`);
            }
        });
    }
    getCurrentBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrypta.testnet = this.isTestnet();
            this.scrypta.nodes = yield this.getNodesUrl();
            this.scrypta.staticnodes = true;
            try {
                const info = yield this.scrypta.get('/wallet/getinfo');
                return info.blocks;
            }
            catch (e) {
                this.logger.error(e);
                throw new Error(`${e.message}`);
            }
        });
    }
    getBlockHash(i) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrypta.testnet = this.isTestnet();
            this.scrypta.nodes = yield this.getNodesUrl();
            this.scrypta.staticnodes = true;
            try {
                const block = yield this.scrypta.get('/blockhash/' + i);
                return block.hash;
            }
            catch (e) {
                this.logger.error(e);
                throw new Error(`${e.message}`);
            }
        });
    }
    getBlock(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrypta.testnet = this.isTestnet();
            this.scrypta.nodes = yield this.getNodesUrl();
            this.scrypta.staticnodes = true;
            try {
                const block = yield this.scrypta.get('/rawblock/' + hash);
                return {
                    hash: block.data.hash,
                    height: block.data.height,
                    confirmations: block.data.confirmations,
                    time: block.data.time,
                    txs: block.data.txs,
                };
            }
            catch (e) {
                this.logger.error(e);
                throw new Error(`${e.message}`);
            }
        });
    }
    generateAddress(xpub, derivationIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Tatum.generateAddressFromXPub(tatum_1.Currency.LYRA, this.isTestnet(), xpub, derivationIndex);
            }
            catch (e) {
                this.logger.error(e);
                throw new Error('Unable to generate address, wrong xpub and account type.');
            }
        });
    }
    generateWallet(mnem) {
        return Tatum.generateWallet(tatum_1.Currency.LYRA, this.isTestnet(), mnem);
    }
    generateAddressPrivateKey(derivationIndex, mnemonic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const privateKey = yield Tatum.generatePrivateKeyFromMnemonic(tatum_1.Currency.LYRA, this.isTestnet(), mnemonic, derivationIndex);
                return { key: privateKey };
            }
            catch (e) {
                this.logger.error(e);
                throw new Error('Unable to generate address, wrong mnemonic and index.');
            }
        });
    }
    getTransactionsByAddress(address, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrypta.testnet = this.isTestnet();
            this.scrypta.nodes = yield this.getNodesUrl();
            this.scrypta.staticnodes = true;
            try {
                const transactions = yield this.scrypta.get('/transactions/' + address);
                const parsed = [];
                for (const k in transactions.data) {
                    const tx = transactions.data[k];
                    parsed.push({
                        hash: tx.txid,
                        from: tx.from,
                        to: tx.to,
                        value: tx.value,
                        time: tx.time,
                        type: tx.type,
                        blockhash: tx.blockhash,
                    });
                }
                return parsed;
            }
            catch (e) {
                this.logger.error(e);
                throw new Error(`${e.message}`);
            }
        });
    }
    getUnspentsByAddress(address, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrypta.testnet = this.isTestnet();
            this.scrypta.nodes = yield this.getNodesUrl();
            this.scrypta.staticnodes = true;
            try {
                const unspent = yield this.scrypta.get('/unspent/' + address);
                const parsed = [];
                for (const k in unspent.unspent) {
                    const utxo = unspent.unspent[k];
                    parsed.push({
                        txid: utxo.txid,
                        vout: utxo.vout,
                        amount: utxo.amount,
                        scriptPubKey: utxo.scriptPubKey,
                        block: utxo.block,
                        redeemed: utxo.redeemed,
                    });
                }
                return parsed;
            }
            catch (e) {
                this.logger.error(e);
                throw new Error(`${e.message}`);
            }
        });
    }
    getUTXO(hash, index) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrypta.testnet = this.isTestnet();
            this.scrypta.nodes = yield this.getNodesUrl();
            this.scrypta.staticnodes = true;
            try {
                const utxo = yield this.scrypta.get('/utxo/' + hash + '/' + index);
                if (utxo === false) {
                    throw new Error('No such UTXO for transaction and index.');
                }
                return {
                    txid: utxo.txid,
                    vout: utxo.vout,
                    amount: utxo.amount,
                    scriptPubKey: utxo.scriptPubKey,
                    block: utxo.block,
                    redeemed: utxo.redeemed,
                };
            }
            catch (e) {
                this.logger.error(e);
                throw new Error('No such UTXO for transaction and index.');
            }
        });
    }
    getRawTransaction(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrypta.testnet = this.isTestnet();
            this.scrypta.nodes = yield this.getNodesUrl();
            this.scrypta.staticnodes = true;
            try {
                const rawtx = yield this.scrypta.get('/rawtransaction/' + txHash);
                if (rawtx === false) {
                    throw new Error('No such transaction.');
                }
                return rawtx;
            }
            catch (e) {
                this.logger.error(e);
                throw new Error('No such transaction.');
            }
        });
    }
    broadcast(txData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrypta.testnet = this.isTestnet();
            this.scrypta.nodes = yield this.getNodesUrl();
            this.scrypta.staticnodes = true;
            try {
                const sendrawtransaction = yield this.scrypta.post('/sendrawtransaction', { rawtransaction: txData });
                if (sendrawtransaction.data === null) {
                    throw new Error('Transaction not accepted by network.');
                }
                else {
                    const txid = sendrawtransaction.data;
                    return { txId: txid, failed: false };
                }
            }
            catch (e) {
                this.logger.error(e);
                throw new Error('Can\'t send transaction.');
            }
        });
    }
}
exports.ScryptaBlockchainService = ScryptaBlockchainService;
