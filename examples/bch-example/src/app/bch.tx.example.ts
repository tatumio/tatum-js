import { TatumBchSDK } from '@tatumio/bch'

export async function bchTransactionsExample() {
  const bchSDK = TatumBchSDK({
    apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab',
  })

  // Before transferring BCH, get familiar with the UTXO model. For more information, refer to https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchTransferBlockchain.
  // Prepare information about unspent outputs. It is information about unspent transactions for the address that will be used as input for a new BCH transaction.
  // You can have more than one transaction ID in the input.
  // Use the wallet that you created in the wallet example (./src/app/bch.wallet.example.ts) and fund the generated address with BCH using https://faucet.fullstack.cash/.
  // Funding the address will take some time to be confirmed. You can validate the balance using https://blockexplorer.one/.
  // After the address has been funded, replace the values below with your own values.
  const txHash = '0c5b975c2d596f9f982d4ce86992e6c120c7a711307591470d9296c3a3995fb3' // the ID of the transaction (you can get it when funding the address from the faucet or using https://blockexplorer.one/)
  const address = 'bchtest:qzwj3wzvh20qjtmwhzmcfu7d85n7epecz5q4hrclrl' // the blockchain address that you have just funded with BCH
  const index = 0 // the index of the transaction that holds the input amount (you can get it using https://blockexplorer.one/)

  // This is the private key of the funded address.
  const privateKey = 'cQWrA3F3uwwnWFwzdiYQxK4MbSLAxjMCRb5pXCcJ9aAy2L4foz2g'

  // Set the recipient address and the amount to send. Because of how the Bitcoin Cash blockchain is built, you can provide multiple pairs of input/output addresses and amounts. This example uses one recipient.
  const valueToSend = 0.1
  const recipientAddress = 'bchtest:qryypwrpjknx24wfllmmhkm8k8zx39yk8yyyj90s9f'

  const fee = '0.001'
  const changeAddress = address // The changes from the transaction will be returned to the sender address.

  const options = { testnet: true }

  // Send the transaction.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchTransferBlockchain
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
