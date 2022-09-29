import {
  ChainApproveCustodialTransfer,
  ChainGenerateCustodialWalletBatch,
  ChainSmartContractMethodInvocation,
} from '@tatumio/shared-blockchain-abstract'
import { ListingSmartContract } from '../contracts'
import { smartContractWriteMethodInvocation } from '../transactions/smartContract'
import { CELO_CONSTANTS, EvmBasedWeb3 } from './evm-based.web3'
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

const getFeeCurrency = (feeCurrency?: 'CELO' | 'CUSD' | 'CEUR', testnet?: boolean) => {
  switch (feeCurrency) {
    case Currency.CEUR:
      return testnet ? CELO_CONSTANTS.CEUR_ADDRESS_TESTNET : CELO_CONSTANTS.CEUR_ADDRESS_MAINNET
    case Currency.CUSD:
      return testnet ? CELO_CONSTANTS.CUSD_ADDRESS_TESTNET : CELO_CONSTANTS.CUSD_ADDRESS_MAINNET
    default:
      return testnet ? CELO_CONSTANTS.CELO_ADDRESS_TESTNET : CELO_CONSTANTS.CELO_ADDRESS_MAINNET
  }
}

const buildSmartContractMethodInvocationCelo = <SCBody extends CeloSCBody>(
  body: SCBody,
  params: any[],
  methodName: string,
  abi: any[],
  testnet?: boolean,
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
    feeCurrency: body.feeCurrency ? getFeeCurrency(body.feeCurrency, testnet) : undefined,
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
      const r =
        body.chain == Currency.CELO
          ? buildSmartContractMethodInvocationCelo(body as any, params, methodName, abi, testnet)
          : buildSmartContractMethodInvocation(body, params, methodName, abi)
      return await smartContractWriteMethodInvocation(r, web3, provider, body.chain)
    },
  }
}
