import BigNumber from 'bignumber.js'
import {get, post} from '../connector/tatum'
import {TransactionHash} from '../model'

export const flowBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => post(`/v3/flow/broadcast`, {
    txData,
    signatureId
})

// TODO: return types for FLOW
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const flowGetCurrentBlock = async (): Promise<number> => get(`/v3/flow/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowGetBlock" target="_blank">Tatum API documentation</a>
 */
export const flowGetBlock = async (hash: string): Promise<any> => get(`/v3/flow/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowGetAccount" target="_blank">Tatum API documentation</a>
 */
export const flowGetAccount = async (address: string): Promise<any> => {
    const {data} = await get(`/v3/flow/account/${address}`)
    return {flow: new BigNumber(data.flow), cUsd: new BigNumber(data.cUsd)}
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const flowGetTransaction = async (hash: string): Promise<any> => get(`/v3/flow/transaction/${hash}`)
