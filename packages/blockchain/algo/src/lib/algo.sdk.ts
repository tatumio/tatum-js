import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { AlgorandService, FungibleTokensErc20OrCompatibleService } from '@tatumio/api-client'
import { algoWeb } from './services/algo.web'
import { algoRecord } from './services/algo.record'
import { algoWallet } from './services/algo.wallet'
import { algoTx } from './services/algo.tx'

const blockchain = Blockchain.ALGO

export const TatumAlgoSDK = (args: SDKArguments) => {
  const web = algoWeb()
  const txService = algoTx({ algoWeb: web })
  const { nft, ...abstractSdk } = abstractBlockchainSdk({ ...args, blockchain })

  const { mintNFT, transferNFT, burnNFT, getNFTAccountBalance } = nft

  return {
    ...abstractSdk,
    algoWeb: web,
    record: algoRecord(),
    wallet: algoWallet(),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: FungibleTokensErc20OrCompatibleService.erc20GetTransactionByAddress,
      getErc20AccountBalance: FungibleTokensErc20OrCompatibleService.erc20GetBalance,
      getErc20AccountBalances: FungibleTokensErc20OrCompatibleService.erc20GetBalanceAddress,
    },
    nft: {
      ...txService.erc721,
      mintNFT,
      transferNFT,
      burnNFT,
      getNFTAccountBalance,
    },
    blockchain: {
      broadcast: AlgorandService.algorandBroadcast,
      getBlock: AlgorandService.algorandGetBlock,
      getCurrentBlock: AlgorandService.algorandGetCurrentBlock,
      getBlockchainAccountBalance: AlgorandService.algorandGetBalance,
      getTransaction: AlgorandService.algorandGetTransaction,
      getPayTransactionByFromTo: AlgorandService.algorandGetPayTransactionsByFromTo,
      receiveAsset: AlgorandService.algorandBlockchainReceiveAsset,
    },
    node: {
      indexerGetDriver: AlgorandService.algoNodeIndexerGetDriver,
      getDriver: AlgorandService.algoNodeGetDriver,
      postDriver: AlgorandService.algoNodePostDriver,
    },
  }
}
