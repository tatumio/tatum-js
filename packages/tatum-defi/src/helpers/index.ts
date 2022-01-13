import { Currency, listing, SCBody, TransactionHash } from '@tatumio/tatum-core'
import {
  helperBroadcastTx as celoBroadcast,
  helperGetWeb3Client as getCeloClient,
  helperPrepareSCCall as celoHelperPrepareSCCall,
} from '@tatumio/tatum-celo'
import {
  helperBroadcastTx as oneBroadcast,
  helperGetWeb3Client as prepareOneClient,
  helperPrepareSCCall as oneHelperPrepareSCCall,
} from '@tatumio/tatum-one'
import {
  helperBroadcastTx as ethBroadcast,
  helperGetWeb3Client as getClient,
  helperPrepareSCCall as ethHelperPrepareSCCall,
} from '@tatumio/tatum-eth'
import {
  helperBroadcastTx as bscBroadcast,
  helperGetWeb3Client as getBscClient,
  helperPrepareSCCall as bscHelperPrepareSCCall,
} from '@tatumio/tatum-bsc'
import {
  helperBroadcastTx as polygonBroadcast,
  helperGetWeb3Client as preparePolygonClient,
  helperPrepareSCCall as polygonHelperPrepareSCCall,
} from '@tatumio/tatum-polygon'
import { helperBroadcastTx as tronBroadcast, helperPrepareSCCall as tronHelperPrepareSCCall } from '@tatumio/tatum-tron'
import {
  helperBroadcastTx as kcsBroadcast,
  helperGetWeb3Client as prepareKcsClient,
  helperPrepareSCCall as kcsHelperPrepareSCCall,
} from '@tatumio/tatum-kcs'
import { getClient as getXdcClient } from '@tatumio/tatum-xdc'
import Web3 from 'web3'

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string): Promise<TransactionHash> => {
  switch (chain) {
    case Currency.CELO:
      return await celoBroadcast(txData, signatureId)
    case Currency.ONE:
      return await oneBroadcast(txData, signatureId)
    case Currency.ETH:
      return await ethBroadcast(txData, signatureId)
    case Currency.BSC:
      return await bscBroadcast(txData, signatureId)
    case Currency.MATIC:
      return await polygonBroadcast(txData, signatureId)
    case Currency.TRON:
      return await tronBroadcast(txData, signatureId)
    case Currency.KCS:
      return await kcsBroadcast(txData, signatureId)
    default:
      throw new Error('Unsupported chain')
  }
}

export const helperGetWeb3Client = (chain: Currency, provider?: string): Web3 => {
  switch (chain) {
    case Currency.CELO:
      return getCeloClient(provider)
    case Currency.ONE:
      return prepareOneClient(provider)
    case Currency.XDC:
      return getXdcClient(provider)
    case Currency.ETH:
      return getClient(provider)
    case Currency.BSC:
      return getBscClient(provider)
    case Currency.MATIC:
      return preparePolygonClient(provider)
    case Currency.KCS:
      return prepareKcsClient(provider)
    default:
      throw new Error('Unsupported chain')
  }
}

export const helperPrepareSCCall = async <Body extends SCBody>(
  testnet: boolean,
  body: Body,
  methodName: string,
  params: any[],
  methodSig?: string,
  provider?: string,
  abi: any[] = listing.abi
) => {
  switch (body.chain) {
    case Currency.CELO:
      return await celoHelperPrepareSCCall(testnet, body, methodName, params, provider, abi)
    case Currency.ONE:
      return await oneHelperPrepareSCCall(body, methodName, params, provider, abi)
    case Currency.ETH:
      return await ethHelperPrepareSCCall(body, methodName, params, provider, abi)
    case Currency.BSC:
      return await bscHelperPrepareSCCall(body, methodName, params, provider, abi)
    case Currency.MATIC:
      return await polygonHelperPrepareSCCall(body, methodName, params, provider, abi)
    case Currency.TRON:
      return await tronHelperPrepareSCCall(body, methodName, params, methodSig, provider, abi)
    case Currency.KCS:
      return await kcsHelperPrepareSCCall(body, methodName, params, provider, abi)
    default:
      throw new Error('Unsupported combination of inputs.')
  }
}
