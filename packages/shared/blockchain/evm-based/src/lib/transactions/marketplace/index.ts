import { ApproveErc20 } from '@tatumio/api-client'
import {
  BroadcastFunction,
  ChainBuyAssetOnMarketplace,
  ChainCancelSellAssetOnMarketplace,
  ChainGenerateMarketplace,
  ChainSellAssetOnMarketplace,
  ChainUpdateFee,
  ChainUpdateFeeRecipient,
} from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { ListingSmartContract } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedUtils } from '../../evm-based.utils'
import { erc20 } from '../erc20'
import { ApproveNftTransfer, evmBasedAuction } from '../../services/evm-based.auction'

/** Deploy contract (generate Marketplace) */
const generateMarketplace = async (body: ChainGenerateMarketplace, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { fromPrivateKey, signatureId, nonce, marketplaceFee, feeRecipient, fee } = body

  // TODO: remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any)
    .deploy({
      arguments: [marketplaceFee, feeRecipient],
      data: ListingSmartContract.bytecode,
    })
    .encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    data,
    nonce: nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
  )
}

/* Update Marketplace fee */
const updateFee = async (body: ChainUpdateFee, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { fromPrivateKey, contractAddress, nonce, signatureId, fee, marketplaceFee } = body

  const smartContractMethodName = 'setMarketplaceFee'

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName]([
    `0x${new BigNumber(marketplaceFee).toString(16)}`,
  ]).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: undefined,
      data,
      to: contractAddress,
      nonce: nonce,
    }

    return evmBasedUtils.prepareSignedTransactionAbstraction(
      client,
      tx,
      web3,
      signatureId,
      fromPrivateKey,
      fee?.gasLimit,
      fee?.gasPrice,
    )
  }
  throw new Error('Contract address should not be empty!')
}

/** Update Marketplace fee recipient */
const updateFeeRecipient = async (body: ChainUpdateFeeRecipient, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { contractAddress, feeRecipient, signatureId, fromPrivateKey, nonce, fee } = body

  const smartContractMethodName = 'setMarketplaceFeeRecipient'

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName]([
    feeRecipient,
  ]).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: undefined,
      data,
      to: contractAddress,
      nonce: nonce,
    }

    return evmBasedUtils.prepareSignedTransactionAbstraction(
      client,
      tx,
      web3,
      signatureId,
      fromPrivateKey,
      fee?.gasLimit,
      fee?.gasPrice,
    )
  }
  throw new Error('Contract address should not be empty!')
}

/** Buy Marketplace asset */
const buyAsset = async (body: ChainBuyAssetOnMarketplace, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { listingId, erc20Address, buyer, contractAddress, nonce, signatureId, fromPrivateKey, fee } = body

  const smartContractParams = [listingId, erc20Address ?? '0x0000000000000000000000000000000000000000']

  let smartContractMethodName = 'buyAssetFromListing'
  if (buyer) {
    smartContractMethodName = 'buyAssetFromListingForExternalBuyer'
    smartContractParams.push(buyer.trim())
  }

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName](
    ...smartContractParams,
  ).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: undefined,
      data,
      to: contractAddress,
      nonce: nonce,
    }

    return evmBasedUtils.prepareSignedTransactionAbstraction(
      client,
      tx,
      web3,
      signatureId,
      fromPrivateKey,
      fee?.gasLimit,
      fee?.gasPrice,
    )
  }
  throw new Error('Contract address should not be empty!')
}

/** Sell Marketplace asset */
const sellAsset = async (body: ChainSellAssetOnMarketplace, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const {
    contractAddress,
    erc20Address,
    nftAddress,
    seller,
    listingId,
    amount,
    tokenId,
    price,
    isErc721,
    signatureId,
    fromPrivateKey,
    nonce,
    fee,
  } = body

  const smartContractMethodName = 'createListing'
  const smartContractParams = [
    listingId,
    isErc721,
    nftAddress.trim(),
    tokenId,
    price,
    seller.trim(),
    amount ?? '0',
    erc20Address ?? '0x0000000000000000000000000000000000000000',
  ]

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName](
    ...smartContractParams,
  ).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: undefined,
      data,
      to: contractAddress.trim(),
      nonce: nonce,
    }

    return evmBasedUtils.prepareSignedTransactionAbstraction(
      client,
      tx,
      web3,
      signatureId,
      fromPrivateKey,
      fee?.gasLimit,
      fee?.gasPrice,
    )
  }
  throw new Error('Contract address should not be empty!')
}

/** Cancel Marketplace asset listing */
const cancelListing = async (
  body: ChainCancelSellAssetOnMarketplace,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { listingId, contractAddress, nonce, signatureId, fromPrivateKey, fee } = body

  const smartContractMethodName = 'cancelListing'

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName](
    listingId,
  ).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: undefined,
      data,
      to: contractAddress,
      nonce: nonce,
    }

    return evmBasedUtils.prepareSignedTransactionAbstraction(
      client,
      tx,
      web3,
      signatureId,
      fromPrivateKey,
      fee?.gasLimit,
      fee?.gasPrice,
    )
  }
  throw new Error('Contract address should not be empty!')
}

