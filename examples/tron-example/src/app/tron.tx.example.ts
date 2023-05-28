import { TatumTronSDK } from '@tatumio/tron'
import { SignatureId, TransactionHash } from '@tatumio/api-client'

const tronSdk = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function tronTxExample(): Promise<void> {
  // In order for these examples to work you need to fund your address and use the address & private key combination that has coins
  // You can fund your address here: https://twitter.com/TronTest2
  const address = '<PUT YOUR ADDRESS HERE>'
  const fromPrivateKey = '<PUT YOUR PRIVATE KEY HERE>'

  // https://apidoc.tatum.io/tag/Tron#operation/GenerateTronwallet
  const { xpub } = await tronSdk.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Tron#operation/TronGenerateAddress
  const to = tronSdk.wallet.generateAddressFromXPub(xpub, 0)

  // send native transaction using private key
  const { txId } = (await tronSdk.transaction.send.signedTransaction({
    to,
    amount: '1',
    fromPrivateKey,
  })) as TransactionHash

  console.log(`Transaction using private key with ID ${txId} was sent`)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { signatureId: txSignatureId } = (await tronSdk.transaction.send.signedTransaction({
    to,
    amount: '1',
    from: address,
    signatureId,
  })) as SignatureId

  console.log(`Transaction with ID ${txSignatureId} was sent`)

  // Freeze Tron assets on the address. By freezing assets, you can obtain energy or bandwidth to perform transactions
  // https://apidoc.tatum.io/tag/Tron#operation/TronFreeze
  const { txId: freezeTransactionId } = (await tronSdk.transaction.send.freezeTransaction({
    fromPrivateKey,
    resource: 'ENERGY',
    amount: '5',
  })) as TransactionHash

  console.log(`Freeze assets transaction with ID ${freezeTransactionId}`)
}
