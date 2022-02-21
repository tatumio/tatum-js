import { BlockchainTronService } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { tronWeb } from './services/tron.web'
import { tronTx } from './services/tron.tx'
import { tronWallet } from './services/tron.wallet'
import { tronRecord } from './services/tron.record'

const blockchain = Blockchain.TRON

export const TatumTronSDK = (args: SDKArguments) => {
  const web = tronWeb()
  const txService = tronTx({ tronWeb: web })

  return {
    ...abstractBlockchainSdk({
      ...args,
      blockchain,
    }),
    transaction: txService.native,
    trc10: txService.trc10,
    trc20: txService.trc20,
    trc721: txService.trc721,
    marketplace: txService.marketplace,
    smartContract: txService.smartContract,
    custodial: txService.custodial,
    wallet: tronWallet({ tronWeb: web }),
    tronWeb: web,
    record: tronRecord(),
    blockchain: {
      broadcast: BlockchainTronService.tronBroadcast,
      getCurrentBlock: BlockchainTronService.tronGetCurrentBlock,
      getBlock: BlockchainTronService.tronGetBlock,
      getTrc10Detail: BlockchainTronService.tronTrc10Detail,
      getAccount: BlockchainTronService.tronGetAccount,
      getTransaction: BlockchainTronService.tronGetTransaction,
      sendTransaction: BlockchainTronService.tronTransfer,
    },
  }
}
