import {Account, Asset, Keypair, Memo, Networks, Operation, TransactionBuilder} from 'stellar-sdk';
import {getXlmAccountInfo} from '../blockchain';
import {TransferXlm} from '../model/TransferXlm';

export const prepareXlmSignedTransaction = async (testnet: boolean, body: TransferXlm) => {
    const {
        fromSecret,
        to,
        amount,
        message,
        initialize,
    } = body;

    const memo = message ? message.length > 28 ? Memo.hash(message) : Memo.text(message) : undefined;
    const fromAccount = Keypair.fromSecret(fromSecret).publicKey();
    const account = await getXlmAccountInfo(fromAccount);
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