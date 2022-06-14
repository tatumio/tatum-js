import { HarmonyService } from '@tatumio/api-client'
import { erc721, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { oneUtils } from '../one.utils'

export const oneErc721 = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
}): ReturnType<typeof erc721> => {
  const unpatchedErc721 = erc721({
    ...args,
    broadcastFunction: HarmonyService.oneBroadcast,
  })

  return {
    prepare: {
      /**
       * Sign mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.mintSignedTransaction>
      ) =>
        unpatchedErc721.prepare.mintSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          to: oneUtils.transformAddress(params[0].to),
        }),
      /**
       * Sign mint ERC 721 transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintCashbackSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.mintCashbackSignedTransaction>
      ) =>
        unpatchedErc721.prepare.mintCashbackSignedTransaction({
          ...params[0],
          ...(params[0].contractAddress && {
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          }),
          to: oneUtils.transformAddress(params[0].to),
          ...(params[0].authorAddresses && {
            authorAddresses: params[0].authorAddresses.map((a) => oneUtils.transformAddress(a)),
          }),
          ...(params[0].erc20 && { erc20: oneUtils.transformAddress(params[0].erc20) }),
        }),
      /**
       * Sign mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultipleCashbackSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.mintMultipleCashbackSignedTransaction>
      ) =>
        unpatchedErc721.prepare.mintMultipleCashbackSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          to: params[0].to.map((t) => oneUtils.transformAddress(t)),
        }),
      /**
       * Sign mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultipleSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.mintMultipleSignedTransaction>
      ) =>
        unpatchedErc721.prepare.mintMultipleSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          to: params[0].to.map((t) => oneUtils.transformAddress(t)),
          ...(params[0].erc20 && { erc20: oneUtils.transformAddress(params[0].erc20) }),
        }),
      /**
       * Sign burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      burnSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.burnSignedTransaction>
      ) =>
        unpatchedErc721.prepare.burnSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
        }),
      /**
       * Sign transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.transferSignedTransaction>
      ) =>
        unpatchedErc721.prepare.transferSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          to: oneUtils.transformAddress(params[0].to),
        }),
      /**
       * Sign update cashback ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      updateCashbackForAuthorSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.updateCashbackForAuthorSignedTransaction>
      ) =>
        unpatchedErc721.prepare.updateCashbackForAuthorSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
        }),
      /**
       * Sign deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deploySignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.deploySignedTransaction>
      ) =>
        unpatchedErc721.prepare.deploySignedTransaction({
          ...params[0],
        }),
      /**
       * Sign mint ERC 721 provenance transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintProvenanceSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.mintProvenanceSignedTransaction>
      ) =>
        unpatchedErc721.prepare.mintProvenanceSignedTransaction({
          ...params[0],
          to: oneUtils.transformAddress(params[0].to),
          ...(params[0].authorAddresses && {
            authorAddresses: params[0].authorAddresses.map((a) => oneUtils.transformAddress(a)),
          }),
          ...(params[0].erc20 && { erc20: oneUtils.transformAddress(params[0].erc20) }),
          ...(params[0].contractAddress && {
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          }),
        }),
      /**
       * Sign mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      mintMultipleProvenanceSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.prepare.mintMultipleProvenanceSignedTransaction>
      ) =>
        unpatchedErc721.prepare.mintMultipleProvenanceSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          ...(params[0].erc20 && { erc20: oneUtils.transformAddress(params[0].erc20) }),
        }),
    },
    send: {
      /**
       * Send BEP721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.mintSignedTransaction>
      ) =>
        unpatchedErc721.send.mintSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          to: oneUtils.transformAddress(params[0].to),
        }),
      /**
       * Send BEP721 mint transaction to the blockchain with cashback details. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintCashbackSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.mintCashbackSignedTransaction>
      ) =>
        unpatchedErc721.send.mintCashbackSignedTransaction({
          ...params[0],
          ...(params[0].contractAddress && {
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          }),
          to: oneUtils.transformAddress(params[0].to),
          ...(params[0].authorAddresses && {
            authorAddresses: params[0].authorAddresses.map((a) => oneUtils.transformAddress(a)),
          }),
          ...(params[0].erc20 && { erc20: oneUtils.transformAddress(params[0].erc20) }),
        }),
      /**
       * Send BEP721 mint multiple transaction with cashback to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleCashbackSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.mintMultipleCashbackSignedTransaction>
      ) =>
        unpatchedErc721.send.mintMultipleCashbackSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          to: params[0].to.map((t) => oneUtils.transformAddress(t)),
        }),
      /**
       * Send BEP721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.mintMultipleSignedTransaction>
      ) =>
        unpatchedErc721.send.mintMultipleSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          to: params[0].to.map((t) => oneUtils.transformAddress(t)),
          ...(params[0].erc20 && { erc20: oneUtils.transformAddress(params[0].erc20) }),
        }),
      /**
       * Send BEP721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the  Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      burnSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.burnSignedTransaction>
      ) =>
        unpatchedErc721.send.burnSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
        }),
      /**
       * Send BEP721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.transferSignedTransaction>
      ) =>
        unpatchedErc721.send.transferSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          to: oneUtils.transformAddress(params[0].to),
        }),
      /**
       * Send BEP721 update cashback to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      updateCashbackForAuthorSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.updateCashbackForAuthorSignedTransaction>
      ) =>
        unpatchedErc721.send.updateCashbackForAuthorSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
        }),
      /**
       * Send BEP721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploySignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.deploySignedTransaction>
      ) =>
        unpatchedErc721.send.deploySignedTransaction({
          ...params[0],
        }),
      /**
       * Send BEP721 mint provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintProvenanceSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.mintProvenanceSignedTransaction>
      ) =>
        unpatchedErc721.send.mintProvenanceSignedTransaction({
          ...params[0],
          to: oneUtils.transformAddress(params[0].to),
          ...(params[0].authorAddresses && {
            authorAddresses: params[0].authorAddresses.map((a) => oneUtils.transformAddress(a)),
          }),
          ...(params[0].erc20 && { erc20: oneUtils.transformAddress(params[0].erc20) }),
          ...(params[0].contractAddress && {
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          }),
        }),
      /**
       * Send BEP721 mint multiple provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      mintMultipleProvenanceSignedTransaction: async (
        ...params: Parameters<typeof unpatchedErc721.send.mintMultipleProvenanceSignedTransaction>
      ) =>
        unpatchedErc721.send.mintMultipleProvenanceSignedTransaction({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          ...(params[0].erc20 && { erc20: oneUtils.transformAddress(params[0].erc20) }),
        }),
    },
  }
}
