import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcTxWithSignatureIdExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateWallet
  const { mnemonic, xpub } = await xdcSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateAddressPrivateKey
  const fromPrivateKey = await xdcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateAddress
  const address = xdcSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = xdcSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Fund your address here: https://faucet.apothem.network/

  // send native transaction using private key
  const { txId } = await xdcSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    fromPrivateKey,
  })

  console.log(`Transaction using private key with ID ${txId} was sent`)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { txId: nativeTransactionId } = await xdcSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    signatureId,
  })

  console.log(`Transaction with ID ${nativeTransactionId} was sent`)
}
