import { BchTransaction } from '@tatumio/api-client'
import { TatumBchSDK } from '@tatumio/bch'

const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bchTransactionBroadcastExample() {
  // Before transferring BCH, get familiar with the UTXO model. For more information, refer to https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchTransferBlockchain.
  // Prepare information about unspent outputs. It is information about unspent transactions for the address that will be used as input for a new BCH transaction.
  // You can have more than one transaction ID for the input.
  // Use the wallet that you created in the wallet example (./src/app/bch.wallet.example.ts) and fund the generated address with BCH using https://faucet.fullstack.cash/.
  // Funding the address will take some time to be confirmed. You can validate the balance using https://blockexplorer.one/.
  // After the address has been funded, replace the values below with your own values.
  const txHash = '1ad94a0c8aee8ee0f1273a551486254fb09b9cce3ed56294c8a72b15e89ee11c'
  const address = 'bchtest:qzwj3wzvh20qjtmwhzmcfu7d85n7epecz5q4hrclrl'
  const index = 0

  // This is the private key of the funded address.
  const privateKey = 'cQWrA3F3uwwnWFwzdiYQxK4MbSLAxjMCRb5pXCcJ9aAy2L4foz2g'

  // Set the recipient address and the amount to send. Because of how the Bitcoin Cash blockchain is built, you can provide multiple pairs of input/output addresses and amounts. This example uses one recipient.
  const valueToSend = 0.08
  const recipientAddress = 'bchtest:qzwj3wzvh20qjtmwhzmcfu7d85n7epecz5q4hrclrl'

  const fee = '0.001'
  const changeAddress = address // The changes from the transaction will be returned to the sender address.

  const options = { testnet: true }

  // Prepare a transaction to be sent and get compiled and a signed transaction that can be broadcasted.
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

  // Broadcast the prepared transaction.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchBroadcast
  const { txId } = await bchSDK.blockchain.broadcast({
    txData: txData,
  })
  console.log(`Broadcast tx with hash ${txId}`)
}
