import { TatumUrlArg } from '@tatumio/api-client'
import { TatumBchSDK } from '@tatumio/bch'

export async function bchTransactionsExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab', url: 'https://api-acceptance.sandbox.tatum.io' as TatumUrlArg})

  // Prepare unspent output information first.
  // It is unspent transaction information for address, that will be used as an input for next BCH tx
  // It is possible to have more than one
  const txHash = '960b6719dadf3ab9c35f10128855c50b04ef87cd1fe2e36299db5cde4a212dca'
  const address = 'bchtest:qzk6zxdyjgma9y2uq5untflqpa6wfpn99gxh5sdrtl'
  const index = 1

  // Private key for utxo address
  const privateKey = 'cU39Ur7xeb2rhty3QxYtuUxZj2UgKCoJtMPEqvLqsY7a4CpTyCU4'

  // Set recipient values, amount and address where to send. Because of internal structure of BCH chain it is possible
  // to pass several input and output address-value pairs. We will work with one recipient
  const valueToSend = 0.1
  const recipientAddress = 'bchtest:qzk6zxdyjgma9y2uq5untflqpa6wfpn99gxh5sdrtl'

  const fee = '0.00001'
  const changeAddress = address // we expect to receive change from transaction to sender address back

  const options = { testnet: true }


  // Send Transaction
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchTransferBlockchain
  const tx = await bchSDK.transaction.sendTransaction(
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
    },
    options,
  )
  console.log('Transaction using private key was sent txID: ', tx)
}
