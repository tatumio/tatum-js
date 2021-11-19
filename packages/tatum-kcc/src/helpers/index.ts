import { buildSmartContractMethodInvocation, listing } from '@tatumio/tatum-core'
import { prepareKccClient, prepareKccSmartContractWriteMethodInvocation } from '../transaction'
import { kccBroadcast } from '../blockchain/kcc'
import Web3 from 'web3'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await kccBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return prepareKccClient(provider)
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
  return await prepareKccSmartContractWriteMethodInvocation(r, provider)
}
