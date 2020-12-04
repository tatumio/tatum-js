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
exports.prepareBitcoinCashSignedOffchainTransaction = exports.signBitcoinCashOffchainKMSTransaction = exports.sendBitcoinCashOffchainTransaction = void 0;
const bitcoincashjs2_lib_1 = require("@bitcoin-dot-com/bitcoincashjs2-lib");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const bitbox_sdk_1 = require("bitbox-sdk");
const class_validator_1 = require("class-validator");
// @ts-ignore
const coininfo_1 = __importDefault(require("coininfo"));
const model_1 = require("../model");
const wallet_1 = require("../wallet");
const common_1 = require("./common");
/**
 * Send Bitcoin Cash transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendBitcoinCashOffchainTransaction = async (testnet, body) => {
    await class_validator_1.validateOrReject(body);
    const { mnemonic, keyPair, attr: changeAddress } = body, withdrawal = __rest(body, ["mnemonic", "keyPair", "attr"]);
    if (!withdrawal.fee) {
        withdrawal.fee = '0.00005';
    }
    const { id, data } = await common_1.offchainStoreWithdrawal(withdrawal);
    const { amount, address, } = withdrawal;
    let txData;
    try {
        txData = await exports.prepareBitcoinCashSignedOffchainTransaction(testnet, data, amount, address, mnemonic, keyPair, changeAddress);
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return Object.assign(Object.assign({}, await common_1.offchainBroadcast({ txData, withdrawalId: id, currency: model_1.Currency.BCH })), { id });
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
};
/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param mnemonic mnemonic to generate private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signBitcoinCashOffchainKMSTransaction = async (tx, mnemonic, testnet) => {
    var _a;
    if (tx.chain !== model_1.Currency.BCH || !tx.withdrawalResponses) {
        throw Error('Unsupported chain.');
    }
    const [data, amountsToDecode] = tx.serializedTransaction.split(':');
    const transaction = bitcoincashjs2_lib_1.Transaction.fromHex(data);
    const amountsToSign = JSON.parse(amountsToDecode);
    const network = testnet ? coininfo_1.default.bitcoincash.test.toBitcoinJS() : coininfo_1.default.bitcoincash.main.toBitcoinJS();
    const builder = bitcoincashjs2_lib_1.TransactionBuilder.fromTransaction(transaction, network);
    for (const [i, response] of tx.withdrawalResponses.entries()) {
        if (response.vIn === '-1') {
            continue;
        }
        const ecPair = new bitbox_sdk_1.ECPair().fromWIF(await wallet_1.generatePrivateKeyFromMnemonic(model_1.Currency.BCH, testnet, mnemonic, ((_a = response.address) === null || _a === void 0 ? void 0 : _a.derivationKey) || 0));
        builder.sign(i, ecPair, undefined, 0x01, amountsToSign[i], undefined, bitcoincashjs2_lib_1.ECSignature.SCHNORR);
    }
    return builder.build().toHex();
};
/**
 * Sign Bitcoin Cash transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param data data from Tatum system to prepare transaction from
 * @param amount amount to send
 * @param address recipient address
 * @param mnemonic mnemonic to sign transaction from. mnemonic or keyPair must be present
 * @param keyPair keyPair to sign transaction from. keyPair or mnemonic must be present
 * @param changeAddress address to send the rest of the unused coins
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareBitcoinCashSignedOffchainTransaction = async (testnet, data, amount, address, mnemonic, keyPair, changeAddress) => {
    const networkType = testnet ? 'testnet' : 'mainnet';
    const tx = new bitbox_sdk_1.TransactionBuilder(networkType);
    data.forEach((input) => {
        if (input.vIn !== '-1') {
            tx.addInput(input.vIn, input.vInIndex);
        }
    });
    const lastVin = data.find(d => d.vIn === '-1');
    tx.addOutput(address, Number(new bignumber_js_1.default(amount).multipliedBy(100000000).toFixed(0, bignumber_js_1.default.ROUND_FLOOR)));
    if (mnemonic) {
        const { xpub } = wallet_1.generateBchWallet(testnet, mnemonic);
        tx.addOutput(wallet_1.generateAddressFromXPub(model_1.Currency.BCH, testnet, xpub, 0), Number(new bignumber_js_1.default(lastVin.amount).multipliedBy(100000000).toFixed(0, bignumber_js_1.default.ROUND_FLOOR)));
    }
    else if (keyPair && changeAddress) {
        tx.addOutput(changeAddress, Number(new bignumber_js_1.default(lastVin.amount).multipliedBy(100000000).toFixed(0, bignumber_js_1.default.ROUND_FLOOR)));
    }
    else {
        throw new Error('Impossible to prepare transaction. Either mnemonic or keyPair and attr must be present.');
    }
    for (const [i, input] of data.entries()) {
        // when there is no address field present, input is pool transfer to 0
        if (input.vIn === '-1') {
            continue;
        }
        const value = Number(new bignumber_js_1.default(data[i].amount).multipliedBy(100000000).toFixed(0, bignumber_js_1.default.ROUND_FLOOR));
        if (mnemonic) {
            const derivationKey = input.address && input.address.derivationKey ? input.address.derivationKey : 0;
            const privateKey = await wallet_1.generatePrivateKeyFromMnemonic(model_1.Currency.BCH, testnet, mnemonic, derivationKey);
            const ecPair = new bitbox_sdk_1.ECPair().fromWIF(privateKey);
            tx.sign(i, ecPair, undefined, tx.hashTypes.SIGHASH_ALL, value, tx.signatureAlgorithms.SCHNORR);
        }
        else if (keyPair) {
            // @ts-ignore
            const privateKey = keyPair.find(k => k.address === input.address.address);
            if (privateKey) {
                const ecPair = new bitbox_sdk_1.ECPair().fromWIF(privateKey.privateKey);
                tx.sign(i, ecPair, undefined, tx.hashTypes.SIGHASH_ALL, value, tx.signatureAlgorithms.SCHNORR);
            }
        }
    }
    return tx.build().toHex();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmNhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvb2ZmY2hhaW4vYmNhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFLNkM7QUFDN0MsZ0VBQXFDO0FBQ3JDLDJDQUFzRDtBQUN0RCxxREFBaUQ7QUFDakQsYUFBYTtBQUNiLHdEQUFnQztBQUNoQyxvQ0FBNkc7QUFDN0csc0NBQXFHO0FBQ3JHLHFDQUE4RjtBQUU5Rjs7Ozs7O0dBTUc7QUFDVSxRQUFBLGtDQUFrQyxHQUFHLEtBQUssRUFBRSxPQUFnQixFQUFFLElBQThCLEVBQUUsRUFBRTtJQUN6RyxNQUFNLGtDQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLE1BQU0sRUFDRixRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxhQUFhLEtBQ3RDLElBQUksRUFEdUMsVUFBVSxVQUNyRCxJQUFJLEVBRkYsK0JBRUwsQ0FBTyxDQUFDO0lBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDakIsVUFBVSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7S0FDOUI7SUFDRCxNQUFNLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBQyxHQUFHLE1BQU0sZ0NBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0QsTUFBTSxFQUNGLE1BQU0sRUFBRSxPQUFPLEdBQ2xCLEdBQUcsVUFBVSxDQUFDO0lBQ2YsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJO1FBQ0EsTUFBTSxHQUFHLE1BQU0sbURBQTJDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDaEk7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxpQ0FBd0IsQ0FBQyxFQUFFLENBQUMs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