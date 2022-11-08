import { TatumCeloSDK } from '@tatumio/celo'

export async function celoBalanceExample() {
  const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await celoSDK.wallet.generateWallet()

  const address = celoSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`My public address is `, address)

  // FUND YOUR ACCOUNT WITH CELO FROM https://celo.org/developers/faucet

  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetBalance
  const { celo, cUsd, cEur } = await celoSDK.blockchain.getBlockchainAccountBalance(address)
  if (celo) console.log(`CELO Balance:`, celo)
  if (cUsd) console.log(`CUSD Balance:`, cUsd)
  if (cEur) console.log(`CEUR Balance:`, cEur)
}
