import {
  ChainApproveCustodialTransfer,
  ChainGenerateCustodialWalletBatch,
  ChainSmartContractMethodInvocation,
} from '@tatumio/shared-blockchain-abstract'
import { ListingSmartContract } from '../contracts'
import { smartContractWriteMethodInvocation } from '../transactions/smartContract'
import { EvmBasedWeb3 } from './evm-based.web3'
import { Currency, GenerateCustodialWalletBatchCelo } from '@tatumio/api-client'

type CallSCBody =
  | (ChainApproveCustodialTransfer & { contractAddress: string }) // added in abstraction
  | (ChainGenerateCustodialWalletBatch & { contractAddress: string }) // added in abstraction

type CeloSCBody = Omit<GenerateCustodialWalletBatchCelo, 'batchCount'> & {
  index?: number
  contractAddress: string
  signatureId?: string
  amount?: string
}

const buildSmartContractMethodInvocation = <
  SCBody extends Omit<ChainSmartContractMethodInvocation, 'params' | 'methodName' | 'methodABI'>,
>(
  body: SCBody,
  params: any[],
  methodName: string,
  abi: any[],
) => {
  return {
    fee: body.fee,
    nonce: body.nonce,
    fromPrivateKey: body.fromPrivateKey,
    signatureId: body.signatureId,
    index: body.index,
    amount: body.amount,
    contractAddress: body.contractAddress,
    methodName: methodName,
    params: params,
    methodABI: abi.find((a) => a.name === methodName),
  }
}

export const evmBasedSmartContract = (web3: EvmBasedWeb3) => {
  return {
    helperPrepareSCCall: async <Body extends CallSCBody>(
      body: Body,
      methodName: string,
      params: any[],
      provider?: string,
      abi: any[] = ListingSmartContract.abi,
      testnet?: boolean,
    ) => {
      const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
      return await smartContractWriteMethodInvocation({ body: r, web3, provider, chain: body.chain, testnet })
    },
  }
}
