import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 10
const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * Fund your account with ALGO using https://bank.testnet.algorand.network so that the account has sufficient funds to make transactions.
 */
export async function algoNftFractionalExample() {
  // This address will deploy an NFT smart contract, then will mint a fractional NFT and transfer it to the recipient address, and will finally burn the NFT.
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderSecret = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will receive the NFT.
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverSecret = '<PUT RECEIVER PRIVATE KEY HERE>'

  // Deploy an NFT smart contract and mint a fractional NFT.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const deployed = (await algoSDK.token.nft.send.createNFTSignedTransaction({
    name: 'my nft token',
    from: senderAddress,
    fromPrivateKey: senderSecret,
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
    attr: {
      // To be able to burn the minted NFT any time later, you must specify the address of the manager account.
      manager: senderAddress,
      total: 10, // Has to be a power of 10 (for example, 10, 100, 1.000, 10.000, ...)
      decimals: 1, // Has to be log10 of "total" (for example, set 1 for "total: 10", set 2 for "total: 100", set 3 for "total: 1000", ...)
    },
  })) as TransactionHash

  console.log(`Deployed algo Fractional NFT token with txID ${deployed.txId}`)

  // If the transaction does not get confirmed within the specified waiting period, increase the waiting time.
  // In a real-life application, implement the waiting mechanism properly, without using this example.
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${deployed.txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // Fetch the address of the deployed smart contract from the hash of the deployment transaction.
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const { contractAddress } = await algoSDK.token.nft.getNFTContractAddress(Currency.ALGO, deployed.txId)

  console.log(`Asset id`, contractAddress)

  // Allow the recipient address to receive the NFT.
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainReceiveAsset
  const assetEnabled = (await algoSDK.token.receiveAsset(
    {
      assetId: Number(contractAddress),
      fromPrivateKey: receiverSecret,
    },
    true,
  )) as TransactionHash
  console.log(`Enabled asset id ${contractAddress} with transaction hash: ${assetEnabled.txId}`)

  // Transfer the NFT from the smart contract to the recipient address.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await algoSDK.token.nft.send.transferNFTSignedTransaction({
    to: receiverAddress,
    contractAddress,
    fromPrivateKey: senderSecret,
    // Specify the number of fractions in the NFT that you want to transfer.
    amount: 2,
  })) as TransactionHash

  console.log(`NFT tokens transaction with txID ${nftTransferred.txId} was sent.`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${nftTransferred.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Send the NFT from the recipient address back to the sender address so that the sender address could burn it.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferredBackTx = (await algoSDK.token.nft.send.transferNFTSignedTransaction({
    to: senderAddress,
    contractAddress,
    fromPrivateKey: receiverSecret,
    amount: 2,
  })) as TransactionHash

  console.log(`(send back) Fractional NFT token transaction with txID ${nftTransferredBackTx.txId} was sent.`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${nftTransferredBackTx.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // Burn the NFT.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurnedTx = (await algoSDK.token.nft.send.burnNFTSignedTransaction({
    contractAddress,
    fromPrivateKey: senderSecret,
  })) as TransactionHash

  console.log(`Burned Fractional NFT token with txID ${nftBurnedTx.txId}`)
}
