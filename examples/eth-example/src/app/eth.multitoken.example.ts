import { Currency, TransactionHash } from '@tatumio/api-client'
import { TatumEthSDK } from '@tatumio/eth'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 20
const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://faucet.sepolia.dev/
 */
export async function ethMultiTokenExample(): Promise<void> {
  // This address wil DEPLOY, MINT and TRANSFER multi token to Receiver Address
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will RECEIVE multi token and BURN it
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverPrivateKey = '<PUT RECEIVER PRIVATE KEY HERE>'

  const tokenId = '123'
  // upload your file to the ipfs:
  // https://docs.tatum.io/guides/blockchain/how-to-store-metadata-to-ipfs-and-include-it-in-an-nft

  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/DeployMultiToken
  const multiTokenDeployed = (await ethSDK.multiToken.send.deployMultiTokenTransaction({
    // your private key of the address that has coins
    fromPrivateKey: senderPrivateKey,
    // uploaded metadata from ipfs
    uri: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
  })) as TransactionHash

  console.log(`Deployed multi token with txID ${multiTokenDeployed.txId}`)

  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${multiTokenDeployed.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await ethSDK.blockchain.smartContractGetAddress(
    Currency.ETH,
    // replace with your deployed transaction hash
    multiTokenDeployed.txId,
  )
  const contractAddress = transaction.contractAddress as string
  console.log(`Deployed NFT smart contract with contract address: ${contractAddress}`)

  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/MintMultiToken
  const multiTokenMinted = (await ethSDK.multiToken.send.mintMultiTokenTransaction({
    to: senderAddress,
    tokenId,
    amount: '1000',
    fromPrivateKey: senderPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Multi Token mint transaction sent with txID: ${multiTokenMinted.txId}`)

  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${multiTokenMinted.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/TransferMultiToken
  const multiTokenTransferred = (await ethSDK.multiToken.send.transferMultiTokenTransaction({
    to: receiverAddress,
    tokenId,
    amount: '10',
    fromPrivateKey: senderPrivateKey,
    contractAddress,
  })) as TransactionHash

  console.log(`Sent Multi Token with txID: ${multiTokenTransferred.txId}`)

  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${multiTokenTransferred.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // https://apidoc.tatum.io/tag/Multi-Tokens-(ERC-1155-or-compatible)#operation/BurnMultiToken
  const multiTokenBurned = (await ethSDK.multiToken.send.burnMultiTokenTransaction({
    tokenId,
    amount: '1',
    fromPrivateKey: receiverPrivateKey,
    contractAddress,
    account: receiverAddress,
  })) as TransactionHash

  console.log(`Burned Multi Token/s with txID: ${multiTokenBurned.txId}`)
}
