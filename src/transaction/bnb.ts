import {BncClient} from '@binance-chain/javascript-sdk'
import {getAddressFromPrivateKey} from '@binance-chain/javascript-sdk/lib/crypto'
import {bnbGetAccount} from '../blockchain'
import {Currency, TransactionKMS} from '../model'

/**
 * Sign Bnb pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Bnb Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signBnbKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
    if (tx.chain !== Currency.BNB) {
        throw Error('Unsupported chain.')
    }
    const bnbClient = new BncClient(provider ? provider : (testnet ? 'https://testnet-dex-atlantic.binance.org' : 'https://dex-european.binance.org'))
    bnbClient.chooseNetwork(testnet ? 'testnet' : 'mainnet')
    await bnbClient.setPrivateKey(fromPrivateKey, true)
    await bnbClient.initChain()
    const fromAddress = getAddressFromPrivateKey(fromPrivateKey, testnet ? 'tbnb' : 'bnb')
    const account = await bnbGetAccount(fromAddress)
    bnbClient.setAccountNumber(account.account_number)
    const {msg, signMsg, memo} = JSON.parse(tx.serializedTransaction)
    msg.inputs = msg.inputs.map((i: any) => {
        i.address = Buffer.from(i.address.data)
        return i
    })
    msg.outputs = msg.outputs.map((i: any) => {
        i.address = Buffer.from(i.address.data)
        return i
    })
    const signedTx = await bnbClient._prepareTransaction(
        msg,
        signMsg,
        fromAddress,
        account.sequence,
        memo,
    )
    return signedTx.serialize()
}
