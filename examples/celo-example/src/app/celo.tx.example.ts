import { TatumCeloSDK } from '@tatumio/celo'
import { SignatureId, TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const testnet = true
const SLEEP_SECONDS = 10
const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://celo.org/developers/faucet
 */
export async function celoTxExample(): Promise<void> {
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'

  // send native transaction using private key
  // https://apidoc.tatum.io/tag/Celo#operation/CeloBlockchainTransfer
  const { txId } = (await celoSDK.transaction.send.transferSignedTransaction({
    to: receiverAddress,
    amount: '0.0001',
    feeCurrency: 'CELO',
    fromPrivateKey: senderPrivateKey,
  })) as TransactionHash

  console.log(`Native Transaction using private key was sent txID =`, txId)

  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // send CUSD transaction using private key
  // https://apidoc.tatum.io/tag/Celo#operation/CeloBlockchainTransfer
  const { txId: cusdTxId } = (await celoSDK.transaction.send.celoOrCUsdSignedTransaction(
    {
      to: receiverAddress,
      amount: '0.0001',
      currency: 'CUSD',
      feeCurrency: 'CELO',
      fromPrivateKey: senderPrivateKey,
    },
    undefined,
    testnet,
  )) as TransactionHash

  console.log(`CUSD Transaction using private key was sent txID =`, cusdTxId)

  // send native transaction using signatureId
  // signatureId from Tatum KMS - https://docs.tatum.io/private-key-management/tatum-key-management-system-kms
  const { signatureId } = (await celoSDK.transaction.send.transferSignedTransaction({
    to: receiverAddress,
    amount: '0.0001',
    feeCurrency: 'CELO',
    signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
  })) as SignatureId

  console.log(`Transaction using signatureId was sent signatureId =`, signatureId)
}
