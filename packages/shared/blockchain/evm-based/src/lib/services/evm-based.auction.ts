import {
  ApproveErc20,
  ApproveNftSpending,
  BidOnAuction,
  BlockchainMarketplaceService,
  CancelablePromise,
  CancelOrSettleAuction,
  CreateAuction,
  GenerateAuction,
  SignatureId,
  TransactionHashKMS,
  UpdateFee,
  UpdateFeeCelo,
  UpdateFeeRecipient,
} from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { TransactionConfig } from 'web3-core'
import { BroadcastFunction, FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'
import { EvmBasedWeb3 } from './evm-based.web3'
import { Erc20Token, Erc1155, Erc721Token, MarketplaceSmartContract } from '../contracts'
import { prepareSignedTransactionAbstraction } from '../transactions/erc20'
import { toWei } from 'web3-utils'

export const evmBasedAuction = (args: {
  blockchain: Blockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  const { blockchain, web3, broadcastFunction } = args
  return {
    getAuction: async (contractAddress: string, auctionId: string) => {
      return BlockchainMarketplaceService.getAuction(
        blockchain as 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress,
        auctionId,
      )
    },
    getAuctionFee: async (contractAddress: string) => {
      return BlockchainMarketplaceService.getAuctionFee(
        blockchain as 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress,
      )
    },
    getAuctionFeeRecipient: async (contractAddress: string): CancelablePromise<{ address?: string }> => {
      return BlockchainMarketplaceService.getAuctionFeeRecipient(
        blockchain as 'ETH' | 'ONE' | 'CELO' | 'MATIC' | 'BSC',
        contractAddress,
      )
    },
    updateFee: async (body: ChainUpdateFee): CancelablePromise<TransactionHashKMS | SignatureId> => {
      return BlockchainMarketplaceService.updateFee({ ...body, chain: blockchain } as any)
    },
    prepare: {
      /**
       * Sign ETH deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the ETH Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      deployAuctionSignedTransaction: async (body, provider?: string) =>
        deployAuctionSignedTransaction(body, web3, provider),

      auctionUpdateFeeRecipientSignedTransaction: async (body, provider?) =>
        auctionUpdateFeeRecipientSignedTransaction(body, web3, provider),

      /**
       * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
       * After auction is created, auction contract transfers the asset to the auction smart contract.
       * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      createAuctionSignedTransaction: async (body: ChainCreateAuction, provider?) =>
        createAuctionSignedTransaction(body, web3, provider),
      /**
       * Approve NFT transfer for auction to perform listing of the asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      auctionApproveNftTransferSignedTransaction: async (body, provider?) =>
        auctionApproveNftTransferSignedTransaction(body, web3, provider),
      /**
       * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      auctionApproveErc20TransferSignedTransaction: async (testnet, body, provider?) =>
        auctionApproveErc20TransferSignedTransaction(testnet, body, web3, provider),
      /**
       * Bid on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      auctionBidSignedTransaction: async (testnet, body, provider?) =>
        auctionBidSignedTransaction(testnet, body, web3, provider),
      /**
       * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      auctionCancelSignedTransaction: async (body, provider?) =>
        auctionCancelSignedTransaction(body, web3, provider),
      /**
       * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionSettleSignedTransaction: async (body, provider?) =>
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
      deployAuctionSignedTransaction: async (body, provider?: string) =>
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
      auctionUpdateFeeRecipientSignedTransaction: async (body, provider) =>
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
      createAuctionSignedTransaction: async (body: ChainCreateAuction, provider) =>
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
      auctionApproveNftTransferSignedTransaction: async (body, provider) =>
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
      auctionApproveErc20TransferSignedTransaction: async (testnet, body, provider) =>
        broadcastFunction({
          txData: await auctionApproveErc20TransferSignedTransaction(testnet, body, web3, provider),
          signatureId: body.signatureId,
        }),
      auctionBidSignedTransaction: async (testnet, body, provider) =>
        broadcastFunction({
          txData: await auctionBidSignedTransaction(testnet, body, web3, provider),
          signatureId: body.signatureId,
        }),
      /**
       * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionCancelSignedTransaction: async (body, provider) =>
        broadcastFunction({
          txData: await auctionCancelSignedTransaction(body, web3, provider),
          signatureId: body.signatureId,
        }),
      auctionSettleSignedTransaction: async (body, provider) =>
        broadcastFunction({
          txData: await auctionSettleSignedTransaction(body, web3, provider),
          signatureId: body.signatureId,
        }),
    },
  }
}

const deployAuctionSignedTransaction = async (body, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)
  // @ts-ignore
  const contract = new client.eth.Contract(MarketplaceSmartContract.abi, null, {
    data: MarketplaceSmartContract.bytecode,
  })

  // @ts-ignore
  const deploy = contract.deploy({
    arguments: [body.auctionFee, body.feeRecipient],
  })

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce: body.nonce,
  }

  return await prepareSignedTransactionAbstraction(
    client,
    tx,
    body.signatureId,
    body.fromPrivateKey,
    web3,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

const auctionUpdateFeeRecipientSignedTransaction = (body, web3, provider) => {
  const client = web3.getClient(provider)

  const methodName = 'setAuctionFeeRecipient'
  const methodAbi = MarketplaceSmartContract.abi.find((a) => a.name === methodName)
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

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    body.signatureId,
    body.fromPrivateKey,
    web3,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export const auctionApproveNftTransferSignedTransaction = async (body, web3, provider?: string) => {
  const client = web3.getClient(provider)

  const methodName = body.isErc721 ? 'approve' : 'setApprovalForAll'
  const abi = body.isErc721 ? Erc721Token.abi : Erc1155.abi
  const methodAbi = abi.find((a) => a.name === methodName)
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

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    body.signatureId,
    body.fromPrivateKey,
    web3,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export const auctionApproveErc20TransferSignedTransaction = async (
  testnet: boolean,
  body,
  web3,
  provider?: string,
) => {
  const client = web3.getClient(provider)
  const amount = new BigNumber(body.amount)
    .multipliedBy(
      new BigNumber(10).pow(
        await new client.eth.Contract(Erc20Token.abi, body.contractAddress.trim()).methods.decimals().call(),
      ),
    )
    .toString(16)
  const params = [body.spender.trim(), `0x${amount}`]
  body.amount = '0'

  const methodName = 'approve'
  const methodAbi = MarketplaceSmartContract.abi.find((a) => a.name === methodName)
  const contract = new client.eth.Contract([methodAbi])
  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce: body.nonce,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    body.signatureId,
    body.fromPrivateKey,
    web3,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export const auctionBidSignedTransaction = async (testnet: boolean, body, web3, provider?: string) => {
  const client = web3.getClient(provider)

  const a = await new client.eth.Contract(MarketplaceSmartContract.abi, body.contractAddress).methods
    .getAuction(body.id)
    .call()
  let decimals = 18
  let methodName = 'bid'
  const b: any = { ...body }
  if (a[6] !== '0x0000000000000000000000000000000000000000') {
    // @ts-ignore
    decimals = await getErc20Decimals(body.chain, a[6], provider, testnet)
    if (body.bidder) {
      methodName = 'bidForExternalBidder'
    }
  } else if (body.bidder) {
    throw new Error('Bidder could be present only for ERC20 based auctions.')
  } else {
    b.amount = body.bidValue
  }

  const params = [
    body.id,
    `0x${new BigNumber(body.bidValue).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
  ]
  if (body.bidder) {
    params.push(body.bidder.trim())
  }

  const contract = new client.eth.Contract([MarketplaceSmartContract.abi])
  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: b.amount ? `0x${new BigNumber(client.utils.toWei(b.amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce: b.nonce,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    body.signatureId,
    body.fromPrivateKey,
    web3,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export const auctionCancelSignedTransaction = async (body, web3, provider?: string) => {
  const client = web3.getClient(provider)

  const params = [body.id]
  const contract = new client.eth.Contract(MarketplaceSmartContract.abi, body.contractAddress.trim())
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

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    body.signatureId,
    body.fromPrivateKey,
    web3,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export const auctionSettleSignedTransaction = async (body, web3, provider?: string) => {
  const client = web3.getClient(provider)

  const params = [body.id]
  const methodName = 'settleAuction'
  const methodAbi = MarketplaceSmartContract.abi.find((a) => a.name === methodName)
  const contract = new client.eth.Contract([methodAbi])

  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: body.amount
      ? `0x${new BigNumber(client.utils.toWei(body.amount, 'ether')).toString(16)}`
      : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce: body.nonce,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    body.signatureId,
    body.fromPrivateKey,
    web3,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export const createAuctionSignedTransaction = async (
  body: ChainCreateAuction,
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
  const contract = new client.eth.Contract([methodAbi as any])

  const tx: TransactionConfig = {
    from: 0,
    to: body.contractAddress.trim(),
    value: body.amount ? `0x${new BigNumber(toWei(body.amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce: body.nonce,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    body.signatureId,
    body.fromPrivateKey,
    web3,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
  )
}

export type ChainDeployAuction = FromPrivateKeyOrSignatureId<Omit<GenerateAuction, 'chain'>>
export type ChainCreateAuction = FromPrivateKeyOrSignatureId<Omit<CreateAuction, 'chain'>>
export type ChainUpdateFeeRecipient = FromPrivateKeyOrSignatureId<Omit<UpdateFeeRecipient, 'chain'>>
export type ChainUpdateFee =
  // Missing UpdateFeeKMS
  | FromPrivateKeyOrSignatureId<Omit<UpdateFee, 'chain'>>
  | FromPrivateKeyOrSignatureId<Omit<UpdateFeeCelo, 'chain'>>
export type ChainApproveNftSpending = FromPrivateKeyOrSignatureId<Omit<ApproveNftSpending, 'chain'>>
export type ChainApproveErc20Spending = FromPrivateKeyOrSignatureId<Omit<ApproveErc20, 'chain'>>
export type ChainBidOnAuction = FromPrivateKeyOrSignatureId<Omit<BidOnAuction, 'chain'>>
export type ChainCancelAuction = FromPrivateKeyOrSignatureId<Omit<CancelOrSettleAuction, 'chain'>>
export type ChainSettleAuction = FromPrivateKeyOrSignatureId<Omit<CancelOrSettleAuction, 'chain'>>
