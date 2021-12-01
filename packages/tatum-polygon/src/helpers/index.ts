import { buildSmartContractMethodInvocation, listing, SCBody } from '@tatumio/tatum-core'
import { preparePolygonClient, preparePolygonSmartContractWriteMethodInvocation } from '../'
import { polygonBroadcast } from '../blockchain/polygon'
import Web3 from 'web3'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await polygonBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return preparePolygonClient(provider)
}

export const helperPrepareSCCall = async <Body extends SCBody>(
  body: Body,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
  return await preparePolygonSmartContractWriteMethodInvocation(r, { provider })
}
