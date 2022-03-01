import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { BlockchainAlgorandAlgoService, BlockchainFungibleTokenService } from '@tatumio/api-client'
import { algoWeb } from './services/algo.web'
import { algoRecord } from './services/algo.record'
import { algoWallet } from './services/algo.wallet'
import { algoTx } from './services/algo.tx'

const blockchain = Blockchain.ALGO

export const TatumAlgoSDK = (args: SDKArguments) => {
  const web = algoWeb()
  const txService = algoTx({ algoWeb: web })
  const { nft, ...abstractSdk } = abstractBlockchainSdk({ ...args, blockchain })

  const { transferNFT, burnNFT, getNFTTransactionsByAddress } = nft;

  return {
    ...abstractSdk,
    algoWeb: web,
    record: algoRecord(),
    wallet: algoWallet(),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: BlockchainFungibleTokenService.erc20GetTransactionByAddress,
      getErc20AccountBalance: BlockchainFungibleTokenService.erc20GetBalance,
    },
    nft: {
      ...txService.erc721,
      transferNFT,
      burnNFT,
      getNFTTransactionsByAddress,
    },
    blockchain: {
      broadcast: BlockchainAlgorandAlgoService.algoandBroadcast,
      getBlock: BlockchainAlgorandAlgoService.algorandGetBlock,
      getCurrentBlock: BlockchainAlgorandAlgoService.algorandGetCurrentBlock,
      getBlockchainAccountBalance: BlockchainAlgorandAlgoService.algorandGetBalance,
      getTransaction: BlockchainAlgorandAlgoService.algorandGetTransaction,
      getPayTransactionByFromTo: BlockchainAlgorandAlgoService.algorandGetPayTransactionsByFromTo,
    },
    node: {
      indexerGetDriver: BlockchainAlgorandAlgoService.algoNodeIndexerGetDriver,
      getDriver: BlockchainAlgorandAlgoService.algoNodeGetDriver,
      postDriver: BlockchainAlgorandAlgoService.algoNodePostDriver,
    },
  }
}
