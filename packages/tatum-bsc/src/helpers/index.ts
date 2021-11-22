import { buildSmartContractMethodInvocation, listing } from '@tatumio/tatum-core'
import { bscBroadcast } from '../blockchain'
import Web3 from 'web3'
import { getBscClient, prepareBscSmartContractWriteMethodInvocation } from '../transaction'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await bscBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return getBscClient(provider)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (body: any, methodName: string, params: any[], provider?: string, abi: any[] = listing.abi) => {
  const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
  return await prepareBscSmartContractWriteMethodInvocation(r, provider)
}
