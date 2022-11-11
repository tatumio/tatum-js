import { TatumXdcSDK } from '@tatumio/xdc'
import { Currency } from '@tatumio/api-client'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * Fund your account with XDC using https://faucet.apothem.network/ so that the account has sufficient funds to make transactions.
 */
export async function xdcTxExample(): Promise<void> {
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'

  // Send some amount of XDC from your account to the recipient account. Sign the transaction with your private key.
  const { txId } = await xdcSDK.transaction.send.transferSignedTransaction({
    to: senderAddress,
    amount: '0.0001',
    fromPrivateKey: senderPrivateKey,
  })

  console.log(`Transaction using private key was sent txID =`, txId)

  // Send some amount of XDC from your account to the recipient account. Sign the transaction with your signature ID. For more details, check out this article about Key Management System (KMS) https://docs.tatum.io/private-key-management/tatum-key-management-system-kms.
  const { signatureId } = await xdcSDK.transaction.send.transferSignedTransaction({
    currency: Currency.XDC,
    to: receiverAddress,
    amount: '0.0001',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
  })

  console.log(`Transaction using signatureId was sent signatureId =`, signatureId)
}
