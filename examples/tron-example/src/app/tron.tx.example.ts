import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronTxExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Tron#operation/GenerateTronwallet
  const { mnemonic, xpub } = await tronSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Tron#operation/TronGenerateAddressPrivateKey
  const fromPrivateKey = await tronSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/Tron#operation/TronGenerateAddress
  const address = tronSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = tronSDK.wallet.generateAddressFromXPub(xpub, 1)

  // FUND YOUR ACCOUNT WITH TRX FROM https://twitter.com/TronTest2

  // send native transaction using private key
  const { txId } = await tronSDK.transaction.send.signedTransaction({
    to,
    amount: '1',
    fromPrivateKey,
  })

  console.log(`Transaction using private key with ID ${txId} was sent`)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { txId: nativeTransactionId } = await tronSDK.transaction.send.signedTransaction({
    to,
    amount: '1',
    signatureId,
  })

  console.log(`Transaction with ID ${nativeTransactionId} was sent`)

  // Freeze Tron assets on the address. By freezing assets, you can obtain energy or bandwidth to perform transactions
  // https://apidoc.tatum.io/tag/Tron#operation/TronFreeze
  const { txId: freezeTransactionId } = await tronSDK.transaction.send.freezeTransaction({
    fromPrivateKey,
    receiver: address,
    duration: 3,
    resource: 'ENERGY',
    amount: '10000',
  })

  console.log(`Freeze assets transaction with ID ${freezeTransactionId}`)
}
