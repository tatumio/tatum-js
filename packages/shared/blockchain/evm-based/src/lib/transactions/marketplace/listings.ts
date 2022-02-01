import { BuyAssetOnMarketplace, CancelSellAssetOnMarketplace, GenerateMarketplace, UpdateFee, UpdateFeeRecipient } from '@tatumio/api-client'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { prepareSignedTransactionAbstraction } from '..'
import { ListingSmartContract } from '../../contracts'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'

// Missing signatureid
const deploySignedTransaction = async (body: GenerateMarketplace, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)

  // TODO: remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any)
    .deploy({
      arguments: [body.marketplaceFee, body.feeRecipient],
      data: ListingSmartContract.bytecode,
    })
    .encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    data,
    nonce: body.nonce,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    undefined,
    body.fromPrivateKey,
    web3,
    body.fee.gasLimit,
    body.fee.gasPrice,
  )
}

// Missing signatureid
const updateFee = async (body: UpdateFee, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)

  const smartContractMethodName = 'setMarketplaceFee'

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName]([`0x${new BigNumber(body.marketplaceFee).toString(16)}`]).encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    data,
    to: body.contractAddress,
    nonce: body.nonce,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    undefined,
    body.fromPrivateKey,
    web3,
    body.fee.gasLimit,
    body.fee.gasPrice,
  )
}

// Missing signatureid
const updateFeeRecipient = async (body: UpdateFeeRecipient, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)

  const smartContractMethodName = 'setMarketplaceFeeRecipient'

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName]([body.feeRecipient]).encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    data,
    to: body.contractAddress,
    nonce: body.nonce,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    undefined,
    body.fromPrivateKey,
    web3,
    body.fee.gasLimit,
    body.fee.gasPrice,
  )
}

const buy = async (body: BuyAssetOnMarketplace, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)

  const smartContractParams = [
    body.listingId,
    body.erc20Address ?? '0x0000000000000000000000000000000000000000',
  ]

  let smartContractMethodName = 'buyAssetFromListing'
  if (body.buyer) {
    smartContractMethodName = 'buyAssetFromListingForExternalBuyer'
    smartContractParams.push(body.buyer.trim())
  }

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName](smartContractParams).encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    data,
    to: body.contractAddress,
    nonce: body.nonce,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    undefined,
    body.fromPrivateKey,
    web3,
    body.fee.gasLimit,
    body.fee.gasPrice,
  )
}

// Missing signatureid
const cancel = async (body: CancelSellAssetOnMarketplace, web3: EvmBasedWeb3, provider?: string) => {
  const client = web3.getClient(provider)

  const smartContractMethodName = 'cancelListing'

  // TODO remove any type
  const data = new client.eth.Contract(ListingSmartContract.abi as any).methods[smartContractMethodName]([body.listingId]).encodeABI()

  const tx: TransactionConfig = {
    from: undefined,
    data,
    to: body.contractAddress,
    nonce: body.nonce,
  }

  return prepareSignedTransactionAbstraction(
    client,
    tx,
    undefined,
    body.fromPrivateKey,
    web3,
    body.fee.gasLimit,
    body.fee.gasPrice,
  )
}

export const listing = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
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
      deploy: async (body: GenerateMarketplace, provider?: string) =>
        deploySignedTransaction(body, args.web3, provider),
      /**
       * Update marketplace fee.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFee: async (body: UpdateFee, provider?: string) => updateFee(body, args.web3, provider),
      /**
       * Update marketplace fee recipient.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFeeRecipient: async (body: UpdateFeeRecipient, provider?: string) => updateFeeRecipient(body, args.web3, provider),
      /**
       * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      buy: async (body: BuyAssetOnMarketplace, provider?: string) => buy(body, args.web3, provider),
      /**
       * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      cancel: async (body: CancelSellAssetOnMarketplace, provider?: string) => cancel(body, args.web3, provider),
    },
    send: {
      /**
       * Update marketplace fee.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFee: async (body: UpdateFee, provider?: string) =>
        args.broadcastFunction({
          txData: await updateFee(body, args.web3, provider)
        }),
      /**
       * Update marketplace fee recipient.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFeeRecipient: async (body: UpdateFeeRecipient, provider?: string) =>
        args.broadcastFunction({
          txData: await updateFeeRecipient(body, args.web3, provider)
        }),
      /**
       * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      buy: async (body: BuyAssetOnMarketplace, provider?: string) =>
        args.broadcastFunction({
          txData: await buy(body, args.web3, provider)
        }),
      /**
       * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      cancel: async (body: CancelSellAssetOnMarketplace, provider?: string) =>
        args.broadcastFunction({
          txData: await cancel(body, args.web3, provider),
        })
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
    deploy: async (body: GenerateMarketplace, provider?: string) =>
      args.broadcastFunction({
        txData: await deploySignedTransaction(body, args.web3, provider),
      }),
  }
}
