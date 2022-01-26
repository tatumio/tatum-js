import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { erc20, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'

export const ethTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    erc20: ethErc20(args),
    // ...ethErc20(args),
    //custodial: prepareGenerateCustodialWalletSignedTransaction()
  }
}


export const ethErc20 = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
  }
}

/*

export const ethCustodial = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    prepareGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) => {
  }
}*/
