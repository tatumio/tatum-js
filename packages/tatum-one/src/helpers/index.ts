import { buildSmartContractMethodInvocation, listing, SCBody } from '@tatumio/tatum-core'
import { oneBroadcast } from '../'
import Web3 from 'web3'
import { prepareOneClient, prepareOneSmartContractWriteMethodInvocation } from '../transaction'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await oneBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return prepareOneClient(provider)
}

export const helperPrepareSCCall = async <Body extends SCBody>(
  body: Body,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
  return await prepareOneSmartContractWriteMethodInvocation(r, { provider })
}
