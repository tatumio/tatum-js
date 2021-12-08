import { get, post } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowSign" target="_blank">Tatum API documentation</a>
 */
export const signWithKey = async (data: string, isPayer: boolean): Promise<{ signature: string }> =>
  post('/v3/flow/sign', { data, isPayer })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowGetSignKey" target="_blank">Tatum API documentation</a>
 */
export const getSignKey = async (isPayer: boolean): Promise<{ keyId: number; address: string }> => get(`/v3/flow/proposal/${isPayer}`)

// TODO: return types for FLOW
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/flow/block/current`)

export const broadcastTx = async (txData: string, signatureId?: string, proposalKey?: number) =>
  post('/v3/flow/broadcast', { txData, signatureId, proposalKey })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<any> => get(`/v3/flow/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowGetAccount" target="_blank">Tatum API documentation</a>
 */
export const getAccount = async (address: string): Promise<any> => get(`/v3/flow/account/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/FlowGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<any> => get(`/v3/flow/transaction/${hash}`)
