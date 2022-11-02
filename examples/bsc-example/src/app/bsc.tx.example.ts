import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscTxExample(): Promise<void> {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateWallet
  const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddressPrivateKey
  const fromPrivateKey = await bscSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddress
  const address = bscSDK.wallet.generateAddressFromXPub(xpub, 0)
  const to = bscSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Fund your address here: https://testnet.binance.org/faucet-smart

  // send native transaction using private key
  const { txId } = await bscSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    fromPrivateKey,
  })

  console.log(`Transaction using private key with ID ${txId} was sent`)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const signatureId = 'cac88687-33ed-4ca1-b1fc-b02986a90975'
  const { txId: nativeTransactionId } = await bscSDK.transaction.send.transferSignedTransaction({
    to,
    amount: '1',
    signatureId,
  })

  console.log(`Transaction with ID ${nativeTransactionId} was sent`)
}
