import BigNumber from 'bignumber.js'
import { fromWei, toWei } from 'web3-utils'
import { validateBody } from '../connector/tatum'
import { getAccountById, getVirtualCurrencyByName } from '../ledger'
import { Currency, TransferEthOffchain } from '../model'
import { prepareKlaytnSignedTransaction, prepareKlaytnTransferErc20SignedTransaction } from '../transaction'
import { generatePrivateKeyFromMnemonic } from '../wallet'
import { offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal } from './common'
import { offchainTransferKlaytnKMS } from './kms'

/**
 * Send Klaytn transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Klaytn Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendKlaytntnOffchainTransaction = async (testnet: boolean, body: TransferEthOffchain, provider?: string) => {
    if (body.signatureId) {
        return offchainTransferKlaytnKMS(body)
    }
    await validateBody(body, TransferEthOffchain)
    const {
        mnemonic, index, privateKey, gasLimit, gasPrice, nonce, ...withdrawal
    } = body
    const { amount, address } = withdrawal

    const fromPriv = mnemonic && index !== undefined ? await generatePrivateKeyFromMnemonic(Currency.KLAY, testnet, mnemonic, index) : privateKey as string

    const account = await getAccountById(withdrawal.senderAccountId)
    let txData
    const fee = {
        gasLimit: gasLimit || '21000',
        gasPrice: gasPrice || '25',
    }
    if (account.currency === Currency.KLAY) {
        txData = await prepareKlaytnSignedTransaction(testnet, {
            amount,
            fromPrivateKey: fromPriv,
            currency: account.currency,
            fee,
            nonce,
            to: address,
        }, provider)
    } else {
        fee.gasLimit = '100000'
        const vc = await getVirtualCurrencyByName(account.currency)
        txData = await prepareKlaytnTransferErc20SignedTransaction(testnet, {
            amount,
            fee,
            fromPrivateKey: fromPriv,
            to: address,
            digits: vc.precision as number,
            nonce,
            contractAddress: vc.erc20Address as string,
        }, provider)
    }
    // @ts-ignore
    withdrawal.fee = fromWei(new BigNumber(fee.gasLimit).multipliedBy(toWei(fee.gasPrice, 'gwei')).toString(), 'ether')
    const { id } = await offchainStoreWithdrawal(withdrawal)
    try {
        return { ...await offchainBroadcast({ txData, withdrawalId: id, currency: Currency.KLAY }), id }
    } catch (e) {
        console.error(e)
        try {
            await offchainCancelWithdrawal(id)
        } catch (e1) {
            console.log(e)
            return { id }
        }
        throw e
    }
}
