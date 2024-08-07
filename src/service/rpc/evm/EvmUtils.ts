/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { BigNumber } from 'bignumber.js'
import { decodeHexString } from '../../../util/decode'

export const ARCHIVE_METHODS = ['getCode', 'call']

export const POSSIBLE_ARCHIVE_METHODS = [
  { method: 'getStorageAt', index: 2 },
  { method: 'getBalance', index: 1 },
  { method: 'getBlockByNumber', index: 0 },
]

export const EvmUtils = {
  isArchiveMethod(rpc: JsonRpcCall): boolean {
    const isArchiveMethod =
      ARCHIVE_METHODS.find((method) => rpc.method.includes(method)) ||
      rpc.method?.includes('debug') ||
      rpc.method?.includes('trace')
    if (isArchiveMethod) {
      return true
    }

    const possibleArchiveMethod = POSSIBLE_ARCHIVE_METHODS.find((possibleArchiveMethod) =>
      rpc.method.includes(possibleArchiveMethod.method),
    )
    if (possibleArchiveMethod) {
      const param = rpc?.params?.[possibleArchiveMethod.index]
      return this.isParamForArchiveNode(param)
    }

    if (rpc.method.includes('getLogs')) {
      const param = rpc?.params?.[1] || {}
      return this.isParamForArchiveNode(param.fromBlock) || this.isParamForArchiveNode(param.toBlock)
    }

    return false
  },

  isParamForArchiveNode(param: unknown): boolean {
    return !!param && param !== 'latest'
  },
  toBigNumber(response: JsonRpcResponse<any>): JsonRpcResponse<BigNumber> {
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  },
  toDecodedString(response: JsonRpcResponse<any>): JsonRpcResponse<string> {
    if (response.result) {
      response.result = decodeHexString(response.result)
    }
    return response
  }
}
