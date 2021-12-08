import { buildSmartContractMethodInvocation, Currency, listing, CeloSmartContractMethodInvocation, ChainSCBody } from '@tatumio/tatum-core'
import { getCeloClient, prepareCeloSmartContractWriteMethodInvocation } from '../transaction'
import { celoBroadcast } from '../blockchain'
import Web3 from 'web3'

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
  return await celoBroadcast(txData, signatureId)
}

export const helperGetWeb3Client = (provider?: string): Web3 => {
  return getCeloClient(provider)
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
  return await prepareCeloSmartContractWriteMethodInvocation(
    { ...r, feeCurrency: body.feeCurrency || Currency.CELO },
    {
      provider,
      testnet,
    }
  )
}
