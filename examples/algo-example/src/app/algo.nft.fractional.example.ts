import { TatumAlgoSDK } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 10
const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * In order for these examples to work you need to fund your address and use the address & private key combination that has coins
 * Fund your address here: https://bank.testnet.algorand.network
 */
export async function algoNftFractionalExample() {
  // This address wil DEPLOY(and mint), TRANSFER fungible to Receiver Address and BURN it
  const senderAddress = '<PUT SENDER ADDRESS HERE>'
  const senderSecret = '<PUT SENDER PRIVATE KEY HERE>'

  // This address will RECEIVE fungible token
  const receiverAddress = '<PUT RECEIVER ADDRESS HERE>'
  const receiverSecret = '<PUT RECEIVER PRIVATE KEY HERE>'

  // deploy(mint) NFT token transaction
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftMintErc721
  const deployed = (await algoSDK.token.nft.send.createNFTSignedTransaction({
    name: 'my nft token',
    from: senderAddress,
    fromPrivateKey: senderSecret,
    url: 'ipfs://bafybeidi7xixphrxar6humruz4mn6ul7nzmres7j4triakpfabiezll4ti/metadata.json',
    attr: {
      // Important to be able to burn
      manager: senderAddress,
      total: 10, // Has to be power of 10 (10,100, 1000, 10000...)
      decimals: 1, // Has to be log10 of total (for 10 -> 1, for 100 -> 2, for 1000 -> 3 ...)
    },
  })) as TransactionHash

  console.log(`Deployed algo Fractional NFT token with txID ${deployed.txId}`)

  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${deployed.txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress
  const { contractAddress } = await algoSDK.token.nft.getNFTContractAddress(Currency.ALGO, deployed.txId)

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

  // Transfer an NFT from the smart contract (the contractAddress parameter in the request body) to the specified blockchain address (the to parameter in the request body).
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftTransferErc721
  const nftTransferred = (await algoSDK.token.nft.send.transferNFTSignedTransaction({
    to: receiverAddress,
    contractAddress,
    fromPrivateKey: senderSecret,
    // In fractional NFY you can specify amount (of fractions to transfer)
    amount: 2,
  })) as TransactionHash

  console.log(`NFT tokens transaction with txID ${nftTransferred.txId} was sent.`)
  console.log(
    `Waiting ${SLEEP_SECONDS} seconds for the transaction [${nftTransferred.txId}] to appear in a block`,
  )
  await sleepSeconds(SLEEP_SECONDS)

  // send back NFT token transaction (to later burn it)
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

  // Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.
  // https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftBurnErc721
  const nftBurnedTx = (await algoSDK.token.nft.send.burnNFTSignedTransaction({
    contractAddress,
    fromPrivateKey: senderSecret,
  })) as TransactionHash

  console.log(`Burned Fractional NFT token with txID ${nftBurnedTx.txId}`)
}
