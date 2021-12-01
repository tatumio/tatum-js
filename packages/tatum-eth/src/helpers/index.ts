import Web3 from 'web3'
import { ethBroadcast } from '../blockchain'
import { listing, buildSmartContractMethodInvocation, SCBody } from '@tatumio/tatum-core'
import { getClient, prepareSmartContractWriteMethodInvocation } from '../transaction'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await ethBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return getClient(provider)
}

export const helperPrepareSCCall = async <Body extends SCBody>(
  body: Body,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
  return await prepareSmartContractWriteMethodInvocation(r, { provider })
}
