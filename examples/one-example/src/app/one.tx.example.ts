import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function oneTxExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateWallet
  const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddressPrivateKey
  const fromPrivateKey = await oneSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/Harmony#operation/OneGenerateAddress
  const address = oneSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = oneSDK.wallet.generateAddressFromXPub(xpub, 1)

  console.log(`Address to fund: ${address}`)
  // FUND YOUR SENDER ACCOUNT WITH ONE FROM https://faucet.pops.one/

  // send native transaction using private key
  const { txId } = await oneSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    fromPrivateKey,
  })

  console.log(`Transaction using private key with ID ${txId} was sent`)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { txId: nativeTransactionId } = await oneSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    signatureId,
  })

  console.log(`Transaction with ID ${nativeTransactionId} was sent`)
}
