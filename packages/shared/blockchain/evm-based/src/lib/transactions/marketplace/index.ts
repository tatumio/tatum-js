import { ApproveErc20 } from '@tatumio/api-client'
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { erc20 } from '../erc20'
import { listing } from './listings'

export const marketplace = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      /**
       * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveErc20Spending: async (body: ApproveErc20, provider?: string) =>
        erc20(args).prepare.approveSignedTransaction(body, args.web3, provider),
    },
    send: {
      /**
       * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveErc20Spending: async (body: ApproveErc20, provider?: string) =>
        args.broadcastFunction({
          txData: await erc20(args).prepare.approveSignedTransaction(body, args.web3, provider),
        }),
    },
    listing,
  }
}
