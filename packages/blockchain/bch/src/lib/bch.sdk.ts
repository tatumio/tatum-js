import { Blockchain } from '@tatumio/shared-core'
import { btcBasedSdk } from '@tatumio/shared-blockchain-btc-based'
import { BitcoinCashService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { bchTransactions } from './bch.sdk.tx'
import { bchWallet } from './bch.sdk.wallet'

const blockchain = Blockchain.BCH

export const TatumBchSDK = (args: SDKArguments) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    wallet: bchWallet(),
    transaction: bchTransactions(),
    blockchain: {
      info: BitcoinCashService.bchGetBlockChainInfo,
      broadcast: BitcoinCashService.bchBroadcast,
      getBlockHash: BitcoinCashService.bchGetBlockHash,
      getBlock: BitcoinCashService.bchGetBlock,
      getTxForAccount: BitcoinCashService.bchGetTxByAddress,
      getTransaction: BitcoinCashService.bchGetRawTransaction,
      send: BitcoinCashService.bchTransferBlockchain,
    },
  }
}
