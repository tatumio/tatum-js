import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'

export const ethTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    erc20: ethErc20(args),
    //custodial: prepareGenerateCustodialWalletSignedTransaction()
  }
}

export const ethErc20 = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    /**
     * Get Decimals for the ERC20 token
     * @param contractAddress address of the token
     * @param provider optional provider
     */
    decimals: async (contractAddress: string, provider?: string) => {
      const web3 = args.web3.getClient(provider)
      // @ts-ignore
      return new web3.eth.Contract(token_abi, contractAddress).methods.decimals().call()
    },
  }
}

/*

export const ethCustodial = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    prepareGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) => {
  }
}*/
