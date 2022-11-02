import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const testnet = true

export async function algoBalanceExample() {
  // Generate wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet(undefined, { testnet })
  console.log(`Mnemonic for wallet is ${mnemonic} and extended public key is ${xpub}.`)

  // Generate account address from Extended public key
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddress
  const address = polygonSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public address is ${address}.`)

  // Generate private key
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const privateKey = polygonSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet })
  console.log(`Private key is ${privateKey}.`)

  // FUND YOUR ACCOUNT WITH MATIC FROM https://faucet.matic.network/

  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGetBalance
  const { balance } = await polygonSDK.blockchain.getBlockchainAccountBalance(address)

  console.log(`Account ${address} has ${balance} MATIC.`)
}
