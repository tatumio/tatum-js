import { TatumKlaytnSDK } from '@tatumio/klaytn'
import { Currency } from '@tatumio/api-client'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://baobab.wallet.klaytn.foundation/faucet
 */
export async function klaytnTxExample(): Promise<void> {
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'

  // send native transaction using private key
  const { txId } = await klaytnSDK.transaction.send.transferSignedTransaction({
    to: senderAddress,
    amount: '0.0001',
    fromPrivateKey: senderPrivateKey,
  })

  console.log(`Transaction using private key was sent txID =`, txId)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const { signatureId } = await klaytnSDK.transaction.send.transferSignedTransaction({
    currency: Currency.KLAY,
    to: receiverAddress,
    amount: '0.0001',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
  })

  console.log(`Transaction using signatureId was sent signatureId =`, signatureId)
}
