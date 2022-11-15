import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { Blockchain, EvmBasedBlockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainUtilsService,
  FungibleTokensErc20OrCompatibleService,
  HarmonyService,
} from '@tatumio/api-client'
import { oneWeb3 } from './services/one.web3'
import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { oneKmsService } from './services/one.kms'
import { oneTxService } from './services/one.tx'
import { oneAuctionService } from './services/one.auction'
import { virtualAccountService } from './services/one.virtualAccount'
import { oneWallet } from './services/one.wallet'

const blockchain: EvmBasedBlockchain = Blockchain.HARMONY

export const TatumOneSDK = (args: SDKArguments) => {
  const web3 = oneWeb3({ blockchain })
  const api = HarmonyService
  const txService = oneTxService({ blockchain, web3 })
  const virtualAccount = virtualAccountService({ blockchain, web3 })
  const walletService = oneWallet({ blockchain })
  const evmSdk = evmBasedSdk({ ...args, blockchain, web3 })
  const { nft, storage } = abstractSdkNft()

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
    wallet: walletService,
    kms: oneKmsService({ blockchain, web3 }),
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
    storage,
    multiToken: txService.multiToken,
    smartContract: txService.smartContract,
    custodial: txService.custodial,
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: HarmonyService.oneBroadcast,
      }),
      auction: oneAuctionService({ blockchain, web3 }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.oneWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: HarmonyService.oneBroadcast,
      getTransactionsCount: HarmonyService.oneGetTransactionCount,
      getCurrentBlock: HarmonyService.oneGetCurrentBlock,
      getBlock: HarmonyService.oneGetBlock,
      getBlockchainAccountBalance: HarmonyService.oneGetBalance,
      get: HarmonyService.oneGetTransaction,
      smartContractInvocation: HarmonyService.oneBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
      formatAddress: HarmonyService.oneFormatAddress,
      generateAddress: HarmonyService.oneGenerateAddress,
      generateAddressPrivateKey: HarmonyService.oneGenerateAddressPrivateKey,
      generateWallet: HarmonyService.oneGenerateWallet,
      web3Driver: HarmonyService.oneWeb3Driver,
      blockchainTransfer: HarmonyService.oneBlockchainTransfer,
    },
    virtualAccount,
  }
}
