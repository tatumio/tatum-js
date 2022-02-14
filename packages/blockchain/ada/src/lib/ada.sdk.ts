import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { BlockchainAdaService } from '@tatumio/api-client'
import { adaWallet } from './services/ada.wallet'
import { adaTx } from './services/ada.tx'
import { adaKmsService } from './services/ada.kms'

const blockchain = Blockchain.CARDANO

export const TatumAdaSDK = (args: SDKArguments) => {
  return {
    ...abstractBlockchainSdk({
      ...args,
      blockchain,
    }),
    transaction: adaTx({ broadcastFunction: BlockchainAdaService.adaBroadcast }),
    wallet: adaWallet(),
    kms: adaKmsService({ blockchain }),
    blockchain: {
      broadcast: BlockchainAdaService.adaBroadcast,
      getBlockChainInfo: BlockchainAdaService.adaGetBlockChainInfo,
      getBlock: BlockchainAdaService.adaGetBlock,
      getAccount: BlockchainAdaService.adaGetAccount,
      getTransaction: BlockchainAdaService.adaGetRawTransaction,
      getTransactionByAddress: BlockchainAdaService.adaGetTxByAddress,
      getUTXOs: BlockchainAdaService.adaGetUtxoByAddress,
    },
  }
}
