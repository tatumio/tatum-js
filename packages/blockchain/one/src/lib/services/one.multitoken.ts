import { BlockchainHarmonyOneService } from '@tatumio/api-client'
import { EvmBasedWeb3, multiToken } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { oneUtils } from '../one.utils'

export const oneMultiToken = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
}): ReturnType<typeof multiToken> => {
  const unpatchedMultiToken = multiToken({
    ...args,
    broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
  })

  return {
    prepare: {
      /**
       * Sign mint MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultiTokenTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.prepare.mintMultiTokenTransaction>
      ) =>
        unpatchedMultiToken.prepare.mintMultiTokenTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       * Sign mint MultiToken batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultiTokenBatchTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.prepare.mintMultiTokenBatchTransaction>
      ) =>
        unpatchedMultiToken.prepare.mintMultiTokenBatchTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: params[0].to.map((t) => oneUtils.transformAddress(t)),
          },
          params[1],
        ),
      /**
       * Send MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.prepare.transferMultiTokenTransaction>
      ) =>
        unpatchedMultiToken.prepare.transferMultiTokenTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       * Send MultiToken batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenBatchTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.prepare.transferMultiTokenBatchTransaction>
      ) =>
        unpatchedMultiToken.prepare.transferMultiTokenBatchTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       * Sign deploy MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deployMultiTokenTransaction: unpatchedMultiToken.prepare.deployMultiTokenTransaction,
      /**
       * Sign burn MultiToken transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.prepare.burnMultiTokenTransaction>
      ) =>
        unpatchedMultiToken.prepare.burnMultiTokenTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            account: oneUtils.transformAddress(params[0].account),
          },
          params[1],
        ),
      /**
       * Sign burn MultiToken batch transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenBatchTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.prepare.burnMultiTokenBatchTransaction>
      ) =>
        unpatchedMultiToken.prepare.burnMultiTokenBatchTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            account: oneUtils.transformAddress(params[0].account),
          },
          params[1],
        ),
    },
    send: {
      /**
       * Send MultiToken mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultiTokenTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.send.mintMultiTokenTransaction>
      ) =>
        unpatchedMultiToken.send.mintMultiTokenTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       * Send MultiToken mint batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultiTokenBatchTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.send.mintMultiTokenBatchTransaction>
      ) =>
        unpatchedMultiToken.send.mintMultiTokenBatchTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: params[0].to.map((t) => oneUtils.transformAddress(t)),
          },
          params[1],
        ),
      /**
       * Send MultiToken transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.send.transferMultiTokenTransaction>
      ) =>
        unpatchedMultiToken.send.transferMultiTokenTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       * Send MultiToken batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferMultiTokenBatchTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.send.transferMultiTokenBatchTransaction>
      ) =>
        unpatchedMultiToken.send.transferMultiTokenBatchTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            to: oneUtils.transformAddress(params[0].to),
          },
          params[1],
        ),
      /**
       ** Send MultiToken deploy transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deployMultiTokenTransaction: unpatchedMultiToken.send.deployMultiTokenTransaction,
      /**
       * Send MultiToken butn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.send.burnMultiTokenTransaction>
      ) =>
        unpatchedMultiToken.send.burnMultiTokenTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            account: oneUtils.transformAddress(params[0].account),
          },
          params[1],
        ),

      /**
       * Send MultiToken butn batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnMultiTokenBatchTransaction: async (
        ...params: Parameters<typeof unpatchedMultiToken.send.burnMultiTokenBatchTransaction>
      ) =>
        unpatchedMultiToken.send.burnMultiTokenBatchTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            account: oneUtils.transformAddress(params[0].account),
          },
          params[1],
        ),
    },
  }
}