export const marketplace = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      /**
       * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveErc20Spending: async (body: ApproveErc20, provider?: string) =>
        erc20(args).prepare.approveSignedTransaction(body, provider),
      /**
       * Approve NFT transfer for listing.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      approveSpending: async (body: ApproveNftTransfer, provider?: string) =>
        evmBasedAuction(args).prepare.auctionApproveNftTransferSignedTransaction(body, provider),
      /**
       * Prepare signed transaction for deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
       * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
       * Listing can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during listing creation.
       * Once the listing is created, seller must send the NFT asset to the smart contract.
       * Buyer will buy the asset from the listing using native asset - send assets along the buyAssetFromListing() smart contract call, or via ERC20 token.
       * Buyer of the listing must perform approval for the smart contract to access ERC20 token, before the actual buyAssetFromListing() method is called.
       * Once both assets - from buyer and seller - are in the smart contract, NFT is sent to the buyer, price is sent to the seller
       * and marketplace fee is set to the operator.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      generateMarketplace: async (body: ChainGenerateMarketplace, provider?: string) =>
        generateMarketplace(body, args.web3, provider),
      /**
       * Update marketplace fee.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFee: async (body: ChainUpdateFee, provider?: string) => updateFee(body, args.web3, provider),
      /**
       * Update marketplace fee recipient.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFeeRecipient: async (body: ChainUpdateFeeRecipient, provider?: string) =>
        updateFeeRecipient(body, args.web3, provider),
      /**
       * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      buyMarketplaceListing: async (body: ChainBuyAssetOnMarketplace, provider?: string) =>
        buyAsset(body, args.web3, provider),
      /**
       * Create new listing on the marketplace. Only marketplace operator can establish those on behalf of the seller of the NFT.
       * After listing is created, seller must approve the asset for spending to the marketplace smart contract.
       * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      sellMarketplaceListing: async (body: ChainSellAssetOnMarketplace, provider?: string) =>
        sellAsset(body, args.web3, provider),

      /**
       * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      cancelMarketplaceListing: async (body: ChainCancelSellAssetOnMarketplace, provider?: string) =>
        cancelListing(body, args.web3, provider),
    },
    send: {
      /**
       * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveErc20Spending: async (body: ApproveErc20, provider?: string) =>
        args.broadcastFunction({
          txData: await erc20(args).prepare.approveSignedTransaction(body, provider),
        }),
      /**
       * Approve NFT transfer for listing.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionApproveNftTransferSignedTransaction: async (body: ApproveNftTransfer, provider?: string) =>
        args.broadcastFunction({
          txData: await evmBasedAuction(args).prepare.auctionApproveNftTransferSignedTransaction(
            body,
            provider,
          ),
          signatureId: body.signatureId,
        }),
      /**
       * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
       * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
       * Listing can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during listing creation.
       * Once the listing is created, seller must send the NFT asset to the smart contract.
       * Buyer will buy the asset from the listing using native asset - send assets along the buyAssetFromListing() smart contract call, or via ERC20 token.
       * Buyer of the listing must perform approval for the smart contract to access ERC20 token, before the actual buyAssetFromListing() method is called.
       * Once both assets - from buyer and seller - are in the smart contract, NFT is sent to the buyer, price is sent to the seller
       * and marketplace fee is set to the operator.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      generateMarketplace: async (body: ChainGenerateMarketplace, provider?: string) =>
        args.broadcastFunction({
          txData: await generateMarketplace(body, args.web3, provider),
        }),
      /**
       * Update marketplace fee.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFee: async (body: ChainUpdateFee, provider?: string) =>
        args.broadcastFunction({
          txData: await updateFee(body, args.web3, provider),
        }),
      /**
       * Update marketplace fee recipient.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFeeRecipient: async (body: ChainUpdateFeeRecipient, provider?: string) =>
        args.broadcastFunction({
          txData: await updateFeeRecipient(body, args.web3, provider),
        }),
      /**
       * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      buyMarketplaceListing: async (body: ChainBuyAssetOnMarketplace, provider?: string) =>
        args.broadcastFunction({
          txData: await buyAsset(body, args.web3, provider),
        }),
      /**
       * Create new listing on the marketplace. Only marketplace operator can establish those on behalf of the seller of the NFT.
       * After listing is created, seller must approve the asset for spending to the marketplace smart contract.
       * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      sellMarketplaceListing: async (body: ChainSellAssetOnMarketplace, provider?: string) =>
        args.broadcastFunction({
          txData: await sellAsset(body, args.web3, provider),
        }),
      /**
       * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      cancelMarketplaceListing: async (body: ChainCancelSellAssetOnMarketplace, provider?: string) =>
        args.broadcastFunction({
          txData: await cancelListing(body, args.web3, provider),
        }),
    },
  }
}
