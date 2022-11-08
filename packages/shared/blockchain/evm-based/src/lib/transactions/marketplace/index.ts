import {
  ApproveErc20,
  ApproveErc20KMS,
  AuctionService,
  FungibleTokensErc20OrCompatibleService,
  MarketplaceService,
} from '@tatumio/api-client'
import {
  BroadcastFunction,
  ChainApproveErc20,
  ChainBuyAssetOnMarketplace,
  ChainCancelSellAssetOnMarketplace,
  ChainGenerateMarketplace,
  ChainSellAssetOnMarketplace,
  ChainUpdateFee,
  ChainUpdateFeeRecipient,
} from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { ListingSmartContract } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { AddressTransformer, AddressTransformerDefault, evmBasedUtils } from '../../evm-based.utils'
import { erc20 } from '../erc20'
import { ApproveNftTransfer, evmBasedAuction } from '../../services/evm-based.auction'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

/** Deploy contract (generate Marketplace) */
const generateMarketplace = async ({
  body,
  web3,
  provider,
  addressTransformer = (address: string) => address,
}: {
  body: ChainGenerateMarketplace
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
}) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { fromPrivateKey, signatureId, nonce, marketplaceFee, fee } = body
  const feeRecipient = addressTransformer(body.feeRecipient?.trim())

  // TODO: remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any)
    .deploy({
      arguments: [marketplaceFee, feeRecipient],
      data: ListingSmartContract.bytecode,
    })
    .encodeABI()

  const tx: TransactionConfig = {
    from: 0,
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
    provider,
  )
}

/* Update Marketplace fee */
const updateFee = async ({
  body,
  web3,
  provider,
  addressTransformer = (address: string) => address,
}: {
  body: ChainUpdateFee
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
}) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { fromPrivateKey, nonce, signatureId, fee, marketplaceFee } = body
  const contractAddress = addressTransformer(body.contractAddress?.trim())

  const smartContractMethodName = 'setMarketplaceFee'

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName]([
    `0x${new BigNumber(marketplaceFee).toString(16)}`,
  ]).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
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
      provider,
    )
  }
  throw new Error('Contract address should not be empty!')
}

/** Update Marketplace fee recipient */
const updateFeeRecipient = async ({
  body,
  web3,
  provider,
  addressTransformer = (address: string) => address,
}: {
  body: ChainUpdateFeeRecipient
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
}) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { signatureId, fromPrivateKey, nonce, fee } = body

  const contractAddress = addressTransformer(body.contractAddress?.trim())
  const feeRecipient = addressTransformer(body.feeRecipient?.trim())

  const smartContractMethodName = 'setMarketplaceFeeRecipient'

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName]([
    feeRecipient,
  ]).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
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
      provider,
    )
  }
  throw new Error('Contract address should not be empty!')
}

/** Buy Marketplace asset */
const buyAsset = async ({
  body,
  web3,
  provider,
  addressTransformer = AddressTransformerDefault,
}: {
  body: ChainBuyAssetOnMarketplace
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
}) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { listingId, nonce, signatureId, fromPrivateKey, fee } = body
  const buyer = addressTransformer(body.buyer?.trim())
  const contractAddress = addressTransformer(body.contractAddress?.trim())
  const erc20Address = addressTransformer(
    body.erc20Address ? body.erc20Address?.trim() : '0x0000000000000000000000000000000000000000',
  )

  const smartContractParams = [listingId, erc20Address]

  let smartContractMethodName = 'buyAssetFromListing'
  if (buyer) {
    smartContractMethodName = 'buyAssetFromListingForExternalBuyer'
    smartContractParams.push(buyer)
  }

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName](
    ...smartContractParams,
  ).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
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
      provider,
    )
  }
  throw new Error('Contract address should not be empty!')
}

/** Sell Marketplace asset */
const sellAsset = async ({
  body,
  web3,
  provider,
  addressTransformer = (address: string) => address,
}: {
  body: ChainSellAssetOnMarketplace
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
}) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const seller = addressTransformer(body.seller?.trim())
  const nftAddress = addressTransformer(body.nftAddress?.trim())
  const contractAddress = addressTransformer(body.contractAddress?.trim())
  const erc20Address = addressTransformer(
    body.erc20Address ? body.erc20Address?.trim() : '0x0000000000000000000000000000000000000000',
  )

  const { listingId, amount, tokenId, price, isErc721, signatureId, fromPrivateKey, nonce, fee } = body

  const smartContractMethodName = 'createListing'
  const smartContractParams = [
    listingId,
    isErc721,
    nftAddress,
    tokenId,
    price,
    seller,
    amount ?? '0',
    erc20Address,
  ]

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName](
    ...smartContractParams,
  ).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
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
      provider,
    )
  }
  throw new Error('Contract address should not be empty!')
}

/** Cancel Marketplace asset listing */
const cancelListing = async ({
  body,
  web3,
  provider,
  addressTransformer = (address: string) => address,
}: {
  body: ChainCancelSellAssetOnMarketplace
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
}) => {
  const client = web3.getClient(provider, body.fromPrivateKey)
  const { listingId, nonce, signatureId, fromPrivateKey, fee } = body
  const contractAddress = addressTransformer(body.contractAddress?.trim())

  const smartContractMethodName = 'cancelListing'

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName](
    listingId,
  ).encodeABI()

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
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
      provider,
    )
  }
  throw new Error('Contract address should not be empty!')
}

