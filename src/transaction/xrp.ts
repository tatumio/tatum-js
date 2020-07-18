import BigNumber from 'bignumber.js';
import {validateOrReject} from 'class-validator';
import {RippleAPI} from 'ripple-lib';
import {Payment} from 'ripple-lib/dist/npm/transaction/payment';
import {xrpBroadcast, xrpGetAccountInfo, xrpGetFee} from '../blockchain';
import {Currency, TransactionKMS, TransferXrp} from '../model';

/**
 * Send Xrp transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXrpTransaction = async (body: TransferXrp) => {
    return xrpBroadcast(await prepareXrpSignedTransaction(body));
};

/**
 * Sign Xrp pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signXrpKMSTransaction = async (tx: TransactionKMS, secret: string) => {
    if (tx.chain !== Currency.XRP) {
        throw Error('Unsupported chain.');
    }
    const rippleAPI = new RippleAPI();
    return rippleAPI.sign(tx.serializedTransaction, secret).signedTransaction;
};

/**
 * Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXrpSignedTransaction = async (body: TransferXrp) => {
    await validateOrReject(body);
    const {
        fromAccount,
        fromSecret,
        to,
        amount,
        fee,
        sourceTag,
        destinationTag,
    } = body;

    const f = fee ? fee : new BigNumber((await xrpGetFee()).drops.base_fee).dividedBy(1000000).toString();
    const payment: Payment = {
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
    const accountInfo = await xrpGetAccountInfo(fromAccount);
    const sequence = accountInfo.account_data.Sequence;
    const maxLedgerVersion = accountInfo.ledger_current_index + 5;
    const rippleAPI = new RippleAPI();
    const prepared = await rippleAPI.preparePayment(fromAccount, payment, {
        fee: f,
        sequence,
        maxLedgerVersion,
    });
    const signed = await rippleAPI.sign(prepared.txJSON, fromSecret);
    return signed.signedTransaction;
};

// TODO: add support for ModifyAccount and TrustLine