import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function ltcTransactionsExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const REPLACE_ME_WITH_PRIVATE_KEY = ''

  // Send LTC to a blockchain address
  // This example requires a funded blockchain address, you can top up your testnet balance with https://testnet-faucet.com/ltc-testnet/
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcTransferBlockchain
  const txData = await ltcSDK.blockchain.send({
    fromAddress: [
      {
        address: 'LYkdm7x4SCLePTi9AQfnvxRqKQfiwWp5pt',
        privateKey: REPLACE_ME_WITH_PRIVATE_KEY,
      },
    ],
    to: [
      {
        address: 'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
        value: 0.00015,
      },
    ],
    fee: '0.00001',
    changeAddress: 'LYkdm7x4SCLePTi9AQfnvxRqKQfiwWp5pt',
  })
  console.log(`TX: ${JSON.stringify(txData)}`)
}
