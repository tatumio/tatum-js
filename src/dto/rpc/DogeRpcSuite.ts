/* eslint-disable @typescript-eslint/no-explicit-any */

import { JsonRpcResponse } from '../JsonRpcResponse.dto'
import { AbstractRpcInterface } from './AbstractJsonRpcInterface'
import { UtxoBasedCommonRpcInterface } from './UtxoBasedRpcSuite'

export interface DogeRpcSuite extends DogeRpcInterface, AbstractRpcInterface {}

export interface DogeRpcInterface extends UtxoBasedCommonRpcInterface{
  getBlock(hashOrHeight: string, verbose?: boolean): Promise<JsonRpcResponse<any>>
}
