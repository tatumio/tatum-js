import BigNumber from 'bignumber.js';
import {validateBody} from '../connector/tatum';
import {getAccountById} from '../ledger';
import {Currency, TransferEthOffchain} from '../model';
import {prepareEgldSignedTransaction} from '../transaction';
import {generatePrivateKeyFromMnemonic} from '../wallet';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';

/**
 * Send EGLD transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendEgldOffchainTransaction = async (testnet: boolean, body: TransferEthOffchain, provider?: string) => {
    await validateBody(body, TransferEthOffchain);
    const {
        mnemonic, index, privateKey, gasLimit, gasPrice, nonce, ...withdrawal
    } = body;
    const {amount, address} = withdrawal;

    const fromPriv = mnemonic && index !== undefined ? await generatePrivateKeyFromMnemonic(Currency.EGLD, testnet, mnemonic, index) : privateKey as string;

    const account = await getAccountById(withdrawal.senderAccountId);
    const fee = {
        gasLimit: gasLimit || '50000',
        gasPrice: gasPrice || '1000000000',
    };
    const txData = await prepareEgldSignedTransaction({
        amount,
        fromPrivateKey: fromPriv,
        fee,
        to: address,
    }, provider);
    // @ts-ignore
    withdrawal.fee = new BigNumber(fee.gasLimit).multipliedBy(fee.gasPrice).toString();
    const {id} = await offchainStoreWithdrawal(withdrawal);
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.EGLD}), id};
    } catch (e) {
        console.error(e);
        try {
            await offchainCancelWithdrawal(id);
        } catch (e1) {
            console.log(e);
            return {id};
        }
    }
};
