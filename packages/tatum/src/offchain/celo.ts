import BigNumber from 'bignumber.js'
import {fromWei, toWei} from 'web3-utils'
import {validateBody} from '../connector/tatum'
import {CELO_BASED_CURRENCIES} from '../constants'
import {getAccountById, getVirtualCurrencyByName} from '../ledger'
import {Currency} from '../model'
import {TransferCeloOffchain} from '../model/request/TransferCeloOffchain'
import {prepareCeloOrCUsdSignedTransaction, prepareCeloTransferErc20SignedTransaction} from '../transaction'
import {generatePrivateKeyFromMnemonic} from '../wallet'
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common'
import { offchainTransferCeloKMS } from './kms'

/**
 * Send Celo transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendCeloOffchainTransaction = async (testnet: boolean, body: TransferCeloOffchain, provider?: string) => {
    if (body.signatureId) {
        return offchainTransferCeloKMS(body)
    }
    await validateBody(body, TransferCeloOffchain)
    const {
        mnemonic, index, privateKey, gasLimit, gasPrice, nonce, feeCurrency, ...withdrawal
    } = body
    const {amount, address} = withdrawal

    const fromPriv = mnemonic && index !== undefined ? await generatePrivateKeyFromMnemonic(Currency.CELO, testnet, mnemonic, index) : privateKey as string

    const account = await getAccountById(withdrawal.senderAccountId)
    let txData
    const fee = {
        gasLimit: gasLimit || '150000',
        gasPrice: gasPrice || '0.5',
    }
    if (CELO_BASED_CURRENCIES.includes(account.currency)) {
        txData = await prepareCeloOrCUsdSignedTransaction(testnet, {
            amount,
            fromPrivateKey: fromPriv,
            currency: account.currency as Currency,
            feeCurrency,
            nonce,
            to: address
        }, provider)
    } else {
        const vc = await getVirtualCurrencyByName(account.currency)
        txData = await prepareCeloTransferErc20SignedTransaction(testnet, {
            amount,
            feeCurrency,
            fromPrivateKey: fromPriv,
            to: address,
            nonce,
            contractAddress: vc.erc20Address as string
        }, provider)
    }
    // @ts-ignore
    withdrawal.fee = fromWei(new BigNumber(fee.gasLimit).multipliedBy(toWei(fee.gasPrice, 'gwei')).toString(), 'ether')
    const {id} = await offchainStoreWithdrawal(withdrawal)
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.CELO}), id}
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
