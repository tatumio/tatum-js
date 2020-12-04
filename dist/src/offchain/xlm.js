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
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareXlmSignedOffchainTransaction = exports.signXlmOffchainKMSTransaction = exports.sendXlmOffchainTransaction = void 0;
const class_validator_1 = require("class-validator");
const stellar_sdk_1 = require("stellar-sdk");
const blockchain_1 = require("../blockchain");
const model_1 = require("../model");
const common_1 = require("./common");
/**
 * Send Stellar transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendXlmOffchainTransaction = async (testnet, body) => {
    await class_validator_1.validateOrReject(body);
    const { secret } = body, withdrawal = __rest(body, ["secret"]);
    if (!withdrawal.fee) {
        withdrawal.fee = '0.00001';
    }
    const memo = withdrawal.attr ? withdrawal.attr.length > 28 ? stellar_sdk_1.Memo.hash(withdrawal.attr) : stellar_sdk_1.Memo.text(withdrawal.attr) : undefined;
    const account = await blockchain_1.xlmGetAccountInfo(stellar_sdk_1.Keypair.fromSecret(secret).publicKey());
    const { id } = await common_1.offchainStoreWithdrawal(withdrawal);
    const { amount, address, } = withdrawal;
    let txData;
    try {
        txData = await exports.prepareXlmSignedOffchainTransaction(testnet, account, amount, address, secret, memo);
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return Object.assign(Object.assign({}, await common_1.offchainBroadcast({ txData, withdrawalId: id, currency: model_1.Currency.XLM })), { id });
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
};
/**
 * Sign Stellar pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signXlmOffchainKMSTransaction = async (tx, secret, testnet) => {
    if (tx.chain !== model_1.Currency.XLM) {
        throw Error('Unsupported chain.');
    }
    const transaction = stellar_sdk_1.TransactionBuilder.fromXDR(tx.serializedTransaction, testnet ? stellar_sdk_1.Networks.TESTNET : stellar_sdk_1.Networks.PUBLIC);
    transaction.sign(stellar_sdk_1.Keypair.fromSecret(secret));
    return transaction.toEnvelope().toXDR().toString('base64');
};
/**
 * Sign Stellar transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param account Stellar account with information
 * @param amount amount to send
 * @param address recipient address
 * @param secret secret to sign transaction with
 * @param memo short memo to include in transaction
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareXlmSignedOffchainTransaction = async (testnet, account, amount, address, secret, memo) => {
    const builder = new stellar_sdk_1.TransactionBuilder(new stellar_sdk_1.Account(account.account_id, account.sequence), {
        fee: '100',
        networkPassphrase: testnet ? stellar_sdk_1.Networks.TESTNET : stellar_sdk_1.Networks.PUBLIC,
        memo,
    }).setTimeout(30);
    const tx = builder.addOperation(stellar_sdk_1.Operation.payment({
        destination: address,
        asset: stellar_sdk_1.Asset.native(),
        amount,
    })).build();
    tx.sign(stellar_sdk_1.Keypair.fromSecret(secret));
    return tx.toEnvelope().toXDR().toString('base64');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL29mZmNoYWluL3hsbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFpRDtBQUNqRCw2Q0FBbUc7QUFDbkcsOENBQWdEO0FBQ2hELG9DQUF1RTtBQUN2RSxxQ0FBOEY7QUFFOUY7Ozs7OztHQU1HO0FBQ1UsUUFBQSwwQkFBMEIsR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxJQUF5QixFQUFFLEVBQUU7SUFDNUYsTUFBTSxrQ0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixNQUFNLEVBQ0YsTUFBTSxLQUNOLElBQUksRUFETyxVQUFVLFVBQ3JCLElBQUksRUFGRixVQUVMLENBQU8sQ0FBQztJQUNULElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2pCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO0tBQzlCO0lBQ0QsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2pJLE1BQU0sT0FBTyxHQUFHLE1BQU0sOEJBQWlCLENBQUMscUJBQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNoRixNQUFNLEVBQUMsRUFBRSxFQUFDLEdBQUcsTUFBTSxnQ0FBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RCxNQUFNLEVBQ0YsTUFBTSxFQUFFLE9BQU8sR0FDbEIsR0FBRyxVQUFVLENBQUM7SUFFZixJQUFJLE1BQU0sQ0FB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