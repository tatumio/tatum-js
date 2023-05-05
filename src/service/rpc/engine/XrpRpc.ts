/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { Container, Service } from 'typedi'
import { JsonRpcResponse, LedgerIndex, XrpRpcSuite } from '../../../dto'
import { CONFIG } from '../../../util'
import { AbstractJsonRpc } from './AbstractJsonRpc'

@Service({
  factory: (data: { id: string }) => {
    return new XrpRpc(data.id)
  },
  transient: true,
})
export class XrpRpc extends AbstractJsonRpc implements XrpRpcSuite {
  constructor(id: string) {
    super(id, Container.of(id).get(CONFIG).network)
  }

  accountChannels(account: string, destinationAccount: string, ledgerIndex: LedgerIndex): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('account_channels', [account, destinationAccount, ledgerIndex]),
      )
      .then((r) => new BigNumber(r.result))
  }
}
