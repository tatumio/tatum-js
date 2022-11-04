import { TransactionHash } from '@tatumio/api-client'
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoTxExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateWallet
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddressPrivateKey
  const fromPrivateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddress
  const address = celoSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = celoSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Fund your address here: https://celo.org/developers/faucet

  // send native transaction using private key
  const { txId } = (await celoSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    fromPrivateKey,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Transaction using private key with ID ${txId} was sent`)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { txId: nativeTransactionId } = (await celoSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    signatureId,
    feeCurrency: 'CELO',
  })) as TransactionHash

  console.log(`Transaction with ID ${nativeTransactionId} was sent`)
}
