import {validateOrReject} from 'class-validator';
import {Account, Asset, Keypair, Memo, Networks, Operation, TransactionBuilder} from 'stellar-sdk';
import {xlmGetAccountInfo} from '../blockchain';
import {Currency, TransactionKMS, TransferXlmOffchain} from '../model';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

/**
 * Send Stellar transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXlmOffchainTransaction = async (testnet: boolean, body: TransferXlmOffchain) => {
    await validateOrReject(body);
    const {
        secret, ...withdrawal
    } = body;
    if (!withdrawal.fee) {
        withdrawal.fee = '0.00001';
    }
    const memo = withdrawal.attr ? withdrawal.attr.length > 28 ? Memo.hash(withdrawal.attr) : Memo.text(withdrawal.attr) : undefined;
    const account = await xlmGetAccountInfo(Keypair.fromSecret(secret).publicKey());
    const {id} = await offchainStoreWithdrawal(withdrawal);
    const {
        amount, address,
    } = withdrawal;

    let txData;
    try {
        txData = await prepareXlmSignedOffchainTransaction(testnet, account, amount, address, secret, memo);
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.XLM}), id};
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
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
export const signXlmOffchainKMSTransaction = async (tx: TransactionKMS, secret: string, testnet: boolean) => {
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
 * @param account Stellar account with information
 * @param amount amount to send
 * @param address recipient address
 * @param secret secret to sign transaction with
 * @param memo short memo to include in transaction
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXlmSignedOffchainTransaction =
    async (testnet: boolean, account: any, amount: string, address: string, secret: string, memo?: Memo) => {
        const builder = new TransactionBuilder(new Account(account.account_id, account.sequence), {
            fee: '100',
            networkPassphrase: testnet ? Networks.TESTNET : Networks.PUBLIC,
            memo,
        }).setTimeout(30);

        const tx = builder.addOperation(Operation.payment({
            destination: address,
            asset: Asset.native(),
            amount,
        })).build();
        tx.sign(Keypair.fromSecret(secret));
        return tx.toEnvelope().toXDR().toString('base64');
    };
