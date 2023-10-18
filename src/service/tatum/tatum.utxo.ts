import { Container } from 'typedi'
import { UtxoBasedRpcSuite } from '../../dto'
import { CONFIG, Utils } from '../../util'
import { Address } from '../address'
import { FeeUtxo } from '../fee'
import { Ipfs } from '../ipfs'
import { Notification } from '../notification'
import { Rates } from '../rate'
import { TatumSdkChain } from './tatum'

export abstract class BaseUtxo extends TatumSdkChain {
  rpc: UtxoBasedRpcSuite
  ipfs: Ipfs
  rates: Rates

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<UtxoBasedRpcSuite>(id, Container.of(id).get(CONFIG))
    this.ipfs = Container.of(id).get(Ipfs)
    this.rates = Container.of(id).get(Rates)
  }
}

export abstract class UtxoFee extends BaseUtxo {
  fee: FeeUtxo

  constructor(id: string) {
    super(id)
    this.fee = Container.of(id).get(FeeUtxo)
  }
}

export abstract class NotificationUtxo extends UtxoFee {
  notification: Notification
  constructor(id: string) {
    super(id)
    this.notification = Container.of(id).get(Notification)
  }
}

export abstract class FullUtxo extends NotificationUtxo {
  address: Address
  constructor(id: string) {
    super(id)
    this.address = Container.of(id).get(Address)
  }
}

export class Bitcoin extends FullUtxo {}
export class Litecoin extends FullUtxo {}
export class Dogecoin extends FullUtxo {}
export class BitcoinCash extends NotificationUtxo {}
export class ZCash extends BaseUtxo {}
