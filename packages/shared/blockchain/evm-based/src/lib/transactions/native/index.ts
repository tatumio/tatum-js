import { BroadcastFunction, ChainTransferNative } from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { TransactionConfig } from 'web3-core'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedUtils } from '../../evm-based.utils'

const transferSignedTransaction = async (
  body: ChainTransferNative,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  // TODO
  // await validateBody(body, ChainTransferNative)

  const client = web3.getClient(provider, body.fromPrivateKey)

  const tx: TransactionConfig = {
    from: 0,
    to: body.to,
    data: body.data,
    value: evmBasedUtils.transformToWei(body.amount),
    gas: (body.data?.length || 0) * 68 + 21000,
    nonce: body.nonce,
  }

  return evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    body.signatureId,
    body.fromPrivateKey,
    body.fee?.gasLimit,
    body.fee?.gasPrice,
    provider,
  )
}

export const native = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      /**
       * Sign transfer of native asset transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferSignedTransaction: async (body: ChainTransferNative, provider?: string) =>
        transferSignedTransaction(body, args.web3, provider),
    },
    send: {
      /**
       * Send transfer of native asset transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (body: ChainTransferNative, provider?: string) =>
        args.broadcastFunction({
          txData: await transferSignedTransaction(body, args.web3, provider),
          signatureId: body.signatureId,
        }),
    },
  }
}
