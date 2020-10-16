import BigNumber from 'bignumber.js';
import {validateOrReject} from 'class-validator';
import {RippleAPI} from 'ripple-lib';
import {xrpGetAccountInfo, xrpGetFee} from '../blockchain';
import {Currency, TransactionKMS, TransferXrpOffchain} from '../model';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

/**
 * Send Xrp transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXrpOffchainTransaction = async (testnet: boolean, body: TransferXrpOffchain) => {
    await validateOrReject(body);
    const {
        account, secret, ...withdrawal
    } = body;
    if (!withdrawal.fee) {
        withdrawal.fee = new BigNumber((await xrpGetFee()).drops.base_fee).dividedBy(1000000).toString();
    }
    const acc = await xrpGetAccountInfo(account);
    const {id} = await offchainStoreWithdrawal(withdrawal);
    const {
        amount, fee, address,
    } = withdrawal;

    let txData;
    try {
        txData = await prepareXrpSignedOffchainTransaction(testnet, amount, address, secret, acc, fee, withdrawal.sourceTag, withdrawal.attr);
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.XRP}), id};
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
};

/**
 * Sign Xrp pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param secret secret key to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signXrpOffchainKMSTransaction = async (tx: TransactionKMS, secret: string) => {
    if (tx.chain !== Currency.XRP) {
        throw Error('Unsupported chain.');
    }
    const rippleAPI = new RippleAPI();
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
export const prepareXrpSignedOffchainTransaction =
    async (testnet: boolean, amount: string, address: string, secret: string, account: any, fee: string, sourceTag?: number, destinationTag?: string) => {
        const currency = 'XRP';
        const payment: any = {
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
        const rippleAPI = new RippleAPI();
        const prepared = await rippleAPI.preparePayment(account.account_data.Account, payment, {
            fee: `${fee}`,
            sequence: account.account_data.Sequence,
            maxLedgerVersion: account.ledger_current_index + 5,
        });
        return (await rippleAPI.sign(prepared.txJSON, secret)).signedTransaction;
    };
