import { Currency, offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal, validateBody, TransferOffchain } from '@tatumio/tatum-core'
import {prepareAlgoSignedTransaction} from '../transaction'
import {generateAlgoWallet, generateAlgoAddressFromPrivatetKey} from '../wallet'
import {offchainTransferAlgorandKMS} from './kms'
import {TransferAlgoOffchain, AlgoTransaction} from '../model'

/**
 * Send Polygon transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendAlgorandOffchainTransaction = async (testnet: boolean, body: TransferAlgoOffchain, provider?: string) => {
    if (body.signatureId) {
        return offchainTransferAlgorandKMS(body)
    }
    await validateBody(body, TransferAlgoOffchain)
    const {mnemonic, privateKey, ...withdrawal} = body
    const {amount, address} = withdrawal
    let from: string
    let key: string
    if (mnemonic) {
        let wallet = await generateAlgoWallet(mnemonic)
        key = wallet.privateKey
        from  = wallet.address
    } else {
        key = privateKey as string
        from = await generateAlgoAddressFromPrivatetKey(key)
    }

    let algotx: AlgoTransaction = new AlgoTransaction()
    algotx.from = from
    algotx.to = address
    algotx.amount = amount
    algotx.fromPrivateKey = key
    algotx.signatureId = body.signatureId
    algotx.note = withdrawal.senderNote || ''
    algotx.fee = withdrawal.fee || '0.0001'

    const txData = await prepareAlgoSignedTransaction(testnet, algotx, provider)
    
    const {id} = await offchainStoreWithdrawal(withdrawal)
    // @ts-ignore
    try {
        return {...await offchainBroadcast({txData, withdrawalId: id, currency: Currency.ALGO}), id}
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
