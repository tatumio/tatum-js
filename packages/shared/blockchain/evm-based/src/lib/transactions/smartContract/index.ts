import { BroadcastFunction, ChainSmartContractMethodInvocation } from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'
import { TransactionConfig } from 'web3-core'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedUtils } from '../../evm-based.utils'
import { CallReadSmartContractMethod, Currency } from '@tatumio/api-client'
import { GasPumpChain } from '../../services/evm-based.gas.pump'

export type TransactionConfigWithFeeCurrency = TransactionConfig & { feeCurrency?: string }

export const smartContractWriteMethodInvocation = async (
  body: ChainSmartContractMethodInvocation,
  web3: EvmBasedWeb3,
  provider?: string,
  chain?: GasPumpChain,
) => {
  const { fromPrivateKey, fee, params, methodName, methodABI, contractAddress, nonce, amount, signatureId } =
    body
  const client = web3.getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract([methodABI])

  const tx: TransactionConfigWithFeeCurrency = {
    from: 0,
    to: contractAddress.trim(),
    feeCurrency: chain === Currency.CELO ? body.feeCurrency : undefined,
    value: amount ? `0x${new BigNumber(client.utils.toWei(amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    gas: chain === Currency.KLAY ? fee?.gasPrice : undefined,
    nonce,
  }
  return chain === Currency.CELO
    ? await evmBasedUtils.prepareSignedTransactionAbstractionCelo(
        client,
        tx,
        web3,
        signatureId,
        fromPrivateKey,
        fee?.gasLimit,
        fee?.gasPrice,
        provider,
      )
    : await evmBasedUtils.prepareSignedTransactionAbstraction(
        client,
        tx,
        web3,
        signatureId,
        fromPrivateKey,
        fee?.gasLimit,
        fee?.gasPrice,
        provider,
      )
}

export const smartContractReadMethodInvocation = async (
  body: CallReadSmartContractMethod,
  web3: EvmBasedWeb3,
  provider?: string,
) => {
  const { params, methodName, methodABI, contractAddress } = body
  const client = web3.getClient(provider)
  const contract = new client.eth.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

export const smartContract = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
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
      ) => smartContractWriteMethodInvocation(body, args.web3, provider),
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
      ) => smartContractReadMethodInvocation(body, args.web3, provider),

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
        if (body.methodABI.stateMutability === 'view') {
          return smartContractReadMethodInvocation(body, args.web3, provider)
        } else {
          return args.broadcastFunction({
            txData: await smartContractWriteMethodInvocation(body, args.web3, provider),
            signatureId: body.signatureId,
          })
        }
      },
    },
  }
}
