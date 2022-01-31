import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/abstract-sdk'
import { btcBasedSdk, btcBasedWallet } from '@tatumio/shared-blockchain-btc-based'
import { BlockchainScryptaService } from '@tatumio/api-client'
import { scryptaTransactions } from './scrypta.sdk.tx'

const blockchain = Blockchain.SCRYPTA

export const TatumScryptaSDK = (args: SDKArguments) => {
  return {
    ...btcBasedSdk({ ...args, blockchain }),
    wallet: btcBasedWallet({ ...args, blockchain }),
    transaction: scryptaTransactions(),
    blockchain: {
      info: BlockchainScryptaService.getScryptaBlockchainInformation,
      broadcast: BlockchainScryptaService.broadcastsignedScryptatransaction,
      getBlock: BlockchainScryptaService.getScryptaBlockbyhashorheight,
      getBlockHash: BlockchainScryptaService.getScryptaBlockhash,
      getUTXO: BlockchainScryptaService.getScryptaUtxOofTransaction,
      getTransactionsByAddress: BlockchainScryptaService.getScryptaTransactionsbyaddress,
      getUTXOForAccount: BlockchainScryptaService.getScryptaspendableUtxo,
      getTransaction: BlockchainScryptaService.getScryptaTransactionbyhash,
      sendTransaction: BlockchainScryptaService.sendLyrAtoblockchainaddresses,
    },
  }
}
