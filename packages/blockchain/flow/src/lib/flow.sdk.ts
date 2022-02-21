import { BlockchainFlowService } from '@tatumio/api-client'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { flowWallet } from './services/flow.sdk.wallet'
import { flowTxService } from './services/flow.tx'
import { flowKmsService } from './services/flow.kms'
import { flowBlockchain } from './services/flow.blockchain'

const blockchain = Blockchain.FLOW

export const TatumFlowSDK = (args: SDKArguments) => {
  const api = BlockchainFlowService

  return {
    ...abstractBlockchainSdk({ ...args, blockchain }),
    api,
    kms: flowKmsService({ ...args, blockchain }),
    wallet: flowWallet(),
    transaction: flowTxService(args),
    blockchain: {
      ...flowBlockchain(args),
      getCurrentBlock: BlockchainFlowService.flowGetBlockChainInfo,
      getBlock: BlockchainFlowService.flowGetBlock,
      getAccount: BlockchainFlowService.flowGetAccount,
      getTransaction: BlockchainFlowService.flowGetRawTransaction,
    },
  }
}
