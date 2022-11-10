import { TatumSolanaSDK } from '@tatumio/solana'
import { TransactionHash } from '@tatumio/api-client'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/Solana#operation/SolanaBlockchainTransfer
 */
export async function solanaTxWithPrivateKeyExample(): Promise<void> {
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'

  // Send SOL from address to address
  const { txId } = (await solanaSDK.transaction.send.send({
    from: senderAddress,
    fromPrivateKey: senderPrivateKey,
    to: receiverAddress,
    amount: '0.001',
  })) as TransactionHash
  console.log(`Transaction hash is ${txId}`)

  // You can use external fee payer, so SOL will be send from 1 address, but fees will be paid from another address
  // Send SOL from address to address

  const feePayer = senderAddress
  const feePayerPrivateKey = senderPrivateKey

  const { txId: externalFeePayerTxId } = (await solanaSDK.transaction.send.send({
    from: senderAddress,
    fromPrivateKey: senderPrivateKey,
    to: receiverAddress,
    feePayer,
    feePayerPrivateKey,
    amount: '0.001',
  })) as TransactionHash
  console.log(`Transaction hash is ${externalFeePayerTxId}`)
}