export const marketplace = ({
  web3,
  broadcastFunction,
  blockchain,
  addressTransformer = (address: string) => address,
}: {
  web3: EvmBasedWeb3
  blockchain: EvmBasedBlockchain
  broadcastFunction: BroadcastFunction
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
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
        erc20({
          web3,
          broadcastFunction,
          addressTransformer,
        }).prepare.approveSignedTransaction(body, provider),
      /**
       * Approve NFT transfer for listing.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      approveSpending: async (body: ApproveNftTransfer, provider?: string) =>
        evmBasedAuction({
          web3,
          broadcastFunction,
          blockchain,
        }).prepare.auctionApproveNftTransferSignedTransaction(body, provider),
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
        generateMarketplace({ body, web3, provider, addressTransformer }),
      /**
       * Update marketplace fee.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFee: async (body: ChainUpdateFee, provider?: string) =>
        updateFee({ body, web3, provider, addressTransformer }),
      /**
       * Update marketplace fee recipient.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFeeRecipient: async (body: ChainUpdateFeeRecipient, provider?: string) =>
        updateFeeRecipient({ body, web3, provider, addressTransformer }),
      /**
       * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      buyMarketplaceListing: async (body: ChainBuyAssetOnMarketplace, provider?: string) =>
        buyAsset({ body, web3, provider, addressTransformer }),
      /**
       * Create new listing on the marketplace. Only marketplace operator can establish those on behalf of the seller of the NFT.
       * After listing is created, seller must approve the asset for spending to the marketplace smart contract.
       * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      sellMarketplaceListing: async (body: ChainSellAssetOnMarketplace, provider?: string) =>
        sellAsset({ body, web3, provider, addressTransformer }),

      /**
       * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      cancelMarketplaceListing: async (body: ChainCancelSellAssetOnMarketplace, provider?: string) =>
        cancelListing({ body, web3, provider, addressTransformer }),
    },
    send: {
      /**
       * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveErc20Spending: async (body: ChainApproveErc20, provider?: string) => {
        if (body.signatureId) {
          return FungibleTokensErc20OrCompatibleService.erc20Approve(body as ApproveErc20KMS)
        } else {
          return broadcastFunction({
            txData: await erc20({
              web3,
              broadcastFunction,
              addressTransformer,
            }).prepare.approveSignedTransaction(body, provider),
          })
        }
      },
      /**
       * Approve NFT transfer for listing.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionApproveNftTransferSignedTransaction: async (body: ApproveNftTransfer, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return AuctionService.approveNftAuctionSpending(body as any)
        } else {
          return broadcastFunction({
            txData: await evmBasedAuction({
              web3,
              broadcastFunction,
              blockchain,
            }).prepare.auctionApproveNftTransferSignedTransaction(body, provider),
          })
        }
      },
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
      generateMarketplace: async (body: ChainGenerateMarketplace, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return MarketplaceService.generateMarketplace(body as any)
        } else {
          return broadcastFunction({
            txData: await generateMarketplace({ body, web3, provider, addressTransformer }),
          })
        }
      },
      /**
       * Update marketplace fee.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFee: async (body: ChainUpdateFee, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return MarketplaceService.updateFee(body as any)
        } else {
          return broadcastFunction({
            txData: await updateFee({ body, web3, provider, addressTransformer }),
          })
        }
      },
      /**
       * Update marketplace fee recipient.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFeeRecipient: async (body: ChainUpdateFeeRecipient, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return MarketplaceService.updateFeeRecipient(body as any)
        } else {
          return broadcastFunction({
            txData: await updateFeeRecipient({ body, web3, provider, addressTransformer }),
          })
        }
      },
      /**
       * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      buyMarketplaceListing: async (body: ChainBuyAssetOnMarketplace, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return MarketplaceService.buyAssetOnMarketplace(body as any)
        } else {
          return broadcastFunction({
            txData: await buyAsset({ body, web3, provider, addressTransformer }),
          })
        }
      },
      /**
       * Create new listing on the marketplace. Only marketplace operator can establish those on behalf of the seller of the NFT.
       * After listing is created, seller must approve the asset for spending to the marketplace smart contract.
       * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      sellMarketplaceListing: async (body: ChainSellAssetOnMarketplace, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return MarketplaceService.sellAssetOnMarketplace(body as any)
        } else {
          return broadcastFunction({
            txData: await sellAsset({ body, web3, provider, addressTransformer }),
          })
        }
      },
      /**
       * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      cancelMarketplaceListing: async (body: ChainCancelSellAssetOnMarketplace, provider?: string) => {
        if (body.signatureId) {
          // TODO: find better type
          return MarketplaceService.cancelSellMarketplaceListing(body as any)
        } else {
          return broadcastFunction({
            txData: await cancelListing({ body, web3, provider, addressTransformer }),
          })
        }
      },
    },
  }
}
