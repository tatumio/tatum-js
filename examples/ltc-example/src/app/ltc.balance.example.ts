import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function ltcBalanceExample(): Promise<void> {
  const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  // Generate a LTC wallet
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateWallet
  const { mnemonic, xpub } = await ltcSDK.wallet.generateWallet(undefined, { testnet: true })
  console.log(`Mnemonic: ${mnemonic}`)
  console.log(`Xpub: ${xpub}`)

  // Create new blockchain address
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateAddress
  const address = ltcSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log(`Address: ${address}.`)

  // Get balance of LTC
  // This example requires a funded blockchain address, you can top up your testnet balance with https://testnet-faucet.com/ltc-testnet/
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGetBalanceOfAddress
  const balance = await ltcSDK.blockchain.getBlockchainAccountBalance(address)
  console.log(`Balance of ${address} : ${JSON.stringify(balance)}`)
}
