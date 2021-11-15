import { buildSmartContractMethodInvocation, listing } from '@tatumio/tatum-core'
import { oneBroadcast } from 'src'
import Web3 from 'web3'
import { prepareOneClient, prepareOneSmartContractWriteMethodInvocation } from '../transaction'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await oneBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return prepareOneClient(provider)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (
  testnet: boolean,
  body: any,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
  return await prepareOneSmartContractWriteMethodInvocation(r, provider)
}
