import { TatumSolanaSDK } from '@tatumio/solana'
import { TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 5
const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Mint
 */
export async function solanaSplTokenExample() {
  // This address wil CREATE and TRANSFER SPL to Receiver Address
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will RECEIVE SPL token
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverPrivateKey = '<PUT RECEIVER PRIVATE KEY HERE>'

  // Lets create new SPL token
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const { txId, contractAddress } = (await solanaSDK.transaction.send.createSplToken({
    digits: 6,
    supply: '1000000',
    address: senderAddress,
    from: senderAddress,
    fromPrivateKey: senderPrivateKey,
  })) as { txId: string; contractAddress: string }
  console.log(`Created SPL token: ${contractAddress} in tx: ${txId}`)

  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const { txId: transferTx } = (await solanaSDK.transaction.send.transferSplToken({
    digits: 6,
    to: receiverAddress,
    from: senderAddress,
    amount: '100',
    fromPrivateKey: senderPrivateKey,
    contractAddress,
  })) as TransactionHash
  console.log(`Transferred SPL tokens: ${contractAddress} in tx: ${transferTx}`)
}
