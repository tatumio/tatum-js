"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareXlmSignedTransaction = exports.signXlmKMSTransaction = exports.sendXlmTransaction = void 0;
const class_validator_1 = require("class-validator");
const stellar_sdk_1 = require("stellar-sdk");
const blockchain_1 = require("../blockchain");
const model_1 = require("../model");
/**
 * Send Stellar transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
exports.sendXlmTransaction = async (testnet, body) => {
    return blockchain_1.xlmBroadcast(await exports.prepareXlmSignedTransaction(testnet, body));
};
/**
 * Sign Stellar pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
exports.signXlmKMSTransaction = async (tx, secret, testnet) => {
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
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
exports.prepareXlmSignedTransaction = async (testnet, body) => {
    await class_validator_1.validateOrReject(body);
    const { fromSecret, to, amount, message, initialize, } = body;
    const memo = message ? message.length > 28 ? stellar_sdk_1.Memo.hash(message) : stellar_sdk_1.Memo.text(message) : undefined;
    const fromAccount = stellar_sdk_1.Keypair.fromSecret(fromSecret).publicKey();
    const account = await blockchain_1.xlmGetAccountInfo(fromAccount);
    const builder = new stellar_sdk_1.TransactionBuilder(new stellar_sdk_1.Account(fromAccount, account.sequence), {
        fee: '100',
        networkPassphrase: testnet ? stellar_sdk_1.Networks.TESTNET : stellar_sdk_1.Networks.PUBLIC,
        memo,
    }).setTimeout(30);
    const tx = initialize
        ? builder.addOperation(stellar_sdk_1.Operation.createAccount({
            destination: to.trim(),
            startingBalance: amount,
        })).build()
        : builder.addOperation(stellar_sdk_1.Operation.payment({
            destination: to.trim(),
            asset: stellar_sdk_1.Asset.native(),
            amount,
        }))
            .build();
    tx.sign(stellar_sdk_1.Keypair.fromSecret(fromSecret));
    return tx.toEnvelope().toXDR().toString('base64');
};
// TODO: add support for TrustLine
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zYWN0aW9uL3hsbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBaUQ7QUFDakQsNkNBQW1HO0FBQ25HLDhDQUE4RDtBQUM5RCxvQ0FBK0Q7QUFFL0Q7Ozs7OztHQU1HO0FBQ1UsUUFBQSxrQkFBa0IsR0FBRyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxJQUFpQixFQUFFLEVBQUU7SUFDNUUsT0FBTyx5QkFBWSxDQUFDLE1BQU0sbUNBQTJCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDMUUsQ0FBQyxDQUFDO0FBRUY7Ozs7OztHQU1HO0FBQ1UsUUFBQSxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsRUFBa0IsRUFBRSxNQUFjLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO0lBQ2hHLElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxnQkFBUSxDQUFDLEdBQUcsRUFBRTtRQUMzQixNQUFNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsTUFBTSxXQUFXLEdBQUcsZ0NBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLHNCQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZILFdBQVcsQ0FBQyxJQUFJLENBQUMscUJBQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3QyxPQUFPLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0QsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDVSxRQUFBLDJCQUEyQixHQUFHLEtBQUssRUFBRSxPQUFnQixFQUFFLElBQWlCLEVBQUUsRUFBRTtJQUNyRixNQUFNLGtDQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLE1BQU0sRUFDRixVQUFVLEVBQ1YsRUFBRSxFQUNGLE1BQU0sRUFDTixPQUFPLEVBQ1AsVUFBVSxHQUNiLEdBQUcsSUFBSSxDQUFDO0lBRVQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsa0JBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDakcsTUFBTSxXQUFXLEdBQUcscUJBQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0QsTUFBTSxPQUFPLEdBQUcsTUFBTSw4QkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGdDQUFrQixDQUFDLElBQUkscUJBQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQy9FLEdBQUcsRUFBRSxLQUFLO1FBQ1YsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsc0JBQVEsQ0FBQyxNQUFNO1FBQy9ELElBQUk7S0FDUCxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sRUFBRSxHQUFHLFVBQVU7UUFDakIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsdUJBQVMsQ0FBQyxhQUFhLENBQUM7WUFDM0MsV0FBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsZUFBZSxFQUFFLE1BQU07U0FDMUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO1FBQ1gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsdUJBQVMsQ0FBQyxPQUFPLENBQUM7WUFDckMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsS0FBSyxFQUFFLG1CQUFLLENBQUMsTUFBTSxFQUFFO1lBQ3JCLE1BQU07U0FDVCxDQUFDLENBQUM7YUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNqQixFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDeEMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELENBQUMsQ0FBQztBQUVGLGtDQUFrQyJ9