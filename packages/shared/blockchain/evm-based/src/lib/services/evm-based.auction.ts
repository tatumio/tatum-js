import {
  ApproveNftSpending,
  AuctionService,
  BidOnAuction,
  CancelOrSettleAuction,
  GenerateAuction,
  UpdateFeeRecipient,
} from '@tatumio/api-client'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { TransactionConfig } from 'web3-core'
import { BroadcastFunction, FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'
import { EvmBasedWeb3 } from './evm-based.web3'
import { Erc1155, Erc20Token, Erc721Token, MarketplaceSmartContract } from '../contracts'
import { AbiItem, toWei } from 'web3-utils'
import { evmBasedUtils } from '../evm-based.utils'
import { erc20 } from '../transactions/erc20'
import { WithoutChain } from '@tatumio/shared-abstract-sdk'

export const evmBasedAuction = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  const { blockchain, web3, broadcastFunction } = args
  return {
    /**
     * For more details, see <a href="https://tatum.io/apidoc#operation/MPAuction" target="_blank">Tatum API documentation</a>
     */
    getAuction: async (contractAddress: string, auctionId: string) => {
      return AuctionService.getAuction(
        blockchain as 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress,
        auctionId,
      )
    },
    /**
     * For more details, see <a href="https://tatum.io/apidoc#operation/MPAuctionFee" target="_blank">Tatum API documentation</a>
     */
    getAuctionFee: async (contractAddress: string) => {
      return AuctionService.getAuctionFee(
        blockchain as 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress,
      )
    },
    /**
     * For more details, see <a href="https://tatum.io/apidoc#operation/MPAuctionRecipient" target="_blank">Tatum API documentation</a>
     */
    getAuctionFeeRecipient: async (contractAddress: string): Promise<{ address?: string }> => {
      return AuctionService.getAuctionFeeRecipient(
        blockchain as 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress,
      )
    },
    prepare: {
      /**
       * Sign ETH deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the ETH Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      deployAuctionSignedTransaction: async (body: DeployNftAuction, provider?: string) =>
        deployAuctionSignedTransaction(body, web3, provider),

      auctionUpdateFeeRecipientSignedTransaction: async (
        body: UpdateAuctionFeeRecipient,
        provider?: string,
      ) => auctionUpdateFeeRecipientSignedTransaction(body, web3, provider),

      /**
       * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
       * After auction is created, auction contract transfers the asset to the auction smart contract.
       * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      createAuctionSignedTransaction: async (body: CreateAuction, provider?: string) =>
        createAuctionSignedTransaction(body, web3, provider),
      /**
       * Approve NFT transfer for auction to perform listing of the asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      auctionApproveNftTransferSignedTransaction: async (body: ApproveNftTransfer, provider?: string) =>
        auctionApproveNftTransferSignedTransaction(body, web3, provider),
      /**
       * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      auctionApproveErc20TransferSignedTransaction: async (body: ApproveNftTransfer, provider?: string) =>
        auctionApproveErc20TransferSignedTransaction(body, web3, provider),
      /**
       * Bid on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      auctionBidSignedTransaction: async (body: AuctionBid, provider?: string) =>
        auctionBidSignedTransaction(body, blockchain, broadcastFunction, web3, provider),
      /**
       * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      auctionCancelSignedTransaction: async (body: CancelAuction, provider?: string) =>
        auctionCancelSignedTransaction(body, web3, provider),
      /**
       * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionSettleSignedTransaction: async (body: SettleAuction, provider?: string) =>
        auctionSettleSignedTransaction(body, web3, provider),
    },
    send: {
      /**
       * Deploy new smart contract for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
       * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
       * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
       * Before auction is created, seller must approve transfer of the NFT to the auction contract.
       * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
       * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
       * Once there is higher bid than the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
       * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      deployAuctionSignedTransaction: async (body: DeployNftAuction, provider?: string) =>
        broadcastFunction({
          txData: await deployAuctionSignedTransaction(body, web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Update auction fee recipient.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionUpdateFeeRecipientSignedTransaction: async (
        body: UpdateAuctionFeeRecipient,
        provider?: string,
      ) =>
        broadcastFunction({
          txData: await auctionUpdateFeeRecipientSignedTransaction(body, web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
       * After auction is created, auction contract transfers the asset to the auction smart contract.
       * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      createAuctionSignedTransaction: async (body: CreateAuction, provider?: string) =>
        broadcastFunction({
          txData: await createAuctionSignedTransaction(body, web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Approve NFT transfer for auction to perform listing of the asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionApproveNftTransferSignedTransaction: async (body: ApproveNftTransfer, provider?: string) =>
        broadcastFunction({
          txData: await auctionApproveNftTransferSignedTransaction(body, web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
       * @param testnet use testnet or not
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionApproveErc20TransferSignedTransaction: async (body: ApproveNftTransfer, provider?: string) =>
        broadcastFunction({
          txData: await auctionApproveErc20TransferSignedTransaction(body, web3, provider),
          signatureId: body.signatureId,
        }),
      auctionBidSignedTransaction: async (body: AuctionBid, provider?: string) =>
        broadcastFunction({
          txData: await auctionBidSignedTransaction(body, blockchain, broadcastFunction, web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionCancelSignedTransaction: async (body: CancelAuction, provider?: string) =>
        broadcastFunction({
          txData: await auctionCancelSignedTransaction(body, web3, provider),
          signatureId: body.signatureId,
        }),
      auctionSettleSignedTransaction: async (body: SettleAuction, provider?: string) =>
        broadcastFunction({
          txData: await auctionSettleSignedTransaction(body, web3, provider),
          signatureId: body.signatureId,
        }),
    },
  }
}

export type DeployNftAuction = FromPrivateKeyOrSignatureId<WithoutChain<GenerateAuction>>

const deployAuctionSignedTransaction = async (
  body: DeployNftAuction,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const client = web3.getClient(provider)
  // TODO any type
  const contract = new client.eth.Contract(MarketplaceSmartContract.abi as any, undefined, {
    data: MarketplaceSmartContract.bytecode,
  })

  const deploy = contract.deploy({
    arguments: [body.auctionFee, body.feeRecipient],
    data: MarketplaceSmartContract.bytecode,
  })

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce: body.nonce,
  }

  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export type UpdateAuctionFeeRecipient = FromPrivateKeyOrSignatureId<WithoutChain<UpdateFeeRecipient>> & Amount

const auctionUpdateFeeRecipientSignedTransaction = (
  body: UpdateAuctionFeeRecipient,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const client = web3.getClient(provider)

  const methodName = 'setAuctionFeeRecipient'
  const methodAbi = MarketplaceSmartContract.abi.find((a) => a.name === methodName)
  // TODO any type
  const contract = new client.eth.Contract([methodAbi as any])
  const params = [body.feeRecipient]

  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: body.amount
      ? `0x${new BigNumber(client.utils.toWei(body.amount, 'ether')).toString(16)}`
      : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export type ApproveNftTransfer = FromPrivateKeyOrSignatureId<WithoutChain<ApproveNftSpending>> & Amount

const auctionApproveNftTransferSignedTransaction = async (
  body: ApproveNftTransfer,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const client = web3.getClient(provider)

  const methodName = body.isErc721 ? 'approve' : 'setApprovalForAll'
  const abi = body.isErc721 ? Erc721Token.abi : Erc1155.abi
  const methodAbi = abi.find((a) => a.name === methodName)
  // TODO any type
  const contract = new client.eth.Contract([methodAbi as any])

  const params = body.isErc721
    ? [body.spender, `0x${new BigNumber(body.tokenId).toString(16)}`]
    : [body.spender, true]

  const data = contract.methods[methodName](...params).encodeABI()

  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: body.amount
      ? `0x${new BigNumber(client.utils.toWei(body.amount, 'ether')).toString(16)}`
      : undefined,
    data,
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

const auctionApproveErc20TransferSignedTransaction = async (
  body: ApproveNftTransfer,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const client = web3.getClient(provider)
  const amount = new BigNumber(body.amount)
    .multipliedBy(
      new BigNumber(10).pow(
        // TODO any type
        await new client.eth.Contract(Erc20Token.abi as any, body.contractAddress.trim()).methods
          .decimals()
          .call(),
      ),
    )
    .toString(16)
  const params = [body.spender.trim(), `0x${amount}`]
  body.amount = '0'

  const methodName = 'approve'
  const methodAbi = MarketplaceSmartContract.abi.find((a) => a.name === methodName) as AbiItem
  const contract = new client.eth.Contract([methodAbi])
  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export type AuctionBid = FromPrivateKeyOrSignatureId<WithoutChain<BidOnAuction>>

const auctionBidSignedTransaction = async (
  body: AuctionBid,
  blockchain: EvmBasedBlockchain,
  broadcastFunction: BroadcastFunction,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const client = web3.getClient(provider)

  const a = await new client.eth.Contract(MarketplaceSmartContract.abi as any, body.contractAddress).methods
    .getAuction(body.id)
    .call()
  let decimals = 18
  let methodName = 'bid'
  let amount: string | undefined = undefined
  if (a[6] !== '0x0000000000000000000000000000000000000000') {
    decimals = await erc20({ blockchain, web3, broadcastFunction }).decimals(a[6], provider)
    if (body.bidder) {
      methodName = 'bidForExternalBidder'
    }
  } else if (body.bidder) {
    throw new Error('Bidder could be present only for ERC20 based auctions.')
  } else {
    amount = body.bidValue
  }

  if (!body.bidValue) {
    throw new Error('No budValue set')
  }

  const params = [
    body.id,
    `0x${new BigNumber(body.bidValue).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
  ]
  if (body.bidder) {
    params.push(body.bidder.trim())
  }

  // TODO any type
  const contract = new client.eth.Contract([MarketplaceSmartContract.abi as any])
  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: amount ? `0x${new BigNumber(client.utils.toWei(amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export type SettleAuction = FromPrivateKeyOrSignatureId<WithoutChain<CancelOrSettleAuction>> & Partial<Amount>

export type CancelAuction = SettleAuction

const auctionCancelSignedTransaction = async (body: CancelAuction, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)

  const params = [body.id]
  // TODO any type
  const contract = new client.eth.Contract(MarketplaceSmartContract.abi as any, body.contractAddress.trim())
  const data = contract.methods['cancelAuction']({ arguments: params }).encodeABI()

  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: body.amount
      ? `0x${new BigNumber(client.utils.toWei(body.amount, 'ether')).toString(16)}`
      : undefined,
    data,
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

const auctionSettleSignedTransaction = async (body: SettleAuction, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)

  const params = [body.id]
  const methodName = 'settleAuction'
  const methodAbi = MarketplaceSmartContract.abi.find((a) => a.name === methodName)
  // TODO any type
  const contract = new client.eth.Contract([methodAbi as any])

  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: body.amount
      ? `0x${new BigNumber(client.utils.toWei(body.amount, 'ether')).toString(16)}`
      : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export type CreateAuction = FromPrivateKeyOrSignatureId<
  WithoutChain<Omit<GenerateAuction, 'feeRecipient' | 'auctionFee'>>
> & {
  contractAddress: string
  id: string
  nftAddress: string
  seller: string
  erc20Address?: string
  endedAt: number
  tokenId: string
  amount?: string
  isErc721: boolean
  nonce?: number
}

const createAuctionSignedTransaction = async (
  body: CreateAuction,
  web3: EvmBasedWeb3,
  provider?: string,
): Promise<string> => {
  const client = web3.getClient(provider)

  const params = [
    body.id,
    body.isErc721,
    body.nftAddress.trim(),
    `0x${new BigNumber(body.tokenId).toString(16)}`,
    body.seller.trim(),
    `0x${new BigNumber(body.amount || 0).toString(16)}`,
    `0x${new BigNumber(body.endedAt).toString(16)}`,
    body.erc20Address || '0x0000000000000000000000000000000000000000',
  ]
  body.amount = undefined

  const methodName = 'createAuction'
  const methodAbi = MarketplaceSmartContract.abi.find((a) => a.name === methodName)
  // TODO any type
  const contract = new client.eth.Contract([methodAbi as any])

  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

interface Amount {
  amount: string
}
