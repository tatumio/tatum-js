import { BroadcastFunction, ChainTransferNative } from '@tatumio/shared-blockchain-abstract'
import { TransactionConfig } from 'web3-core'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { AddressTransformer, AddressTransformerDefault, evmBasedUtils } from '../../evm-based.utils'

const transferSignedTransaction = async ({
  body,
  web3,
  provider,
  addressTransformer,
}: {
  body: ChainTransferNative
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer: AddressTransformer
}) => {
  // TODO
  // await validateBody(body, ChainTransferNative)

  const client = web3.getClient(provider, body.fromPrivateKey)
  const to = addressTransformer(body.to.trim())

  const tx: TransactionConfig = {
    from: 0,
    to: to,
    data: body.data,
    value: evmBasedUtils.transformToWei(body.amount),
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

export const native = ({
  web3,
  broadcastFunction,
  transferApiMethod,
  addressTransformer = AddressTransformerDefault,
}: {
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
  transferApiMethod: any
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
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
        transferSignedTransaction({ body, web3, provider, addressTransformer }),
    },
    send: {
      /**
       * Send transfer of native asset transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferSignedTransaction: async (body: ChainTransferNative, provider?: string) => {
        if (body.signatureId) {
          return transferApiMethod(body)
        } else {
          return broadcastFunction({
            txData: await transferSignedTransaction({ body, web3, provider, addressTransformer }),
          })
        }
      },
    },
  }
}
