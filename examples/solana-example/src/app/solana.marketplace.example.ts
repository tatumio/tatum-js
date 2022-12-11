import { TatumSolanaSDK } from '@tatumio/solana'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const SLEEP_SECONDS = 5
const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

/**
 * https://apidoc.tatum.io/tag/Marketplace
 */
export async function solanaMarketplaceExample() {
  // This address will INITIALIZE accounts of the marketplace owner, fee and treasury accounts
  const masterAddress = '<PUT ADDRESS HERE>'
  const masterPrivateKey = '<PUT PRIVATE KEY HERE>'

  // This address will SELL NFT on marketplace
  const nftOwnerAddress = '<PUT NFT OWNER ADDRESS HERE>'
  const nftOwnerPrivateKey = '<PUT NFT OWNER PRIVATE KEY HERE>'
  const nftAddress = '<PUT NFT ADDRESS HERE>'

  // This address will BUY NFT on marketplace
  const buyerAddress = '<PUT BUYER ADDRESS HERE>'
  const buyerPrivateKey = '<PUT BUYER PRIVATE KEY HERE>'

  // The address of the currency that will be used in the marketplace. Can be any SPL token.
  const treasuryMintAddress = 'So11111111111111111111111111111111111111112' // Native SOL Token

  // Selling price of NFT
  const price = '0.015'

  // Initializing the address of the marketplace owner. You can deploy only one marketplace per combination of owner's address + treasuryMintAddress
  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGenerateWallet
  const { address: marketplaceOwnerAddress, privateKey: marketplaceOwnerPrivateKey } =
    solanaSDK.wallet.wallet()

  console.log(`Owner Address: ${marketplaceOwnerAddress}`)
  console.log(`Owner Private Key: ${marketplaceOwnerPrivateKey}`)

  await initAccountAndWait(masterAddress, masterPrivateKey, marketplaceOwnerAddress)

  // Deploying NFT marketplace
  // https://apidoc.tatum.io/tag/Marketplace#operation/GenerateMarketplace
  const {
    txId: deployTxId,
    contractAddress,
    feeAccount,
    treasuryAccount,
  } = (await solanaSDK.marketplace.send.deploySignedTransaction({
    from: marketplaceOwnerAddress,
    fromPrivateKey: marketplaceOwnerPrivateKey,
    treasuryMint: treasuryMintAddress,
    marketplaceFee: 1000,
  })) as TransactionHash & { contractAddress: string; feeAccount: string; treasuryAccount: string }
  console.log(`Deployed marketplace with address ${contractAddress} in tx: ${deployTxId}`)

  // If during this time the transaction is not confirmed, then the waiting time should be increased.
  // In a real application, the wait mechanism must be implemented properly without using this
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${deployTxId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // https://apidoc.tatum.io/tag/Marketplace#operation/GetMarketplaceInfo
  const marketplaceInfo = await solanaSDK.marketplace.getMarketplaceInfo(Currency.SOL, contractAddress)
  console.log(`Marketplace Info: `, marketplaceInfo)

  // Initializing treasury and fee accounts...
  await initAccountAndWait(masterAddress, masterPrivateKey, treasuryAccount)
  await initAccountAndWait(masterAddress, masterPrivateKey, feeAccount)

  // https://apidoc.tatum.io/tag/Marketplace#operation/SellAssetOnMarketplace
  const { txId: sellTxId, listingId } = (await solanaSDK.marketplace.send.sellSignedTransaction({
    contractAddress,
    from: nftOwnerAddress,
    fromPrivateKey: nftOwnerPrivateKey,
    nftAddress,
    price,
    authorityPrivateKey: marketplaceOwnerPrivateKey, // Required if requiresSignOff is set to "true" for the marketplace
  })) as TransactionHash & { listingId: string }
  console.log(`NFT listed on marketplace in tx: ${sellTxId}`)

  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${sellTxId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // https://apidoc.tatum.io/tag/Marketplace#operation/GetMarketplaceListings
  const availableListings = await solanaSDK.marketplace.getMarketplaceListings(
    Currency.SOL,
    contractAddress,
    'INITIATED',
  )
  console.log(`Listings available for purchase: `, availableListings)

  // https://apidoc.tatum.io/tag/Marketplace#operation/GetMarketplaceListing
  const listingInfoBefore = await solanaSDK.marketplace.getMarketplaceListing(
    Currency.SOL,
    contractAddress,
    listingId,
  )
  console.log(`Listing ${listingId} details before purchasing: `, listingInfoBefore)

  // https://apidoc.tatum.io/tag/Marketplace#operation/BuyAssetOnMarketplace
  const { txId: buyTxId } = (await solanaSDK.marketplace.send.buySignedTransaction({
    contractAddress,
    from: buyerAddress,
    fromPrivateKey: buyerPrivateKey,
    listingId,
    authorityPrivateKey: marketplaceOwnerPrivateKey, // Required if requiresSignOff is set to "true" for the marketplace
  })) as TransactionHash
  console.log(`NFT purchased on marketplace in tx: ${buyTxId}`)

  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${sellTxId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  // https://apidoc.tatum.io/tag/Marketplace#operation/GetMarketplaceListing
  const listingInfoAfter = await solanaSDK.marketplace.getMarketplaceListing(
    Currency.SOL,
    contractAddress,
    listingId,
  )
  console.log(`Listing ${listingId} details after purchasing: `, listingInfoAfter)

  // Get the current balance on the treasury account.
  // NOTE: This func works only with NATIVE currency. For SPL use: getSplAccountBalances
  // https://apidoc.tatum.io/tag/Solana#operation/SolanaGetBalance
  const { balance: nativeBalance } = await solanaSDK.blockchain.getAccountBalance(treasuryAccount)

  // https://apidoc.tatum.io/tag/Marketplace#operation/WithdrawTreasuryFromMarketplace
  const { txId: withdrawTxId } = (await solanaSDK.marketplace.send.withdrawFromTreasurySignedTransaction({
    contractAddress,
    from: marketplaceOwnerAddress,
    fromPrivateKey: marketplaceOwnerPrivateKey,
    amount: nativeBalance,
  })) as TransactionHash
  console.log(
    `Transferred funds [${nativeBalance}] from marketplace treasury account to treasury withdrawal destination account in tx: ${withdrawTxId}`,
  )
}

async function initAccountAndWait(from: string, fromPrivateKey: string, to: string) {
  const amount = '0.01'

  // https://apidoc.tatum.io/tag/Solana#operation/SolanaBlockchainTransfer
  const { txId } = (await solanaSDK.transaction.send.transferSignedTransaction({
    from,
    fromPrivateKey,
    to,
    amount,
  })) as TransactionHash

  console.log(`Sending funds ${from} -> ${to} with amount ${amount}`)
  console.log(`Waiting ${SLEEP_SECONDS} seconds for the transaction [${txId}] to appear in a block`)
  await sleepSeconds(SLEEP_SECONDS)

  return txId
}
