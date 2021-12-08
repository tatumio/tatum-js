import { buildSmartContractMethodInvocation, ChainSCBody, Currency, listing } from '@tatumio/tatum-core'
import { prepareClient, prepareSmartContractWriteMethodInvocation } from '../'
import { broadcast } from '../blockchain/polygon'
import Web3 from 'web3'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await broadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return prepareClient(provider)
}

export const helperPrepareSCCall = async <Body extends ChainSCBody>(
  body: Body,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation({ ...body, chain: Currency.MATIC }, params, methodName, abi)
  return await prepareSmartContractWriteMethodInvocation(r, { provider })
}
