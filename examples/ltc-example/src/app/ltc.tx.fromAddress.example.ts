import { TatumLtcSDK } from '@tatumio/ltc'

export async function ltcFromAddressTransactionsExample() {
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

  const fee = '0.01'
  const changeAddress = address // we expect to receive change from transaction to sender address back

  const options = { testnet: true }

  // Send LTC to a blockchain address
  // This example requires a funded blockchain address, you can top up your testnet balance with https://testnet-faucet.com/ltc-testnet/
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcTransferBlockchain
  const txData = await ltcSDK.transaction.sendTransaction(
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
    },
    options,
  )
  console.log(`TX: ${JSON.stringify(txData)}`)
}
