/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { Logger } from '../../../service/logger/logger.types'
import { LOGGER, Utils } from '../../../util'
import { GenericRpc } from '../generic/GenericRpc'
import { AbstractEvmRpc } from './AbstractEvmRpc'

@Service({
  factory: (data: { id: string }) => {
    return new EvmRpc(data.id)
  },
  transient: true,
})
export class EvmRpc extends AbstractEvmRpc {
  public readonly genericRpc: GenericRpc
  protected readonly logger: Logger

  constructor(id: string) {
    super()
    this.genericRpc = Container.of(id).get(GenericRpc)
    this.logger = Container.of(id).get(LOGGER)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.genericRpc.rawRpcCall(preparedCall)) as T
  }

  async rawRpcCall<T>(body: JsonRpcCall): Promise<T> {
    return (await this.genericRpc.rawRpcCall(body)) as T
  }

  async rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>> {
    return this.genericRpc.rawBatchRpcCall(body)
  }

  destroy(): void {
    // do nothing
  }
}
