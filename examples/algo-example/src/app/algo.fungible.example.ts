import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 10
const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://bank.testnet.algorand.network
 */
export async function algoFungibleExample() {
  // This address wil DEPLOY(and mint), TRANSFER fungible to Receiver Address and BURN it
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderSecret = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will RECEIVE fungible token
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverSecret = '<PUT RECEIVER PRIVATE KEY HERE>'

  // deploy(mint) fungible token transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const fungibleDeployed = (await algoSDK.token.fungible.send.createFTSignedTransaction({
    symbol: 'FUNGIBLE_SYMBOL',
    name: 'my token',
    supply: '5',
    from: senderAddress,
    fromPrivateKey: senderSecret,
    digits: 1,
  })) as TransactionHash

  console.log(`Deployed algo fungible token with txID ${fungibleDeployed.txId}`)

  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${fungibleDeployed.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const { contractAddress } = await algoSDK.token.nft.getNFTContractAddress(
    Currency.ALGO,
    fungibleDeployed.txId,
  )

  console.log(`Asset id`, contractAddress)

  // Enable receiving asset on receiver account
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainReceiveAsset
  const assetEnabled = (await algoSDK.token.receiveAsset(
    {
      assetId: Number(contractAddress),
      fromPrivateKey: receiverSecret,
    },
    true,
  )) as TransactionHash
  console.log(`Enabled asset id ${contractAddress} with transaction hash: ${assetEnabled.txId}`)

  // send fungible token transaction
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

  // send back fungible tokens transaction (to later burn it)
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

  // burn fungible tokens transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Burn
  const fungibleBurned = (await algoSDK.token.fungible.send.burnFTSignedTransaction({
    contractAddress,
    fromPrivateKey: senderSecret,
  })) as TransactionHash

  console.log(`Burned fungible token/s with txID ${fungibleBurned.txId}`)
}
