import { tronBroadcast } from '../blockchain'
import { buildSmartContractMethodInvocation, ChainSCBody, Currency, listing } from '@tatumio/tatum-core'
import { prepareTronSmartContractInvocation } from '../transaction'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await tronBroadcast(txData, signatureId)
}

export const helperPrepareSCCall = async <Body extends ChainSCBody>(
  body: Body,
  methodName: string,
  params: any[],
  methodSig?: string,
  provider?: string,
  abi = listing.abi
) => {
  const { feeLimit, from } = body as any
  const r = buildSmartContractMethodInvocation({ ...body, chain: Currency.TRON }, params, methodName, abi)
  r.methodName = methodSig as string
  return await prepareTronSmartContractInvocation(r, feeLimit, from, provider)
}
