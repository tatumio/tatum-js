import { Container } from 'typedi'
import { TatumConnector } from '../../../connector/tatum.connector'
import { JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { AbstractJsonRpcSuite } from '../../../dto/rpc/AbstractJsonRpcSuite'
import { CONFIG } from '../../../util'
import { Network } from '../../tatum'

export abstract class AbstractJsonRpc implements AbstractJsonRpcSuite {
  protected readonly connector: TatumConnector

  protected constructor(private readonly id: string, private readonly network: Network) {
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  protected getRpcNodeUrl() {
    const { apiKey } = Container.of(this.id).get(CONFIG)
    return `https://api.tatum.io/v3/blockchain/node/${this.network}${apiKey ? `/${apiKey}` : ''}`
  }

  protected prepareRpcCall(method: string, params?: unknown[]): JsonRpcCall {
    return {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    }
  }

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse[]> {
    return this.connector.rpcCall(this.getRpcNodeUrl(), body)
  }

  rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse> {
    return this.connector.rpcCall(this.getRpcNodeUrl(), body)
  }
}
