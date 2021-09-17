import BigNumber from 'bignumber.js'
import {fromWei, toWei} from 'web3-utils'
import {validateBody} from '../connector/tatum'
import {getAccountById, getVirtualCurrencyByName} from '../ledger'
import {BSC_BASED_CURRENCIES, Currency, TransferEthOffchain} from '../model'
import {prepareBscOrBep20SignedTransaction, prepareCustomBep20SignedTransaction} from '../transaction'
import {generatePrivateKeyFromMnemonic} from '../wallet'
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common'
import { offchainTransferBscKMS } from './kms'

/**
 * Send Bsc transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendBscOffchainTransaction = async (testnet: boolean, body: TransferEthOffchain, provider?: string) => {
    if(body.signatureId) {
        return offchainTransferBscKMS(body)
    }
    await validateBody(body, TransferEthOffchain)
    const {
        mnemonic, index, privateKey, gasLimit, gasPrice, nonce, ...withdrawal
    } = body
    const {amount, address} = withdrawal

    const fromPriv = mnemonic && index !== undefined ? await generatePrivateKeyFromMnemonic(Currency.BSC, testnet, mnemonic, index) : privateKey as string

    const account = await getAccountById(withdrawal.senderAccountId)
    let txData
    const fee = {
        gasLimit: gasLimit || '21000',
        gasPrice: gasPrice || '20',
    }
    if (BSC_BASED_CURRENCIES.includes(account.currency)) {
        txData = await prepareBscOrBep20SignedTransaction({
            amount,
            fromPrivateKey: fromPriv,
            currency: account.currency as Currency,
            fee,
            nonce,
            to: address
        }, provider)
    } else {
        fee.gasLimit = '100000'
        const vc = await getVirtualCurrencyByName(account.currency)
        txData = await prepareCustomBep20SignedTransaction({
            amount,
            fee,
            fromPrivateKey: fromPriv,
            to: address,
            digits: vc.precision as number,
            nonce,
            contractAddress: vc.erc20Address as string
        }, provider)
    }
    // @ts-ignore
    withdrawal.fee = fromWei(new BigNumber(fee.gasLimit).multipliedBy(toWei(fee.gasPrice, 'gwei')).toString(), 'ether')
    const {id} = await offchainStoreWithdrawal(withdrawal)
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.BSC}), id}
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
