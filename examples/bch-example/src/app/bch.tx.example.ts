import { TatumBchSDK } from '@tatumio/bch'

export async function bchTransactionsExample() {
  const bchSDK = TatumBchSDK({
    apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab',
  })

  // To transfer BCH, please get familiar with UTXO model.
  // Prepare unspent output information first.
  // It is unspent transaction information for address, that will be used as an input for next BCH tx
  // It is possible to have more than one
  // As an example, after running wallet example, use this url (https://faucet.fullstack.cash/) to faucet the address generated in the example
  // The faucet transaction will take some time to be confirmed, you can validate that in https://blockexplorer.one/
  // After to be confirm, replace the bellow values
  const txHash = '0c5b975c2d596f9f982d4ce86992e6c120c7a711307591470d9296c3a3995fb3' // id of the transaction (checked when faucet or you can check in blockexplore.one)
  const address = 'bchtest:qzwj3wzvh20qjtmwhzmcfu7d85n7epecz5q4hrclrl' // address obtained when running wallet example
  const index = 0 // index of the transaction that gets the input amount (check in blockexplorer.one)

  // Private key for utxo address
  const privateKey = 'cQWrA3F3uwwnWFwzdiYQxK4MbSLAxjMCRb5pXCcJ9aAy2L4foz2g'

  // Set recipient values, amount and address where to send. Because of internal structure of BCH chain it is possible
  // to pass several input and output address-value pairs. We will work with one recipient
  const valueToSend = 0.1
  const recipientAddress = 'bchtest:qryypwrpjknx24wfllmmhkm8k8zx39yk8yyyj90s9f'

  const fee = '0.001'
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
