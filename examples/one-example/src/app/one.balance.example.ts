import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function oneBalanceExample() {
  const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  const { xpub } = await oneSDK.wallet.generateWallet()
  const address = oneSDK.wallet.generateAddressFromXPub(xpub, 0)

  console.log(`My public address is ${address}.`)

  // FUND YOUR ACCOUNT WITH ONE FROM https://faucet.pops.one/

  // https://apidoc.tatum.io/tag/Harmony#operation/OneGetBalance
  const { balance } = await oneSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`My account has ${balance} ONE.`)
}
