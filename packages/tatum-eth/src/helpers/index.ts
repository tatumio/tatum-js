import Web3 from 'web3'
import { ethBroadcast } from '../blockchain'
import { listing, buildSmartContractMethodInvocation } from '@tatumio/tatum-core'
import { getClient, prepareSmartContractWriteMethodInvocation } from '../transaction'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await ethBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return getClient(provider)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (
  body: any,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
  return await prepareSmartContractWriteMethodInvocation(r, provider)
}
