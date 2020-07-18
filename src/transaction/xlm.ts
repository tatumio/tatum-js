import {validateOrReject} from 'class-validator';
import {Account, Asset, Keypair, Memo, Networks, Operation, TransactionBuilder} from 'stellar-sdk';
import {xlmBroadcast, xlmGetAccountInfo} from '../blockchain';
import {Currency, TransactionKMS, TransferXlm} from '../model';

/**
 * Send Stellar transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXlmTransaction = async (testnet: boolean, body: TransferXlm) => {
    return xlmBroadcast(await prepareXlmSignedTransaction(testnet, body));
};

/**
 * Sign Stellar pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signXlmKMSTransaction = async (tx: TransactionKMS, secret: string, testnet: boolean) => {
    if (tx.chain !== Currency.XLM) {
        throw Error('Unsupported chain.');
    }
    const transaction = TransactionBuilder.fromXDR(tx.serializedTransaction, testnet ? Networks.TESTNET : Networks.PUBLIC);
    transaction.sign(Keypair.fromSecret(secret));
    return transaction.toEnvelope().toXDR().toString('base64');
};

/**
 * Sign Stellar transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXlmSignedTransaction = async (testnet: boolean, body: TransferXlm) => {
    await validateOrReject(body);
    const {
        fromSecret,
        to,
        amount,
        message,
        initialize,
    } = body;

    const memo = message ? message.length > 28 ? Memo.hash(message) : Memo.text(message) : undefined;
    const fromAccount = Keypair.fromSecret(fromSecret).publicKey();
    const account = await xlmGetAccountInfo(fromAccount);
    const builder = new TransactionBuilder(new Account(fromAccount, account.sequence), {
        fee: '100',
        networkPassphrase: testnet ? Networks.TESTNET : Networks.PUBLIC,
        memo,
    }).setTimeout(30);
    const tx = initialize
        ? builder.addOperation(Operation.createAccount({
            destination: to.trim(),
            startingBalance: amount,
        })).build()
        : builder.addOperation(Operation.payment({
            destination: to.trim(),
            asset: Asset.native(),
            amount,
        }))
            .build();
    tx.sign(Keypair.fromSecret(fromSecret));
    return tx.toEnvelope().toXDR().toString('base64');
};

// TODO: add support for TrustLine