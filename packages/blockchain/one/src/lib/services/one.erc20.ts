import { HarmonyService } from '@tatumio/api-client'
import { erc20, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { oneUtils } from '../one.utils'

export const oneErc20 = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
}): ReturnType<typeof erc20> => {
  const unpatchedErc20 = erc20({
    ...args,
    broadcastFunction: HarmonyService.oneBroadcast,
  })

  return {
    decimals: (...params: Parameters<typeof unpatchedErc20.decimals>) =>
      unpatchedErc20.decimals(oneUtils.transformAddress(params[0]), params[1]),
    prepare: {
      /**
       * Sign deploy erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deploySignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc20.prepare.deploySignedTransaction>
      ) =>
        unpatchedErc20.prepare.deploySignedTransaction(
          {
            ...params[0],
            address: oneUtils.transformAddress(params[0].address),
          },
          params[1],
        ),
      /**
       * Sign transfer erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc20.prepare.transferSignedTransaction>
      ) =>
        unpatchedErc20.prepare.transferSignedTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       * Sign mint erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc20.prepare.mintSignedTransaction>
      ) =>
        unpatchedErc20.prepare.mintSignedTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       * Sign burn erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc20.prepare.burnSignedTransaction>
      ) =>
        unpatchedErc20.prepare.burnSignedTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          },
          params[1],
        ),
      /**
       * Prepare approve ERC20 signed transaction.
       * @param body body of the approve operation
       * @param provider optional Web3 provider
       */
      approveSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc20.prepare.approveSignedTransaction>
      ) =>
        unpatchedErc20.prepare.approveSignedTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            spender: oneUtils.transformAddress(params[0].spender),
          },
          params[1],
        ),
    },
    send: {
      /**
       * Send deploy erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc20.send.deploySignedTransaction>
      ) =>
        unpatchedErc20.send.deploySignedTransaction(
          {
            ...params[0],
            address: oneUtils.transformAddress(params[0].address),
          },
          params[1],
        ),
      /**
       * Send transfer erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc20.send.transferSignedTransaction>
      ) =>
        unpatchedErc20.send.transferSignedTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       * Send mint erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc20.send.mintSignedTransaction>
      ) =>
        unpatchedErc20.send.mintSignedTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       * Send burn erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc20.send.burnSignedTransaction>
      ) =>
        unpatchedErc20.send.burnSignedTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          },
          params[1],
        ),
    },
  }
}
