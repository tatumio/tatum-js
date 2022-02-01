import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainBitcoinCashService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { bchTransactions } from './bch.sdk.tx'
import { bchWallet } from './bch.sdk.wallet'

const blockchain = Blockchain.BCH

export const TatumBchSDK = (args: SDKArguments) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    wallet: bchWallet({ ...args, blockchain }),
    transaction: bchTransactions(),
    blockchain: {
      info: BlockchainBitcoinCashService.bchGetBlockChainInfo,
      broadcast: BlockchainBitcoinCashService.bchBroadcast,
      getBlockHash: BlockchainBitcoinCashService.bchGetBlockHash,
      getBlock: BlockchainBitcoinCashService.bchGetBlock,
      getTxForAccount: BlockchainBitcoinCashService.bchGetTxByAddress,
      getTransaction: BlockchainBitcoinCashService.bchGetRawTransaction,
      send: BlockchainBitcoinCashService.bchTransferBlockchain,
    },
  }
}
