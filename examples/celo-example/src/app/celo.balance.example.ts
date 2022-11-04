import { TatumCeloSDK } from '@tatumio/celo'

export async function celoBalanceExample() {
  const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await celoSDK.wallet.generateWallet()
  const address = celoSDK.wallet.generateAddressFromXPub(xpub, 0)

  console.log(`My public address is ${address}.`)

  // Fund your address here: https://celo.org/developers/faucet

  // https://apidoc.tatum.io/tag/Celo#operation/CeloGetBalance
  const balance = await celoSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`My account has ${balance.celo} celo.`)
  console.log(`My account has ${balance.cUsd} cUsd.`)
  console.log(`My account has ${balance.cEur} cEur.`)
}
