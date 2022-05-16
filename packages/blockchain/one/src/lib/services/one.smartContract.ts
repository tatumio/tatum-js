import { HarmonyService } from '@tatumio/api-client'
import { EvmBasedWeb3, smartContract } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { oneUtils } from '../one.utils'

export const oneSmartContract = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
}): ReturnType<typeof smartContract> => {
  const unpatchedSmartContract = smartContract({
    ...args,
    broadcastFunction: HarmonyService.oneBroadcast,
  })

  return {
    prepare: {
      /**
       * Sign invoke smart contract transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param options
       * @param options.provider optional url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      smartContractWriteMethodInvocationTransaction: async (
        ...params: Parameters<
          typeof unpatchedSmartContract.prepare.smartContractWriteMethodInvocationTransaction
        >
      ) =>
        unpatchedSmartContract.prepare.smartContractWriteMethodInvocationTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          },
          params[1],
        ),
    },
    send: {
      /**
       * Send invoke smart contract transaction to the blockchain.
       * Invoked method only reads from blockchain the data and returns them back.
       * @param body content of the transaction to broadcast
       * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
       */
      smartContractReadMethodInvocationTransaction: async (
        ...params: Parameters<typeof unpatchedSmartContract.send.smartContractReadMethodInvocationTransaction>
      ) =>
        unpatchedSmartContract.send.smartContractReadMethodInvocationTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          },
          params[1],
        ),

      /**
       * Send invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      smartContractMethodInvocationTransaction: async (
        ...params: Parameters<typeof unpatchedSmartContract.send.smartContractMethodInvocationTransaction>
      ) =>
        unpatchedSmartContract.send.smartContractMethodInvocationTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          },
          params[1],
        ),
    },
  }
}
