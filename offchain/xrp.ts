import BigNumber from 'bignumber.js';
import {validateOrReject} from 'class-validator';
import {RippleAPI} from 'ripple-lib';
import {xrpGetAccount, xrpGetFee} from '../blockchain';
import {Currency, TransferXrpOffchain} from '../model';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

export const sendXrpOffchainTransaction = async (testnet: boolean, body: TransferXrpOffchain) => {
    await validateOrReject(body);
    const {
        account, secret, ...withdrawal
    } = body;
    if (!withdrawal.fee) {
        withdrawal.fee = new BigNumber((await xrpGetFee()).drops.base_fee).dividedBy(1000000).toString();
    }
    const acc = await xrpGetAccount(account);
    const {id} = await offchainStoreWithdrawal(withdrawal);
    const {
        amount, fee, address,
    } = withdrawal;

    let txData;
    try {
        txData = await prepareXrpSignedOffchainTransaction(testnet, id, account, amount, address, secret, acc, fee, withdrawal.sourceTag, withdrawal.attr);
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
    try {
        return await offchainBroadcast({txData, withdrawalId: id, currency: Currency.XRP});
    } catch (e) {
        console.error(e);
        await offchainCancelWithdrawal(id);
        throw e;
    }
};

export const prepareXrpSignedOffchainTransaction =
    async (testnet: boolean, id: string, account: any, amount: string, address: string, secret: string, acc: any, fee: string, sourceTag?: number, attr?: string) => {
        const currency = 'XRP';
        const payment: any = {
            source: {
                address: account,
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
        if (attr) {
            payment.destination.tag = parseInt(attr);
        }
        const rippleAPI = new RippleAPI();
        const prepared = await rippleAPI.preparePayment(account, payment, {
            fee: `${fee}`,
            sequence: acc.account_data.Sequence,
            maxLedgerVersion: acc.ledger_current_index + 5,
        });
        return (await rippleAPI.sign(prepared.txJSON, secret)).signedTransaction;
    };
