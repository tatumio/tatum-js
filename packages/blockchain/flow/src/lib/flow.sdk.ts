import { BlockchainUtilsService, FlowService } from '@tatumio/api-client'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { abstractNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { flowWallet } from './services/flow.sdk.wallet'
import { flowTxService } from './services/flow.tx'
import { flowKmsService } from './services/flow.kms'
import { flowBlockchain } from './services/flow.blockchain'
import { flowProvider } from './services/flow.provider'
import { virtualAccountService } from './services/flow.virtualAccount'

const blockchain = Blockchain.FLOW

export interface FlowSDKArguments extends SDKArguments {
  testnet: boolean
}

export const TatumFlowSDK = (args: FlowSDKArguments) => {
  const api = FlowService
  const abstractSdk = abstractBlockchainSdk({ ...args, blockchain })
  const { nft, storage } = abstractNft()
  const virtualAccount = virtualAccountService({ blockchain })
  const provider = flowProvider({ ...args })
  const flowBlockchainCalls = flowBlockchain(args)
  const txService = flowTxService(provider, flowBlockchainCalls)

  return {
    ...abstractSdk,
    api,
    kms: flowKmsService({ ...args, blockchain }),
    wallet: flowWallet(),
    transaction: txService.native,
    account: txService.account,
    nft: {
      ...txService.nft,
      ...nft,
    },
    storage,
    templates: txService.templates,
    blockchain: {
      broadcast: flowBlockchainCalls.broadcast,
      getCurrentBlock: FlowService.flowGetBlockChainInfo,
      getBlock: FlowService.flowGetBlock,
      getAccount: FlowService.flowGetAccount,
      getTransaction: FlowService.flowGetRawTransaction,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
      generateAddress: FlowService.flowGenerateAddress,
    },
    virtualAccount,
  }
}
