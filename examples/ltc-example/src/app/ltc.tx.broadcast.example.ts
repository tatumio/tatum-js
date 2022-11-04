import { TatumLtcSDK } from '@tatumio/ltc'
import { LtcTransactionAddress } from '@tatumio/api-client'

export async function ltcBroadcastTransactionsExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const REPLACE_ME_WITH_PRIVATE_KEY = ''

  // Prepare address information to send from first.
  // It is possible to have more than one
  const address = 'n2NPtVj6a5xW3Cjza4m9VcybZ9xkiochvc'

  // Private key for address
  const privateKey = REPLACE_ME_WITH_PRIVATE_KEY

  // Set recipient values, amount and address where to send. Because of internal structure of LTC chain it is possible
  // to pass several input and output address-value pairs. We will work with one recipient
  const valueToSend = 0.01
  const recipientAddress = 'mtfdUnzPNBEXXyXKD6EEpsqB776mqL7sA5'

  const fee = '0.0005'
  const changeAddress = address // we expect to receive change from transaction to sender address back

  const options = { testnet: true }

  // Prepare and broadcast LTC transaction to the blockchain.
  // First we prepare the signed TX data to be used for the broadcast.
  // Account balance is needed for the transfer to work, you can top up your testnet LTC balance with https://testnet-faucet.com/ltc-testnet/
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcBroadcast
  const signedTxData = await ltcSDK.transaction.prepareSignedTransaction(
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
    } as LtcTransactionAddress,
    options,
  )
  const broadcastTx = await ltcSDK.blockchain.broadcast({
    txData: signedTxData,
  })
  console.log(`Broadcast TX: ${JSON.stringify(broadcastTx)}`)
}
