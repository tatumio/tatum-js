import { buildSmartContractMethodInvocation, ChainSCBody, Currency, listing } from '@tatumio/tatum-core'
import { prepareKcsClient, prepareKcsSmartContractWriteMethodInvocation } from '../transaction'
import { kcsBroadcast } from '../blockchain/kcs'
import Web3 from 'web3'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await kcsBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return prepareKcsClient(provider)
}

export const helperPrepareSCCall = async <Body extends ChainSCBody>(
  body: Body,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation({ ...body, chain: Currency.KCS }, params, methodName, abi)
  return await prepareKcsSmartContractWriteMethodInvocation(r, { provider })
}
