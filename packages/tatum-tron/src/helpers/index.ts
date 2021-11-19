import { tronBroadcast } from '../blockchain'
import { buildSmartContractMethodInvocation, listing } from '@tatumio/tatum-core'
import { prepareTronSmartContractInvocation } from '../transaction'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await tronBroadcast(txData, signatureId)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (
  body: any,
  methodName: string,
  params: any[],
  methodSig?: string,
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
  r.methodName = methodSig as string
  return await prepareTronSmartContractInvocation(body, body.feeLimit, body.from, provider)
}
