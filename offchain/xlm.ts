import {validateOrReject} from 'class-validator';
import {Account, Asset, Keypair, Memo, Networks, Operation, TransactionBuilder} from 'stellar-sdk';
import {xlmGetAccount} from '../blockchain';
import {Currency, TransferXlmOffchain} from '../model';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

export const sendXlmOffchainTransaction = async (testnet: boolean, body: TransferXlmOffchain) => {
    await validateOrReject(body);
    const {
        secret, ...withdrawal
    } = body;
    if (!withdrawal.fee) {
        withdrawal.fee = '0.00001';
    }
    const memo = withdrawal.attr ? withdrawal.attr.length > 28 ? Memo.hash(withdrawal.attr) : Memo.text(withdrawal.attr) : undefined;
    const account = await xlmGetAccount(Keypair.fromSecret(secret).publicKey());
    const {id} = await offchainStoreWithdrawal(withdrawal);
    const {
        amount, address,
    } = withdrawal;

    let txData;
    try {
        txData = await prepareXlmSignedOffchainTransaction(testnet, id, account, amount, address, secret, memo);
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return await offchainBroadcast({txData, withdrawalId: id, currency: Currency.XLM});
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
};

export const prepareXlmSignedOffchainTransaction =
    async (testnet: boolean, id: string, account: any, amount: string, address: string, secret: string, memo?: Memo) => {
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
