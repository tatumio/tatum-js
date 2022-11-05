import { TatumBtcSDK } from '@tatumio/btc'
import { BtcTransactionFromAddress } from '@tatumio/api-client'

export async function btcBroadcastTransactionsExample() {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const REPLACE_ME_WITH_PRIVATE_KEY = ''

  // Prepare address information to send from first.
  // It is possible to have more than one
  const address = 'tb1qldrj9c68py7eyn6a3m722vn8fpk3lueza2zxff'

  // Private key for address
  const privateKey = REPLACE_ME_WITH_PRIVATE_KEY

  // Set recipient values, amount and address where to send. Because of internal structure of BTC chain it is possible
  // to pass several input and output address-value pairs. We will work with one recipient
  const valueToSend = 0.00015
  const recipientAddress = 'tb1qzkfcm9sapgxptjd5l7w9s88v8q3994srs8vv7z'

  const fee = '0.00001'
  const changeAddress = address // we expect to receive change from transaction to sender address back

  const options = { testnet: true }

  // Prepare and broadcast BTC transaction to the blockchain.
  // First we prepare the signed TX data to be used for the broadcast.
  // Account balance is needed for the transfer to work, you can top up your testnet BTC balance with https://testnet-faucet.com/BTC-testnet/
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/BTCBroadcast
  const signedTxData = await btcSDK.transaction.prepareSignedTransaction(
    {
      fromAddress: [
        {
          address: address,
          privateKey: privateKey,
        },
      ],
      to: [
        {
          address: recipientAddress,
          value: valueToSend,
        },
      ],
      fee: fee,
      changeAddress: changeAddress,
    } as BtcTransactionFromAddress,
    options,
  )
  const broadcastTx = await btcSDK.blockchain.broadcast({
    txData: signedTxData,
  })
  console.log(`Broadcast TX: ${JSON.stringify(broadcastTx)}`)
}
