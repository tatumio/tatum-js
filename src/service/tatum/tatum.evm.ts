import { Container } from 'typedi'
import { EvmBasedBeaconRpcSuite, EvmBasedRpcSuite } from '../../dto'
import { NativeEvmBasedRpcSuite } from '../../dto/rpc/NativeEvmBasedRpcInterface'
import { CONFIG, Utils } from '../../util'
import { Address } from '../address'
import { FeeEvm } from '../fee'
import { Ipfs } from '../ipfs'
import { Nft } from '../nft'
import { Notification } from '../notification'
import { Rates } from '../rate'
import { Token } from '../token'
import { TatumSdkChain } from './tatum'
import { ZkSyncRpcSuite } from '../../dto/rpc/ZkSyncRpcSuite'

export abstract class BaseEvm extends TatumSdkChain {
  rpc: EvmBasedRpcSuite
  fee: FeeEvm
  ipfs: Ipfs
  rates: Rates

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<EvmBasedRpcSuite>(id, Container.of(id).get(CONFIG))
    this.fee = Container.of(id).get(FeeEvm)
    this.ipfs = Container.of(id).get(Ipfs)
    this.rates = Container.of(id).get(Rates)
  }
}

export class NotificationEvm extends BaseEvm {
  notification: Notification

  constructor(id: string) {
    super(id)
    this.notification = Container.of(id).get(Notification)
  }
}

export class FullEvm extends NotificationEvm {
  nft: Nft
  token: Token
  address: Address

  constructor(id: string) {
    super(id)
    this.nft = Container.of(id).get(Nft)
    this.token = Container.of(id).get(Token)
    this.address = Container.of(id).get(Address)
  }
}

// Base class for all EVM based chains
export class ArbitrumNova extends BaseEvm {}
export class ArbitrumOne extends BaseEvm {}
export class Aurora extends BaseEvm {}
export class AvalancheC extends NotificationEvm {}
export class Cronos extends NotificationEvm {}
export class EthereumClassic extends BaseEvm {}
export class Fantom extends NotificationEvm {}
export class Gnosis extends BaseEvm {}
export class Haqq extends BaseEvm {}
export class HarmonyOne extends BaseEvm {}
export class Kucoin extends BaseEvm {}
export class Oasis extends BaseEvm {}
export class Optimism extends NotificationEvm {}
export class Palm extends BaseEvm {}
export class Vechain extends BaseEvm {}
export class XinFin extends BaseEvm {}
export class Base extends NotificationEvm {}
export class Flare extends NotificationEvm {}
export class Chiliz extends NotificationEvm {}

export class HorizenEon extends BaseEvm {
  address: Address

  constructor(id: string) {
    super(id)
    this.address = Container.of(id).get(Address)
  }
}

export class Klaytn extends NotificationEvm {
  rpc: NativeEvmBasedRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<EvmBasedRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class ZkSync extends TatumSdkChain {
  rpc: ZkSyncRpcSuite
  fee: FeeEvm
  ipfs: Ipfs
  rates: Rates

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<ZkSyncRpcSuite>(id, Container.of(id).get(CONFIG))
    this.fee = Container.of(id).get(FeeEvm)
    this.ipfs = Container.of(id).get(Ipfs)
    this.rates = Container.of(id).get(Rates)
  }
}


// Full support for chains
export class Ethereum extends FullEvm {
  rpc: EvmBasedBeaconRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<EvmBasedBeaconRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}
export class Polygon extends FullEvm {}
export class Celo extends FullEvm {}
export class BinanceSmartChain extends FullEvm {}
