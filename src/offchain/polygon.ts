import BigNumber from 'bignumber.js'
import {fromWei, toWei} from 'web3-utils'
import {validateBody} from '../connector/tatum'
import {getAccountById, getVirtualCurrencyByName} from '../ledger'
import {Currency, TransferEthOffchain} from '../model'
import {preparePolygonSignedTransaction, preparePolygonTransferErc20SignedTransaction} from '../transaction'
import {generatePrivateKeyFromMnemonic} from '../wallet'
import {offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal} from './common'
import { offchainTransferPolygonKMS } from './kms'

/**
 * Send Polygon transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendPolygonOffchainTransaction = async (testnet: boolean, body: TransferEthOffchain, provider?: string) => {
    if (body.signatureId) {
        return offchainTransferPolygonKMS(body)
    }
    await validateBody(body, TransferEthOffchain)
    const {
        mnemonic, index, privateKey, gasLimit, gasPrice, nonce, ...withdrawal
    } = body
    const {amount, address} = withdrawal

    const fromPriv = mnemonic && index !== undefined ? await generatePrivateKeyFromMnemonic(Currency.MATIC, testnet, mnemonic, index) : privateKey as string

    const account = await getAccountById(withdrawal.senderAccountId)
    let txData
    const fee = {
        gasLimit: gasLimit || '21000',
        gasPrice: gasPrice || '20',
    }
    if (account.currency === Currency.MATIC) {
        txData = await preparePolygonSignedTransaction(testnet, {
            amount,
            fromPrivateKey: fromPriv,
            currency: account.currency,
            fee,
            nonce,
            to: address
        }, provider)
    } else {
        fee.gasLimit = '100000'
        const vc = await getVirtualCurrencyByName(account.currency)
        txData = await preparePolygonTransferErc20SignedTransaction(testnet, {
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
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.MATIC}), id}
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
