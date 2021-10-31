import { ClassType } from 'class-transformer/ClassTransformer'
import Web3 from 'web3'
import { ethBroadcast } from '../blockchain'
import { Currency, listing, buildSmartContractMethodInvocation } from '@tatumio/tatum-core'
import { getClient, prepareSmartContractWriteMethodInvocation } from '../transaction'

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string) => {
  return await ethBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (testnet: boolean, chain: Currency, provider?: string): Web3 => {
  return getClient(provider)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (
  testnet: boolean,
  body: any,
  clazz: ClassType<object>,
  methodName: string,
  params: any[],
  methodSig?: string,
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
  return await prepareSmartContractWriteMethodInvocation(r, provider)
}
