import { buildSmartContractMethodInvocation, Currency, listing, CeloSmartContractMethodInvocation, ChainSCBody } from '@tatumio/tatum-core'
import { getClient, prepareSmartContractWriteMethodInvocation } from '../transaction'
import { broadcast } from '../blockchain'
import Web3 from 'web3'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await broadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return getClient(provider)
}

export const helperPrepareSCCall = async <Body extends ChainSCBody>(
  testnet: boolean,
  body: Body,
  methodName: string,
  params: any[],
  provider?: string,
  abi: any[] = listing.abi
) => {
  const r = buildSmartContractMethodInvocation(
    { ...body, chain: Currency.CELO },
    params,
    methodName,
    abi,
    new CeloSmartContractMethodInvocation()
  )
  return await prepareSmartContractWriteMethodInvocation(
    { ...r, feeCurrency: body.feeCurrency || Currency.CELO },
    {
      provider,
      testnet,
    }
  )
}
