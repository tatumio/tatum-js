import { tronBroadcast } from '../blockchain'
import { ClassType } from 'class-transformer/ClassTransformer'
import { buildSmartContractMethodInvocation, Currency, listing } from '@tatumio/tatum-core'
import { prepareTronSmartContractInvocation } from '../transaction'

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string) => {
  return await tronBroadcast(txData, signatureId)
}

// TODO should be used anywhere?
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
  r.methodName = methodSig as string
  return await prepareTronSmartContractInvocation(testnet, r, body.feeLimit, body.from, provider)
}
