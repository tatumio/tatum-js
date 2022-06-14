import { FlowService } from '@tatumio/api-client'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { flowWallet } from './services/flow.sdk.wallet'
import { flowTxService } from './services/flow.tx'
import { flowKmsService } from './services/flow.kms'

const blockchain = Blockchain.FLOW

export const TatumFlowSDK = (args: SDKArguments) => {
  const api = FlowService
  const { nft, ...abstractSdk } = abstractBlockchainSdk({ ...args, blockchain })

  const {
    deployNFTSmartContract,
    mintNFT,
    transferNFT,
    mintMultipleNFTs,
    burnNFT,
    getNFTTransaction,
    getNFTAccountBalance,
    getNFTMetadataURI,
  } = nft

  return {
    ...abstractSdk,
    api,
    kms: flowKmsService({ ...args, blockchain }),
    wallet: flowWallet(),
    transaction: flowTxService(args),
    nft: {
      deployNFTSmartContract,
      mintNFT,
      transferNFT,
      mintMultipleNFTs,
      burnNFT,
      getNFTTransaction,
      getNFTAccountBalance,
      getNFTMetadataURI,
    },
    blockchain: {
      getCurrentBlock: FlowService.flowGetBlockChainInfo,
      getBlock: FlowService.flowGetBlock,
      getAccount: FlowService.flowGetAccount,
      getTransaction: FlowService.flowGetRawTransaction,
    },
  }
}
