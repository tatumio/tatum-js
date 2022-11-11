import { Currency, TransactionHash } from '@tatumio/api-client'
import { TatumXdcSDK } from '@tatumio/xdc'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 20
const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * Fund your account with XDC using https://faucet.apothem.network/ so that the account has sufficient funds to make transactions.
 */
export async function xdcErc20Example() {
  // This address will deploy a fungible token smart contract, and then will mint and transfer fungible tokens to the recipient address.
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderPrivateKey = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will receive the fungible tokens and burn them.
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverPrivateKey = '<PUT RECEIVER PRIVATE KEY HERE>'

  // Deploy a fungible token smart contract.
  const erc20Deployed = (await xdcSDK.erc20.send.deploySignedTransaction({
    symbol: 'ERC_SYMBOL',
    name: 'mytx',
    address: senderAddress,
    supply: '0',
    fromPrivateKey: senderPrivateKey,
    digits: 18,
    totalCap: '10000000',
  })) as TransactionHash

  console.log(`Deployed erc20 token with txID ${erc20Deployed.txId}`)

  // If the transaction does not get confirmed within the specified waiting period, increase the waiting time.
  // In a real-life application, implement the waiting mechanism properly, without using this example.
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${erc20Deployed.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Fetch the address of the deployed smart contract from the hash of the deployment transaction.
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const transaction = await xdcSDK.blockchain.smartContractGetAddress(Currency.XDC, erc20Deployed.txId)
  const contractAddress = transaction.contractAddress as string

  const erc20Minted = (await xdcSDK.erc20.send.mintSignedTransaction({
    to: senderAddress,
    amount: '10',
    contractAddress,
    fromPrivateKey: senderPrivateKey,
  })) as TransactionHash

  console.log(`Minted erc20 token/s with txID ${erc20Minted.txId}`)

  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${erc20Minted.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Send some amount of the fungible tokens to the recipient address.
  const erc20Transferred = (await xdcSDK.erc20.send.transferSignedTransaction({
    to: receiverAddress,
    amount: '1',
    contractAddress,
    fromPrivateKey: senderPrivateKey,
    digits: 18,
  })) as TransactionHash

  console.log(`Erc20 transaction with txID ${erc20Transferred.txId} was sent.`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${erc20Transferred.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Burn some amount of the fungible tokens.
  const erc20Burned = (await xdcSDK.erc20.send.burnSignedTransaction({
    amount: '1',
    contractAddress,
    fromPrivateKey: receiverPrivateKey,
  })) as TransactionHash

  console.log(`Burned erc20 token/s with transaction ID ${erc20Burned.txId}`)
}
