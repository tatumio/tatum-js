import { buildSmartContractMethodInvocation, ChainSCBody, Currency, listing } from '@tatumio/tatum-core'
import { prepareKccClient, prepareKccSmartContractWriteMethodInvocation } from '../transaction'
import { kccBroadcast } from '../blockchain/kcc'
import Web3 from 'web3'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await kccBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return prepareKccClient(provider)
}

export const helperPrepareSCCall = async <Body extends ChainSCBody>(
  body: Body,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation({ ...body, chain: Currency.KCS }, params, methodName, abi)
  return await prepareKccSmartContractWriteMethodInvocation(r, { provider })
}
