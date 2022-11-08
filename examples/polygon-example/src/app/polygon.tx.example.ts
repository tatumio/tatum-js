import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency } from '@tatumio/api-client'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://faucet.polygon.technology
 */
export async function polygonTxExample(): Promise<void> {
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'

  // send native transaction using private key
  const { txId } = await polygonSDK.transaction.send.transferSignedTransaction({
    to: senderAddress,
    amount: '0.0001',
    fromPrivateKey: senderPrivateKey,
  })

  console.log(`Transaction using private key was sent txID =`, txId)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const { signatureId } = await polygonSDK.transaction.send.transferSignedTransaction({
    currency: Currency.MATIC,
    to: receiverAddress,
    amount: '0.0001',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
  })

  console.log(`Transaction using signatureId was sent signatureId =`, signatureId)
}
