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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScryptaBlockchainService = void 0;
const ScryptaCore = require('@scrypta/core');
const constants_1 = require("./constants");
const error_1 = require("./error");
const Tatum = __importStar(require("@tatumio/tatum"));
class ScryptaBlockchainService {
    constructor(testnet = false, nodes, debug) {
        this.currency = Tatum.Currency.LYRA;
        this.scrypta = new ScryptaCore;
        this.testnet = testnet;
        this.scrypta.staticnodes = true;
        if (this.testnet === true) {
            this.scrypta.testnet = true;
        }
        if (nodes !== undefined && nodes.length > 0) {
            this.scrypta.mainnetIdaNodes = nodes;
            this.scrypta.testnetIdaNodes = nodes;
        }
        if (debug === true) {
            this.scrypta.debug = true;
        }
    }
    getNetwork() {
        return this.testnet ? constants_1.LYRA_TEST_NETWORK : constants_1.LYRA_NETWORK;
    }
    getBlockChainInfo(testnet) {
        return __awaiter(this, void 0, void 0, function* () {
            if (testnet) {
                this.scrypta.testnet = testnet;
            }
            try {
                let info = yield this.scrypta.get('/wallet/getinfo');
                return info;
            }
            catch (e) {
                this.logger.error(e);
                throw new error_1.TatumError(`${e.message} Code: ${e.code}`, `blockchain.error.code`);
            }
        });
    }
    getCurrentBlock(testnet) {
        return new Promise((response) => __awaiter(this, void 0, void 0, function* () {
            if (testnet) {
                this.scrypta.testnet = testnet;
            }
            else {
                testnet = this.testnet;
            }
            try {
                let info = yield this.scrypta.get('/wallet/getinfo');
                response(info.blocks);
            }
            catch (e) {
                this.logger.error(e);
                throw new error_1.TatumError(`${e.message}`, `blockchain.error.code`);
            }
        }));
    }
    getBlockHash(i, testnet) {
        return new Promise((response) => __awaiter(this, void 0, void 0, function* () {
            if (testnet) {
                this.scrypta.testnet = testnet;
            }
            else {
                testnet = this.testnet;
            }
            try {
                let block = yield this.scrypta.get('/blockhash/' + i);
                response(block.hash);
            }
            catch (e) {
                this.logger.error(e);
                throw new error_1.TatumError(`${e.message}`, `blockchain.error.code`);
            }
        }));
    }
    getBlock(hash, testnet) {
        return new Promise((response) => __awaiter(this, void 0, void 0, function* () {
            if (testnet) {
                this.scrypta.testnet = testnet;
            }
            else {
                testnet = this.testnet;
            }
            try {
                let block = yield this.scrypta.get('/rawblock/' + hash);
                response({
                    hash: block.data.hash,
                    height: block.data.height,
                    confirmations: block.data.confirmations,
                    time: block.data.time,
                    txs: block.data.txs
                });
            }
            catch (e) {
                this.logger.error(e);
                throw new error_1.TatumError(`${e.message}`, `blockchain.error.code`);
            }
        }));
    }
    generateAddress(xpub, derivationIndex, testnet) {
        return __awaiter(this, void 0, void 0, function* () {
            if (testnet) {
                this.scrypta.testnet = testnet;
            }
            else {
                testnet = this.testnet;
            }
            try {
                let address = yield Tatum.generateAddressFromXPub(this.currency, testnet, xpub, derivationIndex);
                return address;
            }
            catch (e) {
                this.logger.error(e);
                throw new error_1.TatumError('Unable to generate address, wrong xpub and account type.', 'address.generation.failed.wrong.xpub');
            }
        });
    }
    generateWallet(mnem, testnet) {
        return __awaiter(this, void 0, void 0, function* () {
            if (testnet) {
                this.scrypta.testnet = testnet;
            }
            else {
                testnet = this.testnet;
            }
            const lyraWallet = yield Tatum.generateWallet(this.currency, testnet, mnem);
            return lyraWallet;
        });
    }
    generateAddressPrivateKey(derivationIndex, mnemonic, testnet) {
        return __awaiter(this, void 0, void 0, function* () {
            if (testnet) {
                this.scrypta.testnet = testnet;
            }
            else {
                testnet = this.testnet;
            }
            try {
                let privateKey = yield Tatum.generatePrivateKeyFromMnemonic(this.currency, testnet, mnemonic, derivationIndex);
                return { key: privateKey };
            }
            catch (e) {
                this.logger.error(e);
                throw new error_1.TatumError('Unable to generate address, wrong mnemonic and index.', 'key.generation.failed.wrong.mnemonic');
            }
        });
    }
    getTransactionsByAddress(address, pagination, testnet) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((response) => __awaiter(this, void 0, void 0, function* () {
                if (testnet) {
                    this.scrypta.testnet = testnet;
                }
                else {
                    testnet = this.testnet;
                }
                try {
                    let transactions = yield this.scrypta.get('/transactions/' + address);
                    let parsed = [];
                    for (let k in transactions.data) {
                        let tx = transactions.data[k];
                        parsed.push({
                            hash: tx.txid,
                            from: tx.from,
                            to: tx.to,
                            value: tx.value,
                            time: tx.time,
                            type: tx.type,
                            blockhash: tx.blockhash
                        });
                    }
                    response(parsed);
                }
                catch (e) {
                    this.logger.error(e);
                    throw new error_1.TatumError(`${e.message}`, `blockchain.error.code`);
                }
            }));
        });
    }
    getUnspentsByAddress(address, pagination, testnet) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((response) => __awaiter(this, void 0, void 0, function* () {
                if (testnet) {
                    this.scrypta.testnet = testnet;
                }
                else {
                    testnet = this.testnet;
                }
                try {
                    let unspent = yield this.scrypta.get('/unspent/' + address);
                    let parsed = [];
                    for (let k in unspent.unspent) {
                        let utxo = unspent.unspent[k];
                        parsed.push({
                            txid: utxo.txid,
                            vout: utxo.vout,
                            amount: utxo.amount,
                            scriptPubKey: utxo.scriptPubKey,
                            block: utxo.block,
                            redeemed: utxo.redeemed
                        });
                    }
                    response(parsed);
                }
                catch (e) {
                    this.logger.error(e);
                    throw new error_1.TatumError(`${e.message}`, `blockchain.error.code`);
                }
            }));
        });
    }
    getUTXO(hash, index, testnet) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((response) => __awaiter(this, void 0, void 0, function* () {
                if (testnet) {
                    this.scrypta.testnet = testnet;
                }
                else {
                    testnet = this.testnet;
                }
                try {
                    let utxo = yield this.scrypta.get('/utxo/' + hash + '/' + index);
                    if (utxo === false) {
                        throw new error_1.TatumError('No such UTXO for transaction and index.', 'tx.hash.index.spent');
                    }
                    response({
                        txid: utxo.txid,
                        vout: utxo.vout,
                        amount: utxo.amount,
                        scriptPubKey: utxo.scriptPubKey,
                        block: utxo.block,
                        redeemed: utxo.redeemed
                    });
                }
                catch (e) {
                    this.logger.error(e);
                    throw new error_1.TatumError('No such UTXO for transaction and index.', 'tx.hash.index.spent');
                }
            }));
        });
    }
    getRawTransaction(txHash, testnet) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((response) => __awaiter(this, void 0, void 0, function* () {
                if (testnet) {
                    this.scrypta.testnet = testnet;
                }
                else {
                    testnet = this.testnet;
                }
                try {
                    let rawtx = yield this.scrypta.get('/rawtransaction/' + txHash);
                    if (rawtx === false) {
                        throw new error_1.TatumError('No such transaction.', 'tx.hash');
                    }
                    response(rawtx);
                }
                catch (e) {
                    this.logger.error(e);
                    throw new error_1.TatumError('No such transaction.', 'tx.hash');
                }
            }));
        });
    }
    broadcast(txData, testnet) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((response) => __awaiter(this, void 0, void 0, function* () {
                if (testnet) {
                    this.scrypta.testnet = testnet;
                }
                else {
                    testnet = this.testnet;
                }
                try {
                    let sendrawtransaction = yield this.scrypta.post('/sendrawtransaction', { rawtransaction: txData });
                    if (sendrawtransaction.data === null) {
                        throw new error_1.TatumError('Transaction not accepted by network.', 'tx.broadcast');
                    }
                    else {
                        let txid = sendrawtransaction['data'];
                        response({ txId: txid, failed: false });
                    }
                }
                catch (e) {
                    this.logger.error(e);
                    throw new error_1.TatumError('Can\'t send transaction.', 'tx.broadcast');
                }
            }));
        });
    }
}
exports.ScryptaBlockchainService = ScryptaBlockchainService;
