"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareBitcoinCashSignedTransaction = exports.signBitcoinCashKMSTransaction = exports.sendBitcoinCashTransaction = void 0;
const bitcoincashjs2_lib_1 = require("@bitcoin-dot-com/bitcoincashjs2-lib");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const bitbox_sdk_1 = require("bitbox-sdk");
const class_validator_1 = require("class-validator");
// @ts-ignore
const coininfo_1 = __importDefault(require("coininfo"));
const blockchain_1 = require("../blockchain");
const request_1 = require("../model/request");
/**
 * Send Bitcoin Cash transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendBitcoinCashTransaction = async (testnet, body) => {
    return blockchain_1.bcashBroadcast(await exports.prepareBitcoinCashSignedTransaction(testnet, body));
};
/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signBitcoinCashKMSTransaction = async (tx, privateKeys, testnet) => {
    if (tx.chain !== request_1.Currency.BCH) {
        throw Error('Unsupported chain.');
    }
    const [data, amountsToDecode] = tx.serializedTransaction.split(':');
    const transaction = bitcoincashjs2_lib_1.Transaction.fromHex(data);
    const amountsToSign = JSON.parse(amountsToDecode);
    const network = testnet ? coininfo_1.default.bitcoincash.test.toBitcoinJS() : coininfo_1.default.bitcoincash.main.toBitcoinJS();
    const builder = bitcoincashjs2_lib_1.TransactionBuilder.fromTransaction(transaction, network);
    for (const [i, privateKey] of privateKeys.entries()) {
        const ecPair = new bitbox_sdk_1.ECPair().fromWIF(privateKey);
        builder.sign(i, ecPair, undefined, 0x01, amountsToSign[i], undefined, bitcoincashjs2_lib_1.ECSignature.SCHNORR);
    }
    return builder.build().toHex();
};
/**
 * Sign Bitcoin Cash transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareBitcoinCashSignedTransaction = async (testnet, body) => {
    await class_validator_1.validateOrReject(body);
    const { fromUTXO, to } = body;
    const networkType = testnet ? 'testnet' : 'mainnet';
    const transactionBuilder = new bitbox_sdk_1.TransactionBuilder(networkType);
    const privateKeysToSign = [];
    const amountToSign = [];
    const txs = await getTransactions(fromUTXO.map(u => u.txHash));
    for (const [i, item] of fromUTXO.entries()) {
        transactionBuilder.addInput(item.txHash, item.index);
        privateKeysToSign.push(item.privateKey);
        amountToSign.push(Number(new bignumber_js_1.default(txs[i].vout[item.index].value).multipliedBy(100000000).toFixed(0, bignumber_js_1.default.ROUND_FLOOR)));
    }
    for (const item of to) {
        transactionBuilder.addOutput(item.address, Number(new bignumber_js_1.default(item.value).multipliedBy(100000000).toFixed(0, bignumber_js_1.default.ROUND_FLOOR)));
    }
    for (let i = 0; i < privateKeysToSign.length; i++) {
        const ecPair = new bitbox_sdk_1.ECPair().fromWIF(privateKeysToSign[i]);
        transactionBuilder.sign(i, ecPair, undefined, transactionBuilder.hashTypes.SIGHASH_ALL, amountToSign[i], transactionBuilder.signatureAlgorithms.SCHNORR);
    }
    return transactionBuilder.build().toHex();
};
const getTransactions = async (txHash) => {
    const result = [];
    for (const tx of txHash) {
        result.push(blockchain_1.bcashGetTransaction(tx));
    }
    return await Promise.all(result);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNhY3Rpb24vYmNhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBSzZDO0FBQzdDLGdFQUFxQztBQUNyQywyQ0FBc0Q7QUFDdEQscURBQWlEO0FBQ2pELGFBQWE7QUFDYix3REFBZ0M7QUFDaEMsOENBQWtFO0FBQ2xFLDhDQUFpRTtBQUlqRTs7Ozs7O0dBTUc7QUFDVSxRQUFBLDBCQUEwQixHQUFHLEtBQUssRUFBRSxPQUFnQixFQUFFLElBQTJCLEVBQUUsRUFBRTtJQUM5RixPQUFPLDJCQUFjLENBQUMsTUFBTSwyQ0FBbUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNwRixDQUFDLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFDVSxRQUFBLDZCQUE2QixHQUFHLEtBQUssRUFBRSxFQUFrQixFQUFFLFdBQXFCLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO0lBQy9HLElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxrQkFBUSxDQUFDLEdBQUcsRUFBRTtRQUMzQixNQUFNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsTUFBTSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sV0FBVyxHQUFHLGdDQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVB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