"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLitecoinTransaction = exports.sendBitcoinTransaction = exports.prepareLitecoinSignedTransaction = exports.prepareBitcoinSignedTransaction = exports.signLitecoinKMSTransaction = exports.signBitcoinKMSTransaction = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const class_validator_1 = require("class-validator");
const blockchain_1 = require("../blockchain");
const constants_1 = require("../constants");
const model_1 = require("../model");
const prepareSignedTransaction = async (network, body, curency) => {
    await class_validator_1.validateOrReject(body);
    const { fromUTXO, fromAddress, to } = body;
    const tx = new bitcoinjs_lib_1.TransactionBuilder(network);
    const privateKeysToSign = [];
    if (fromAddress) {
        for (const item of fromAddress) {
            const txs = curency === model_1.Currency.BTC ? await blockchain_1.btcGetTxForAccount(item.address) : await blockchain_1.ltcGetTxForAccount(item.address);
            for (const t of txs) {
                for (const [i, o] of t.outputs.entries()) {
                    if (o.address !== item.address) {
                        continue;
                    }
                    try {
                        if (curency === model_1.Currency.BTC) {
                            await blockchain_1.btcGetUTXO(t.hash, i);
                        }
                        else {
                            await blockchain_1.ltcGetUTXO(t.hash, i);
                        }
                        tx.addInput(t.hash, i);
                        privateKeysToSign.push(item.privateKey);
                    }
                    catch (e) {
                    }
                }
            }
        }
    }
    else if (fromUTXO) {
        for (const item of fromUTXO) {
            tx.addInput(item.txHash, item.index);
            privateKeysToSign.push(item.privateKey);
        }
    }
    for (const item of to) {
        tx.addOutput(item.address, Number(new bignumber_js_1.default(item.value).multipliedBy(100000000).toFixed(8, bignumber_js_1.default.ROUND_FLOOR)));
    }
    for (let i = 0; i < privateKeysToSign.length; i++) {
        const ecPair = bitcoinjs_lib_1.ECPair.fromWIF(privateKeysToSign[i], network);
        tx.sign(i, ecPair);
    }
    return tx.build().toHex();
};
/**
 * Sign Bitcoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signBitcoinKMSTransaction = async (tx, privateKeys, testnet) => {
    if (tx.chain !== model_1.Currency.BTC) {
        throw Error('Unsupported chain.');
    }
    const network = testnet ? bitcoinjs_lib_1.networks.testnet : bitcoinjs_lib_1.networks.bitcoin;
    const builder = bitcoinjs_lib_1.TransactionBuilder.fromTransaction(bitcoinjs_lib_1.Transaction.fromHex(tx.serializedTransaction), network);
    for (const [i, privateKey] of privateKeys.entries()) {
        const ecPair = bitcoinjs_lib_1.ECPair.fromWIF(privateKey, network);
        builder.sign(i, ecPair);
    }
    return builder.build().toHex();
};
/**
 * Sign Litecoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signLitecoinKMSTransaction = async (tx, privateKeys, testnet) => {
    if (tx.chain !== model_1.Currency.LTC) {
        throw Error('Unsupported chain.');
    }
    const network = testnet ? constants_1.LTC_TEST_NETWORK : constants_1.LTC_NETWORK;
    const builder = bitcoinjs_lib_1.TransactionBuilder.fromTransaction(bitcoinjs_lib_1.Transaction.fromHex(tx.serializedTransaction), network);
    for (const [i, privateKey] of privateKeys.entries()) {
        const ecPair = bitcoinjs_lib_1.ECPair.fromWIF(privateKey, network);
        builder.sign(i, ecPair);
    }
    return builder.build().toHex();
};
/**
 * Sign Bitcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareBitcoinSignedTransaction = async (testnet, body) => {
    return prepareSignedTransaction(testnet ? bitcoinjs_lib_1.networks.testnet : bitcoinjs_lib_1.networks.bitcoin, body, model_1.Currency.BTC);
};
/**
 * Sign Litcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareLitecoinSignedTransaction = async (testnet, body) => {
    return prepareSignedTransaction(testnet ? constants_1.LTC_TEST_NETWORK : constants_1.LTC_NETWORK, body, model_1.Currency.LTC);
};
/**
 * Send Bitcoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendBitcoinTransaction = async (testnet, body) => {
    return blockchain_1.btcBroadcast(await exports.prepareBitcoinSignedTransaction(testnet, body));
};
/**
 * Send Litecoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendLitecoinTransaction = async (testnet, body) => {
    return blockchain_1.ltcBroadcast(await exports.prepareLitecoinSignedTransaction(testnet, body));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0Y29pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90cmFuc2FjdGlvbi9iaXRjb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdFQUFxQztBQUNyQyxpREFBeUY7QUFDekYscURBQWlEO0FBQ2pELDhDQU91QjtBQUN2Qiw0Q0FBMkQ7QUFDM0Qsb0NBQThFO0FBRTlFLE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQUUsSUFBZ0MsRUFBRSxPQUFpQixFQUFFLEVBQUU7SUFDN0csTUFBTSxrQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixNQUFNLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUMsR0FBRyxJQUFJLENBQUM7SUFDekMsTUFBTSxFQUFFLEdBQUcsSUFBSSxrQ0FBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQyxNQUFNLGlCQUFpQixHQUFhLEVBQUUsQ0FBQztJQUN2QyxJQUFJLFdBQVcsRUFBRTtRQUNiLEtBQUssTUFBTSxJQUFJLElBQUksV0FBVyxFQUFFO1lBQzVCLE1BQU0sR0FBRyxHQUFHLE9BQU8sS0FBSyxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSwrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sK0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZILEtBQUssTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNqQixLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQzVCLFNBQVM7cUJBQ1o7b0JBQ0QsSUFBSTt3QkFDQSxJQUFJLE9BQU8sS0FBSyxnQkFBUSxD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