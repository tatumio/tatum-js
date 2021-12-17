import { buildSmartContractMethodInvocation, ChainSCBody, Currency, listing } from '@tatumio/tatum-core'
import { broadcast } from '../web3'
import Web3 from 'web3'
import { getClient, prepareSmartContractWriteMethodInvocation } from '../transaction'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await broadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return getClient(provider)
}

export const helperPrepareSCCall = async <Body extends ChainSCBody>(
  body: Body,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation({ ...body, chain: Currency.BSC }, params, methodName, abi)
  return await prepareSmartContractWriteMethodInvocation(r, { provider })
}
