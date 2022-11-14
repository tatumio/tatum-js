import { BchTransaction } from '@tatumio/api-client'
import { TatumBchSDK } from '@tatumio/bch'

const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bchTransactionBroadcastExample() {
  // To transfer BCH, please get familiar with UTXO model. For more information consult our documentation https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchTransferBlockchain
  // Prepare unspent output information first.
  // It is unspent transaction information for address, that will be used as an input for next BCH tx
  // It is possible to have more than one transaction Ids
  // As an example, after running wallet example, use this url (https://faucet.fullstack.cash/) to faucet the address generated in the example
  // The faucet transaction will take some time to be confirmed, you can validate that in https://blockexplorer.one/
  // After to be confirm, replace the bellow values
  const txHash = '1ad94a0c8aee8ee0f1273a551486254fb09b9cce3ed56294c8a72b15e89ee11c'
  const address = 'bchtest:qzwj3wzvh20qjtmwhzmcfu7d85n7epecz5q4hrclrl'
  const index = 0

  // Private key for utxo address
  const privateKey = 'cQWrA3F3uwwnWFwzdiYQxK4MbSLAxjMCRb5pXCcJ9aAy2L4foz2g'

  // Set recipient values, amount and address where to send. Because of internal structure of BCH chain it is possible
  // to pass several input and output address-value pairs. We will work with one recipient
  const valueToSend = 0.08
  const recipientAddress = 'bchtest:qzwj3wzvh20qjtmwhzmcfu7d85n7epecz5q4hrclrl'

  const fee = '0.001'
  const changeAddress = address // we expect to receive change from transaction to sender address back

  const options = { testnet: true }

  // Transaction - prepare tx to be sent and get compiled and signed transaction that can be broadcast
  const txData = await bchSDK.transaction.prepareSignedTransaction(
    {
      fromUTXO: [
        {
          txHash: txHash,
          index: index,
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
    } as BchTransaction,
    options,
  )

  // Broadcast prepared tx data
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchBroadcast
  const { txId } = await bchSDK.blockchain.broadcast({
    txData: txData,
  })
  console.log(`Broadcast tx with hash ${txId}`)
}
