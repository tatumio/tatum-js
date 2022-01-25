import { EvmBasedBlockchain } from '@tatumio/shared-core';
import { Erc20Token } from '../../contracts';
import { EvmBasedWeb3 } from '../../services/evm-based.web3';

export const erc20 = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    /**
     * Get Decimals for the ERC20 token
     * @param contractAddress address of the token
     * @param provider optional provider
     */
    decimals: async (contractAddress: string, provider?: string) => {
      const web3 = args.web3.getClient(provider)
      // @ts-ignore
      return new web3.eth.Contract(Erc20Token.abi, contractAddress).methods.decimals().call()
    },
  }
}
