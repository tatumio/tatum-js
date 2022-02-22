import { BlockchainHarmonyOneService } from '@tatumio/api-client'
import { EvmBasedWeb3, native } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { oneUtils } from '../one.utils'

export const oneNative = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
}): ReturnType<typeof native> => {
  const unpatchedNative = native({
    ...args,
    broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
  })

  return {
    prepare: {
      /**
       * Sign transfer of native asset transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: (
        ...params: Parameters<typeof unpatchedNative.prepare.transferSignedTransaction>
      ) =>
        unpatchedNative.prepare.transferSignedTransaction(
          {
            ...params[0],
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
    },
    send: {
      /**
       * Send transfer of native asset transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (
        ...params: Parameters<typeof unpatchedNative.send.transferSignedTransaction>
      ) =>
        unpatchedNative.send.transferSignedTransaction(
          {
            ...params[0],
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
    },
  }
}
