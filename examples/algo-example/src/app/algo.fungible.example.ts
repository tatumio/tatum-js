import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 10
const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * Fund your account with ALGO using https://bank.testnet.algorand.network so that the account has sufficient funds to make transactions. 
 */
export async function algoFungibleExample() {
  // This address will deploy a fungible token smart contract, then will mint and transfer fungible tokens to the recipient address, and will finally burn them.
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderSecret = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will receive the fungible tokens.
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverSecret = '<PUT RECEIVER PRIVATE KEY HERE>'

  // Deploy a fungible token smart contract and mint the fungible tokens.
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const fungibleDeployed = (await algoSDK.token.fungible.send.createFTSignedTransaction({
    symbol: 'FUNGIBLE_SYMBOL',
    name: 'my token',
    supply: '5',
    from: senderAddress,
    fromPrivateKey: senderSecret,
    digits: 1,
    fee: '0.001',
  })) as TransactionHash

  console.log(`Deployed algo fungible token with txID ${fungibleDeployed.txId}`)

  // If the transaction does not get confirmed within the specified waiting period, increase the waiting time.
  // In a real-life application, implement the waiting mechanism properly, without using this example.
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${fungibleDeployed.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Fetch the address of the deployed smart contract from the hash of the deployment transaction.
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const { contractAddress } = await algoSDK.token.nft.getNFTContractAddress(
    Currency.ALGO,
    fungibleDeployed.txId,
  )

  console.log(`Asset id`, contractAddress)

  // Allow the recipient address to receive the tokens.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainReceiveAsset
  const assetEnabled = (await algoSDK.token.receiveAsset(
    {
      assetId: Number(contractAddress),
      fromPrivateKey: receiverSecret,
    },
    true,
  )) as TransactionHash
  console.log(`Enabled asset id ${contractAddress} with transaction hash: ${assetEnabled.txId}`)

  // Send some amount of the fungible tokens to the recipient address.
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const fungibleTransferred = (await algoSDK.token.fungible.send.transferFTSignedTransaction({
    to: receiverAddress,
    amount: '1',
    contractAddress,
    fromPrivateKey: senderSecret,
    digits: 1,
  })) as TransactionHash

  console.log(`Fungible tokens transaction with txID ${fungibleTransferred.txId} was sent.`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${fungibleTransferred.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Send the fungible tokens from the recipient address back to the sender address so that the sender address could burn them.
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const fungibleTransferredBack = (await algoSDK.token.fungible.send.transferFTSignedTransaction({
    to: senderAddress,
    amount: '1',
    contractAddress,
    fromPrivateKey: receiverSecret,
    digits: 1,
  })) as TransactionHash

  console.log(`(send back) Fungible tokens transaction with txID ${fungibleTransferredBack.txId} was sent.`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${fungibleTransferredBack.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Burn the fungible tokens.
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Burn
  const fungibleBurned = (await algoSDK.token.fungible.send.burnFTSignedTransaction({
    contractAddress,
    fromPrivateKey: senderSecret,
  })) as TransactionHash

  console.log(`Burned fungible token/s with txID ${fungibleBurned.txId}`)
}
