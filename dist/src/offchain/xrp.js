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
exports.prepareXrpSignedOffchainTransaction = exports.signXrpOffchainKMSTransaction = exports.sendXrpOffchainTransaction = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const class_validator_1 = require("class-validator");
const ripple_lib_1 = require("ripple-lib");
const blockchain_1 = require("../blockchain");
const model_1 = require("../model");
const common_1 = require("./common");
/**
 * Send Xrp transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendXrpOffchainTransaction = async (testnet, body) => {
    await class_validator_1.validateOrReject(body);
    const { account, secret } = body, withdrawal = __rest(body, ["account", "secret"]);
    if (!withdrawal.fee) {
        withdrawal.fee = new bignumber_js_1.default((await blockchain_1.xrpGetFee()).drops.base_fee).dividedBy(1000000).toString();
    }
    const acc = await blockchain_1.xrpGetAccountInfo(account);
    const { id } = await common_1.offchainStoreWithdrawal(withdrawal);
    const { amount, fee, address, } = withdrawal;
    let txData;
    try {
        txData = await exports.prepareXrpSignedOffchainTransaction(testnet, amount, address, secret, acc, fee, withdrawal.sourceTag, withdrawal.attr);
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return Object.assign(Object.assign({}, await common_1.offchainBroadcast({ txData, withdrawalId: id, currency: model_1.Currency.XRP })), { id });
    }
    catch (e) {
        console.error(e);
        await common_1.offchainCancelWithdrawal(id);
        throw e;
    }
};
/**
 * Sign Xrp pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signXrpOffchainKMSTransaction = async (tx, secret) => {
    if (tx.chain !== model_1.Currency.XRP) {
        throw Error('Unsupported chain.');
    }
    const rippleAPI = new ripple_lib_1.RippleAPI();
    return rippleAPI.sign(tx.serializedTransaction, secret).signedTransaction;
};
/**
 * Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param amount amount to send
 * @param address recipient address
 * @param secret secret to sign transaction with
 * @param account Xrp source account
 * @param fee fee to pay
 * @param sourceTag source tag to include in transaction
 * @param destinationTag
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareXrpSignedOffchainTransaction = async (testnet, amount, address, secret, account, fee, sourceTag, destinationTag) => {
    const currency = 'XRP';
    const payment = {
        source: {
            address: account.account_data.Account,
            maxAmount: {
                currency,
                value: amount,
            },
            tag: sourceTag,
        },
        destination: {
            address,
            amount: {
                currency,
                value: amount,
            },
        },
    };
    if (destinationTag) {
        payment.destination.tag = parseInt(destinationTag);
    }
    const rippleAPI = new ripple_lib_1.RippleAPI();
    const prepared = await rippleAPI.preparePayment(account.account_data.Account, payment, {
        fee: `${fee}`,
        sequence: account.account_data.Sequence,
        maxLedgerVersion: account.ledger_current_index + 5,
    });
    return (await rippleAPI.sign(prepared.txJSON, secret)).signedTransaction;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHJwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL29mZmNoYWluL3hycC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUFxQztBQUNyQyxxREFBaUQ7QUFDakQsMkNBQXFDO0FBQ3JDLDhDQUEyRDtBQUMzRCxvQ0FBdUU7QUFDdkUscUNBQThGO0FBRTlGOzs7Ozs7R0FNRztBQUNVLFFBQUEsMEJBQTBCLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQUUsSUFBeUIsRUFBRSxFQUFFO0lBQzVGLE1BQU0sa0NBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsTUFBTSxFQUNGLE9BQU8sRUFBRSxNQUFNLEtBQ2YsSUFBSSxFQURnQixVQUFVLFVBQzlCLElBQUksRUFGRixxQkFFTCxDQUFPLENBQUM7SUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNqQixVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksc0JBQVMsQ0FBQyxDQUFDLE1BQU0sc0JBQVMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNwRztJQUNELE1BQU0sR0FBRyxHQUFHLE1BQU0sOEJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsTUFBTSxFQUFDLEVBQUUsRUFBQyxHQUFHLE1BQU0sZ0NBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkQsTUFBTSxFQUNGLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxHQUN2QixHQUFHLFVBQVUsQ0FBQztJQUVmLElBQUksTUFBTSxDQUFDO0lBQ1gsSUFBSTtRQUNBLE1BQU0sR0FBRyxNQUFNLDJDQUFtQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUFTLEVBQUUs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