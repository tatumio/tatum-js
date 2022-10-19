import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  FungibleTokensErc20OrCompatibleService,
  XinFinService,
} from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { xdcWeb3 } from './services/xdc.web3'
import { xdcKmsService } from './services/xdc.kms'
import { xdcTxService } from './services/xdc.tx'
import { xdcAuctionService } from './services/xdc.auction'

const blockchain = Blockchain.BSC

export const TatumBscSDK = (args: SDKArguments) => {
  const web3 = xdcWeb3({ blockchain })
  const api = XinFinService
  const txService = xdcTxService({ blockchain, web3 })
  const { nft, ...evmSdk } = evmBasedSdk({ ...args, blockchain, web3 })

  const {
    deployNFTSmartContract,
    mintNFT,
    transferNFT,
    mintMultipleNFTs,
    burnNFT,
    addNFTMinter,
    updateNFTRoyalty,
    getNFTTransaction,
    getNFTAccountBalance,
    getNFTProvenanceData,
    getNFTMetadataURI,
    getNFTRoyalty,
  } = nft

  return {
    ...evmSdk,
    kms: xdcKmsService({ blockchain, web3 }),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: FungibleTokensErc20OrCompatibleService.erc20GetTransactionByAddress,
      getErc20AccountBalance: FungibleTokensErc20OrCompatibleService.erc20GetBalance,
    },
    nft: {
      ...txService.erc721,
      deployNFTSmartContract,
      mintNFT,
      transferNFT,
      mintMultipleNFTs,
      burnNFT,
      addNFTMinter,
      updateNFTRoyalty,
      getNFTTransaction,
      getNFTAccountBalance,
      getNFTProvenanceData,
      getNFTMetadataURI,
      getNFTRoyalty,
    },
    smartContract: txService.smartContract,
    multiToken: txService.multiToken,
    custodial: txService.custodial,
    gasPump: txService.gasPump,
    marketplace: {
      auction: xdcAuctionService({ blockchain, web3 }),
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: XinFinService.xdcBroadcast,
      }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.xdcWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: XinFinService.xdcBroadcast,
      getTransactionsCount: XinFinService.xdcGetTransactionCount,
      getCurrentBlock: XinFinService.xdcGetCurrentBlock,
      getBlock: XinFinService.xdcGetBlock,
      getBlockchainAccountBalance: XinFinService.xdcGetBalance,
      get: XinFinService.xdcGetTransaction,
      estimateGas: BlockchainFeesService.xdcEstimateGas,
      smartContractInvocation: XinFinService.xdcBlockchainSmartContractInvocation,
      blockchainTransfer: XinFinService.xdcBlockchainTransfer,
      generateAddress: XinFinService.xdcGenerateAddress,
      generateAddressPrivateKey: XinFinService.xdcGenerateAddressPrivateKey,
      generateWallet: XinFinService.xdcGenerateWallet,
      web3Driver: XinFinService.xdcWeb3Driver,
    },
  }
}
