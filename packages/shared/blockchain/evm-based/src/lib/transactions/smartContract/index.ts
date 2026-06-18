import { BroadcastFunction, ChainSmartContractMethodInvocation } from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { AddressTransformer, evmBasedUtils } from '../../evm-based.utils'
import { CallReadSmartContractMethod, Currency } from '@tatumio/api-client'
import { GasPumpChain } from '../../services/evm-based.gas.pump'

export type TransactionConfigWithFeeCurrency = TransactionConfig & { feeCurrency?: string }

export const smartContractWriteMethodInvocation = async ({
  body,
  web3,
  provider,
  chain,
  addressTransformer = (address: string) => address,
  testnet,
}: {
  body: ChainSmartContractMethodInvocation
  web3: EvmBasedWeb3
  provider?: string
  chain?: GasPumpChain
  addressTransformer?: AddressTransformer
  testnet?: boolean
}) => {
  const { fromPrivateKey, fee, params, methodName, methodABI, nonce, amount, signatureId } = body
  const contractAddress = addressTransformer(body.contractAddress?.trim())
  const client = web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract([methodABI])

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    value: amount ? `0x${new BigNumber(client.utils.toWei(amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    gas: chain === Currency.KLAY ? fee?.gasPrice : undefined,
    nonce,
  }
  return await evmBasedUtils.prepareSignedTransactionAbstraction(
    client,
    tx,
    web3,
    signatureId,
    fromPrivateKey,
    fee?.gasLimit,
    fee?.gasPrice,
    provider,
    chain,
    testnet,
  )
}

export const smartContractReadMethodInvocation = async ({
  body,
  web3,
  provider,
  addressTransformer = (address: string) => address,
}: {
  body: CallReadSmartContractMethod
  web3: EvmBasedWeb3
  provider?: string
  addressTransformer?: AddressTransformer
}) => {
  const { params, methodName, methodABI } = body
  const contractAddress = addressTransformer(body.contractAddress?.trim())
  const client = web3.getClient(provider)
  const contract = new client.eth.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

export const smartContract = ({
  web3,
  broadcastFunction,
  smartContractApiMethod,
  addressTransformer = (address: string) => address,
}: {
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
  smartContractApiMethod: any
  addressTransformer?: AddressTransformer // to automatically transform address to blockchain specific (e.g. 0x -> xdc, one)
}) => {
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
        body: ChainSmartContractMethodInvocation,
        provider?: string,
      ) => smartContractWriteMethodInvocation({ body, web3, provider }),
    },
    send: {
      /**
       * Send invoke smart contract transaction to the blockchain.
       * Invoked method only reads from blockchain the data and returns them back.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       */
      smartContractReadMethodInvocationTransaction: async (
        body: CallReadSmartContractMethod,
        provider?: string,
      ) => smartContractReadMethodInvocation({ body, web3, provider, addressTransformer }),

      /**
       * Send invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      smartContractMethodInvocationTransaction: async (
        body: ChainSmartContractMethodInvocation,
        provider?: string,
      ) => {
        if (body.signatureId) {
          return smartContractApiMethod(body)
        } else if (body.methodABI.stateMutability === 'view') {
          return smartContractReadMethodInvocation({ body, web3, provider, addressTransformer })
        } else {
          return broadcastFunction({
            txData: await smartContractWriteMethodInvocation({ body, web3, provider, addressTransformer }),
          })
        }
      },
    },
  }
}
