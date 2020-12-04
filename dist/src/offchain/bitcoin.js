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
exports.prepareBitcoinSignedOffchainTransaction = exports.signBitcoinOffchainKMSTransaction = exports.sendBitcoinOffchainTransaction = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const class_validator_1 = require("class-validator");
const model_1 = require("../model");
const wallet_1 = require("../wallet");
const common_1 = require("./common");
/**
 * Send Bitcoin transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendBitcoinOffchainTransaction = async (testnet, body) => {
    await class_validator_1.validateOrReject(body);
    const { mnemonic, keyPair, attr: changeAddress } = body, withdrawal = __rest(body, ["mnemonic", "keyPair", "attr"]);
    if (!withdrawal.fee) {
        withdrawal.fee = '0.0005';
    }
    const { id, data } = await common_1.offchainStoreWithdrawal(withdrawal);
    const { amount, address, } = withdrawal;
    let txData;
    try {
        txData = await exports.prepareBitcoinSignedOffchainTransaction(testnet, data, amount, address, mnemonic, keyPair, changeAddress);
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return Object.assign(Object.assign({}, await common_1.offchainBroadcast({ txData, withdrawalId: id, currency: model_1.Currency.BTC })), { id });
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
};
/**
 * Sign Bitcoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signBitcoinOffchainKMSTransaction = async (tx, mnemonic, testnet) => {
    var _a;
    if (tx.chain !== model_1.Currency.BTC || !tx.withdrawalResponses) {
        throw Error('Unsupported chain.');
    }
    const network = testnet ? bitcoinjs_lib_1.networks.testnet : bitcoinjs_lib_1.networks.bitcoin;
    const builder = bitcoinjs_lib_1.TransactionBuilder.fromTransaction(bitcoinjs_lib_1.Transaction.fromHex(tx.serializedTransaction), network);
    for (const [i, response] of tx.withdrawalResponses.entries()) {
        if (response.vIn === '-1') {
            continue;
        }
        const ecPair = bitcoinjs_lib_1.ECPair.fromWIF(await wallet_1.generatePrivateKeyFromMnemonic(model_1.Currency.BTC, testnet, mnemonic, ((_a = response.address) === null || _a === void 0 ? void 0 : _a.derivationKey) || 0), network);
        builder.sign(i, ecPair);
    }
    return builder.build().toHex();
};
/**
 * Sign Bitcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param data data from Tatum system to prepare transaction from
 * @param amount amount to send
 * @param address recipient address
 * @param mnemonic mnemonic to sign transaction from. mnemonic or keyPair must be present
 * @param keyPair keyPair to sign transaction from. keyPair or mnemonic must be present
 * @param changeAddress address to send the rest of the unused coins
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareBitcoinSignedOffchainTransaction = async (testnet, data, amount, address, mnemonic, keyPair, changeAddress) => {
    var _a;
    const network = testnet ? bitcoinjs_lib_1.networks.testnet : bitcoinjs_lib_1.networks.bitcoin;
    const tx = new bitcoinjs_lib_1.TransactionBuilder(network);
    data.forEach((input) => {
        if (input.vIn !== '-1') {
            tx.addInput(input.vIn, input.vInIndex);
        }
    });
    const lastVin = data.find(d => d.vIn === '-1');
    tx.addOutput(address, Number(new bignumber_js_1.default(amount).multipliedBy(100000000).toFixed(8, bignumber_js_1.default.ROUND_FLOOR)));
    if (mnemonic) {
        const { xpub } = await wallet_1.generateBtcWallet(testnet, mnemonic);
        tx.addOutput(wallet_1.generateAddressFromXPub(model_1.Currency.BTC, testnet, xpub, 0), Number(new bignumber_js_1.default(lastVin.amount).multipliedBy(100000000).toFixed(8, bignumber_js_1.default.ROUND_FLOOR)));
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
            const ecPair = bitcoinjs_lib_1.ECPair.fromWIF(await wallet_1.generatePrivateKeyFromMnemonic(model_1.Currency.BTC, testnet, mnemonic, derivationKey), network);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml0Y29pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vZmZjaGFpbi9iaXRjb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXFDO0FBQ3JDLGlEQUFnRjtBQUNoRixxREFBaUQ7QUFDakQsb0NBQTZHO0FBQzdHLHNDQUFxRztBQUNyRyxxQ0FBOEY7QUFFOUY7Ozs7OztHQU1HO0FBQ1UsUUFBQSw4QkFBOEIsR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxJQUE4QixFQUFFLEVBQUU7SUFDckcsTUFBTSxrQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixNQUFNLEVBQ0YsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsYUFBYSxLQUN0QyxJQUFJLEVBRHVDLFVBQVUsVUFDckQsSUFBSSxFQUZGLCtCQUVMLENBQU8sQ0FBQztJQUNULElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2pCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDO0tBQzdCO0lBQ0QsTUFBTSxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUMsR0FBRyxNQUFNLGdDQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdELE1BQU0sRUFDRixNQUFNLEVBQUUsT0FBTyxHQUNsQixHQUFHLFVBQVUsQ0FBQztJQUNmLElBQUksTUFBTSxDQUFDO0lBQ1gsSUFBSTtRQUNBLE1BQU0sR0FBRyxNQUFNLCtDQUF1QyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0tBQzVIO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0saUNBQXdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLENBQUM7S0FDWDtJ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