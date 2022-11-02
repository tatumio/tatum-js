import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function bscBalanceExample() {
  const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const { xpub } = await bscSDK.wallet.generateWallet()
  const address = bscSDK.wallet.generateAddressFromXPub(xpub, 0)

  console.log(`My public address is ${address}.`)

  // Fund your address here: https://testnet.binance.org/faucet-smart

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGetBalance
  const { balance } = await bscSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`My account has ${balance} BNB.`)
}
