import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function klaytnTxExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateWallet
  const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet(undefined, { testnet: true })
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddressPrivateKey
  const fromPrivateKey = await klaytnSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })

  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddress
  const address = klaytnSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = klaytnSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Fund your address here: https://baobab.wallet.klaytn.foundation/faucet

  // send native transaction using private key
  const { txId } = await klaytnSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    fromPrivateKey,
  })

  console.log(`Transaction using private key with ID ${txId} was sent`)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { txId: nativeTransactionId } = await klaytnSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    signatureId,
  })

  console.log(`Transaction with ID ${nativeTransactionId} was sent`)
}
