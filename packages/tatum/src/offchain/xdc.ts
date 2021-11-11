import BigNumber from 'bignumber.js';
import {fromWei, toWei} from 'web3-utils';
import {validateBody} from '../connector/tatum';
import {Currency, TransferEthOffchain} from '../model';
import {prepareXdcOrErc20SignedTransaction} from '../transaction';
import {generatePrivateKeyFromMnemonic} from '../wallet';
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common';
import { offchainTransferXdcKMS } from './kms'

/**
 * Send XDC transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendXdcOffchainTransaction = async (testnet: boolean, body: TransferEthOffchain, provider?: string) => {
    if (body.signatureId) {
        return offchainTransferXdcKMS(body)
    }
    await validateBody(body, TransferEthOffchain)
    const {
        mnemonic, index, privateKey, gasLimit, gasPrice, nonce, ...withdrawal
    } = body
    const {amount, address} = withdrawal

    const fromPriv = mnemonic && index !== undefined ? await generatePrivateKeyFromMnemonic(Currency.XDC, testnet, mnemonic, index) : privateKey as string

    const fee = {
        gasLimit: gasLimit || '21000',
        gasPrice: gasPrice || '5',
    }
    const txData = await prepareXdcOrErc20SignedTransaction({
        amount,
        fromPrivateKey: fromPriv,
        fee,
        nonce,
        to: address,
    }, provider)
    // @ts-ignore
    withdrawal.fee = fromWei(new BigNumber(fee.gasLimit).multipliedBy(toWei(fee.gasPrice, 'kwei')).toString(), 'ether')
    const {id} = await offchainStoreWithdrawal(withdrawal)
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.XDC}), id}
    } catch (e) {
        console.error(e)
        try {
            await offchainCancelWithdrawal(id)
        } catch (e1) {
            console.log(e)
            return {id}
        }
    }
}
