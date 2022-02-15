import { EvmBasedBlockchain } from '@tatumio/shared-core'
import {
  custodial,
  erc20,
  erc721,
  EvmBasedWeb3,
  multiToken,
  smartContract,
} from '@tatumio/shared-blockchain-evm-based'
import { BlockchainEthereumService } from '@tatumio/api-client'

export const ethTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BlockchainEthereumService.ethBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BlockchainEthereumService.ethBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: BlockchainEthereumService.ethBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: BlockchainEthereumService.ethBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: BlockchainEthereumService.ethBroadcast,
      }),
    },
    //custodial: prepareGenerateCustodialWalletSignedTransaction()
  }
}

/*

export const ethCustodial = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    prepareGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) => {
  }
}*/
