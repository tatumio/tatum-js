import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainBitcoinCashService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/abstract-sdk'
import { bchTransactions } from './transaction/bch.tx';

const blockchain = Blockchain.BCH

export const TatumBchSDK = (args: SDKArguments) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    api: BlockchainBitcoinCashService,
    transaction: bchTransactions(),
    blockchain: {
      broadcast: BlockchainBitcoinCashService.bchBroadcast,
      getCurrentBlock: BlockchainBitcoinCashService.bchGetBlockChainInfo,
      getBlockHash: BlockchainBitcoinCashService.bchGetBlockHash,
      getBlock: BlockchainBitcoinCashService.bchGetBlock,
      getTxForAccount: BlockchainBitcoinCashService.bchGetTxByAddress,
      getTransaction: BlockchainBitcoinCashService.bchGetRawTransaction,
    },
  }
}
