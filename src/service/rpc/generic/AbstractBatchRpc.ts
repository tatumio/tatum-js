import { Container } from 'typedi'
import { TatumConnector } from '../../../connector/tatum.connector'
import { JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { AbstractRpcInterface } from '../../../dto/rpc/AbstractJsonRpcInterface'
import { CONFIG } from '../../../util'
import { TatumConfig } from '../../tatum'

export abstract class AbstractBatchRpc implements AbstractRpcInterface {
  protected readonly connector: TatumConnector
  protected readonly config: TatumConfig

  protected constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
    this.config = Container.of(this.id).get(CONFIG)
  }

  protected getRpcNodeUrl(subPath?: string): string {
    const { apiKey, rpc, network } = this.config
    if (apiKey) {
      const url =
        rpc?.nodes?.[0].url ||
        `https://api.tatum.io/v3/blockchain/node/${network}/${apiKey.v1 ? apiKey.v1 : apiKey.v2}`
      return url.concat(subPath || '')
    }
    return rpc?.nodes?.[0].url || `https://api.tatum.io/v3/blockchain/node/${network}/`.concat(subPath || '')
  }

  rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<unknown>> {
    return this.connector.rpcCall(this.getRpcNodeUrl(), body)
  }

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<unknown>[]> {
    return this.connector.rpcCall(this.getRpcNodeUrl(), body)
  }

  destroy(): void {
    // do nothing
  }
}
