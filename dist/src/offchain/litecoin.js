"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareLitecoinSignedOffchainTransaction = exports.signLitecoinOffchainKMSTransaction = exports.sendLitecoinOffchainTransaction = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
const model_1 = require("../model");
const wallet_1 = require("../wallet");
const common_1 = require("./common");
/**
 * Send Litecoin transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendLitecoinOffchainTransaction = async (testnet, body) => {
    await class_validator_1.validateOrReject(body);
    const { mnemonic, keyPair, attr: changeAddress } = body, withdrawal = __rest(body, ["mnemonic", "keyPair", "attr"]);
    if (!withdrawal.fee) {
        withdrawal.fee = '0.0005';
    }
    const { id, data } = await common_1.offchainStoreWithdrawal(withdrawal);
    const { amount, address, } = withdrawal;
    let txData;
    try {
        txData = await exports.prepareLitecoinSignedOffchainTransaction(testnet, data, amount, address, mnemonic, keyPair, changeAddress);
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return Object.assign(Object.assign({}, await common_1.offchainBroadcast({ txData, withdrawalId: id, currency: model_1.Currency.LTC })), { id });
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
};
/**
 * Sign Litecoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signLitecoinOffchainKMSTransaction = async (tx, mnemonic, testnet) => {
    var _a;
    if (tx.chain !== model_1.Currency.LTC || !tx.withdrawalResponses) {
        throw Error('Unsupported chain.');
    }
    const network = testnet ? bitcoinjs_lib_1.networks.testnet : bitcoinjs_lib_1.networks.bitcoin;
    const builder = bitcoinjs_lib_1.TransactionBuilder.fromTransaction(bitcoinjs_lib_1.Transaction.fromHex(tx.serializedTransaction), network);
    for (const [i, response] of tx.withdrawalResponses.entries()) {
        if (response.vIn === '-1') {
            continue;
        }
        const ecPair = bitcoinjs_lib_1.ECPair.fromWIF(await wallet_1.generatePrivateKeyFromMnemonic(model_1.Currency.LTC, testnet, mnemonic, ((_a = response.address) === null || _a === void 0 ? void 0 : _a.derivationKey) || 0), network);
        builder.sign(i, ecPair);
    }
    return builder.build().toHex();
};
/**
 * Sign Litecoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param data data from Tatum system to prepare transaction from
 * @param amount amount to send
 * @param address recipient address
 * @param mnemonic mnemonic to sign transaction from. mnemonic or keyPair must be present
 * @param keyPair keyPair to sign transaction from. keyPair or mnemonic must be present
 * @param changeAddress address to send the rest of the unused coins
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareLitecoinSignedOffchainTransaction = async (testnet, data, amount, address, mnemonic, keyPair, changeAddress) => {
    var _a;
    const network = testnet ? constants_1.LTC_TEST_NETWORK : constants_1.LTC_NETWORK;
    const tx = new bitcoinjs_lib_1.TransactionBuilder(network);
    data.forEach((input) => {
        if (input.vIn !== '-1') {
            tx.addInput(input.vIn, input.vInIndex);
        }
    });
    const lastVin = data.find(d => d.vIn === '-1');
    tx.addOutput(address, Number(new bignumber_js_1.default(amount).multipliedBy(100000000).toFixed(8, bignumber_js_1.default.ROUND_FLOOR)));
    if (mnemonic) {
        const { xpub } = await wallet_1.generateLtcWallet(testnet, mnemonic);
        tx.addOutput(wallet_1.generateAddressFromXPub(model_1.Currency.LTC, testnet, xpub, 0), Number(new bignumber_js_1.default(lastVin.amount).multipliedBy(100000000).toFixed(8, bignumber_js_1.default.ROUND_FLOOR)));
    }
    else if (keyPair && changeAddress) {
        tx.addOutput(changeAddress, Number(new bignumber_js_1.default(lastVin.amount).multipliedBy(100000000).toFixed(8, bignumber_js_1.default.ROUND_FLOOR)));
    }
    else {
        throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.');
    }
    for (const [i, input] of data.entries()) {
        // when there is no address field present, input is pool transfer to 0
        if (input.vIn === '-1') {
            continue;
        }
        if (mnemonic) {
            const derivationKey = ((_a = input.address) === null || _a === void 0 ? void 0 : _a.derivationKey) || 0;
            const ecPair = bitcoinjs_lib_1.ECPair.fromWIF(await wallet_1.generatePrivateKeyFromMnemonic(model_1.Currency.LTC, testnet, mnemonic, derivationKey), network);
            tx.sign(i, ecPair);
        }
        else if (keyPair) {
            const privateKey = keyPair.find(k => k.address === input.address.address);
            const ecPair = bitcoinjs_lib_1.ECPair.fromWIF(privateKey.privateKey, network);
            tx.sign(i, ecPair);
        }
        else {
            throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.');
        }
    }
    return tx.build().toHex();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl0ZWNvaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb2ZmY2hhaW4vbGl0ZWNvaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBcUM7QUFDckMsaURBQWdGO0FBQ2hGLHFEQUFpRDtBQUNqRCw0Q0FBMkQ7QUFDM0Qsb0NBQTZHO0FBQzdHLHNDQUFxRztBQUNyRyxxQ0FBOEY7QUFFOUY7Ozs7OztHQU1HO0FBQ1UsUUFBQSwrQkFBK0IsR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxJQUE4QixFQUFFLEVBQUU7SUFDdEcsTUFBTSxrQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixNQUFNLEVBQ0YsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsYUFBYSxLQUN0QyxJQUFJLEVBRHVDLFVBQVUsVUFDckQsSUFBSSxFQUZGLCtCQUVMLENBQU8sQ0FBQztJQUNULElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2pCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO0tBQzdCO0lBQ0QsTUFBTSxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUMsR0FBRyxNQUFNLGdDQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdELE1BQU0sRUFDRixNQUFNLEVBQUUsT0FBTyxHQUNsQixHQUFHLFVBQVUsQ0FBQztJQUNmLElBQUksTUFBTSxDQUFDO0lBQ1gsSUFBSTtRQUNBLE1BQU0sR0FBRyxNQUFNLGdEQUF3QyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0tBQzdIO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0saUNBQXdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsTUFBTSxD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