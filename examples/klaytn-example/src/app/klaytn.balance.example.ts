import { TatumKlaytnSDK } from '@tatumio/klaytn'

export async function klaytnBalanceExample() {
  const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const { xpub } = await klaytnSDK.wallet.generateWallet(undefined, { testnet: true })
  const address = klaytnSDK.wallet.generateAddressFromXPub(xpub, 0)

  console.log(`My public address is ${address}.`)

  // Fund your address here: https://baobab.wallet.klaytn.foundation/faucet

  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGetBalance
  const { balance } = await klaytnSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`My account has ${balance} KLAY.`)
}
