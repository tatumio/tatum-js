/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from 'typedi'
import {
  AccountPermissionUpdateOptions,
  JsonRpcCall,
  JsonRpcResponse,
  TronPermission,
  TronRpcSuite,
} from '../../dto'
import { Utils } from '../../util'
import { AbstractEvmRpc } from './evm/AbstractEvmRpc'

export interface PostI {
  path: string
  body?: any
}

@Service()
export abstract class AbstractEosRpc extends AbstractEvmRpc implements TronRpcSuite {
  protected abstract post<T>(post: PostI): Promise<T>
  abstract destroy(): void
  abstract getRpcNodeUrl(): string

  abstract rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>>

  abstract rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>>

  private sendPost<T>({
    path,
    body,
    notConvertCamelToSnake,
  }: {
    path: string
    body?: any
    notConvertCamelToSnake?: boolean
  }): Promise<T> {
    const post: PostI = {
      path,
    }

    if (body) {
      post.body = notConvertCamelToSnake ? body : Utils.convertObjCamelToSnake(body)
    }

    return this.post(post)
  }

  accountPermissionUpdate(
    ownerAddress: string,
    actives: TronPermission[],
    owner: TronPermission,
    options?: AccountPermissionUpdateOptions,
  ): Promise<any> {
    return this.sendPost({
      path: '/wallet/accountpermissionupdate',
      body: { ownerAddress, actives, owner, ...options },
    })
  }

  broadcastHex(transaction: string): Promise<any> {
    return this.sendPost({
      path: '/wallet/broadcasthex',
      body: { transaction },
    })
  }
}
