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
    const { apiKey, rpcUrl } = Container.of(this.id).get(CONFIG)
    return rpcUrl || `https://api.tatum.io/v3/blockchain/node/${this.network}${apiKey?.v1 ? `/${apiKey.v1}` : '/'}`
  }

  prepareRpcCall(method: string, params?: unknown[], id = 1): JsonRpcCall {
    return {
      jsonrpc: '2.0',
      id,
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

  async rawUrlCall<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: object | object[],
  ): Promise<T> {
    switch (method) {
      case 'GET':
        return this.connector.get<T>({ path: url, basePath: this.getRpcNodeUrl() })
      case 'POST':
        return this.connector.post<T>({ path: url, basePath: this.getRpcNodeUrl(), body })
      case 'PUT':
        return this.connector.post<T>({ path: url, basePath: this.getRpcNodeUrl(), body })
      case 'DELETE':
        return this.connector.delete<T>({ path: url, basePath: this.getRpcNodeUrl() })
      default:
        throw new Error('Unsupported method')
    }
  }
}
