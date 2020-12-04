"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareXrpSignedTransaction = exports.signXrpKMSTransaction = exports.sendXrpTransaction = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const class_validator_1 = require("class-validator");
const ripple_lib_1 = require("ripple-lib");
const blockchain_1 = require("../blockchain");
const model_1 = require("../model");
/**
 * Send Xrp transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendXrpTransaction = async (body) => {
    return blockchain_1.xrpBroadcast(await exports.prepareXrpSignedTransaction(body));
};
/**
 * Sign Xrp pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signXrpKMSTransaction = async (tx, secret) => {
    if (tx.chain !== model_1.Currency.XRP) {
        throw Error('Unsupported chain.');
    }
    const rippleAPI = new ripple_lib_1.RippleAPI();
    return rippleAPI.sign(tx.serializedTransaction, secret).signedTransaction;
};
/**
 * Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareXrpSignedTransaction = async (body) => {
    await class_validator_1.validateOrReject(body);
    const { fromAccount, fromSecret, to, amount, fee, sourceTag, destinationTag, } = body;
    const f = fee ? fee : new bignumber_js_1.default((await blockchain_1.xrpGetFee()).drops.base_fee).dividedBy(1000000).toString();
    const payment = {
        source: {
            address: fromAccount,
            maxAmount: {
                currency: 'XRP',
                value: amount,
            },
            tag: sourceTag,
        },
        destination: {
            address: to,
            amount: {
                currency: 'XRP',
                value: amount,
            },
            tag: destinationTag,
        },
    };
    const accountInfo = await blockchain_1.xrpGetAccountInfo(fromAccount);
    const sequence = accountInfo.account_data.Sequence;
    const maxLedgerVersion = accountInfo.ledger_current_index + 5;
    const rippleAPI = new ripple_lib_1.RippleAPI();
    const prepared = await rippleAPI.preparePayment(fromAccount, payment, {
        fee: f,
        sequence,
        maxLedgerVersion,
    });
    const signed = await rippleAPI.sign(prepared.txJSON, fromSecret);
    return signed.signedTransaction;
};
// TODO: add support for ModifyAccount and TrustLine
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHJwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zYWN0aW9uL3hycC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRUFBcUM7QUFDckMscURBQWlEO0FBQ2pELDJDQUFxQztBQUVyQyw4Q0FBeUU7QUFDekUsb0NBQStEO0FBRS9EOzs7OztHQUtHO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsSUFBaUIsRUFBRSxFQUFFO0lBQzFELE9BQU8seUJBQVksQ0FBQyxNQUFNLG1DQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDakUsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDVSxRQUFBLHFCQUFxQixHQUFHLEtBQUssRUFBRSxFQUFrQixFQUFFLE1BQWMsRUFBRSxFQUFFO0lBQzlFLElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxnQkFBUSxDQUFDLEdBQUcsRUFBRTtRQUMzQixNQUFNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7SUFDbEMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztBQUM5RSxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ1UsUUFBQSwyQkFBMkIsR0FBRyxLQUFLLEVBQUUsSUFBaUIsRUFBRSxFQUFFO0lBQ25FLE1BQU0sa0NBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsTUFBTSxFQUNGLFdBQVcsRUFDWCxVQUFVLEVBQ1YsRUFBRSxFQUNGLE1BQU0sRUFDTixHQUFHLEVBQ0gsU0FBUyxFQUNULGNBQWMsR0FDakIsR0FBRyxJQUFJLENBQUM7SUFFVCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxzQkFBUyxDQUFDLENBQUMsTUFBTSxzQkFBUyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RHLE1BQU0sT0FBTyxHQUFZO1FBQ3JCLE1BQU0sRUFBRTtZQUNKLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLFNBQVMsRUFBRTtnQkFDUCxRQUFRLEVBQUUsS0FBSztnQkFDZixLQUFLLEVBQUUsTUFBTTthQUNoQjtZQUNELEdBQUcsRUFBRSxTQUFTO1NBQ2pCO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsS0FBSyxFQUFFLE1BQU07YUFDaEI7WUFDRCxHQUFHLEVBQUUsY0FBYztTQUN0QjtLQUNKLENBQUM7SUFDRixNQUFNLFdBQVcsR0FBRyxNQUFNLDhCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQ25ELE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztJQUM5RCxNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQztJQUNsQyxNQUFNLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtRQUNsRSxHQUFHLEVBQUUsQ0FBQztRQUNOLFFBQVE7UUFDUixnQkFBZ0I7S0FDbkIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakUsT0FBTyxNQUFNLENBQUMsaUJBQWlCLENBQUM7QUFDcEMsQ0FBQyxDQUFDO0FBRUYsb0RBQW9EIn0=