import { tronBroadcast } from '../blockchain'
import { buildSmartContractMethodInvocation, listing, SCBody } from '@tatumio/tatum-core'
import { prepareTronSmartContractInvocation } from '../transaction'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await tronBroadcast(txData, signatureId)
}

export const helperPrepareSCCall = async <Body extends SCBody>(
  body: Body,
  methodName: string,
  params: any[],
  methodSig?: string,
  provider?: string,
  abi = listing.abi
) => {
  const { feeLimit, from } = body as { feeLimit: number; from: string }
  const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
  r.methodName = methodSig as string
  return await prepareTronSmartContractInvocation(r, feeLimit, from, provider)
}
