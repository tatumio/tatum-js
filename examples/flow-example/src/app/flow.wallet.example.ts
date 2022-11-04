import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab', testnet: true })

export async function flowWalletExample() {
  // Generate FLOW wallet
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateWallet
  const { mnemonic, xpub } = await flowSDK.wallet.generateWallet()

  // Generate public key from xpub at index 0
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGeneratePubKey
  const pubKey = flowSDK.wallet.generateAddressFromXPub(xpub, 0)
  console.log(`Public key is ${pubKey}`)

  // Generate private key from mnemonic at index 0
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGeneratePubKeyPrivateKey
  const privateKey = await flowSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  console.log(`Private key is ${privateKey}`)

  // Generate address from xpub
  // https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateAddress
  const { address } = await flowSDK.blockchain.generateAddress(xpub, 0)
  console.log(`Address is ${address}`)
}
