import { TransactionHash } from '@tatumio/api-client'
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://faucet.sepolia.dev/
 */
export async function ethErc20ApproveExample() {
  // This address holds ERC20 token
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will RECEIVE ERC20 approval for token
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverPrivateKey = '<PUT RECEIVER PRIVATE KEY HERE>'

  // This is ERC20 token address held by senderAddress
  const contractAddress = '<PUT ERC20 ADDRESS HERE>'
  console.log(`Contract address`, contractAddress)

  // approve erc20 (fungible token) to spender (receiverAddress)
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Approve
  const erc20Approved = (await ethSDK.erc20.send.approveSignedTransaction({
    spender: receiverAddress,
    amount: '1',
    contractAddress,
    fromPrivateKey: senderPrivateKey,
  })) as TransactionHash
  console.log(`Approved Erc20 with txID ${erc20Approved.txId}`)
}
