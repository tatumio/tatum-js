import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const testnet = true

export async function polygonTransactionExample(): Promise<void> {
  // Generate wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet(undefined, { testnet })
  // Generate private key
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const fromPrivateKey = await polygonSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet })
  // Generate destination address
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const to = polygonSDK.wallet.generateAddressFromXPub(xpub, 1)

  // FUND YOUR ACCOUNT WITH MATIC FROM https://faucet.matic.network/

  // send native transaction using private key
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonBlockchainTransfer
  const { txId } = await polygonSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    fromPrivateKey,
  })
  console.log(`Transaction using private key with ID ${txId} was sent`)

  // send native transaction using signatureId
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonBlockchainTransfer
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { txId: nativeTransactionId } = await polygonSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    signatureId,
  })
  console.log(`Transaction with ID ${nativeTransactionId} was sent`)
}
