import { Container } from 'typedi'
import { EvmBasedRpcSuite } from '../../dto'
import { NativeEvmBasedRpcSuite } from '../../dto/rpc/NativeEvmBasedRpcInterface'
import { CONFIG, Utils } from '../../util'
import { Address } from '../address'
import { Faucet } from '../faucet'
import { FeeEvm } from '../fee'
import { Ipfs } from '../ipfs'
import { Nft } from '../nft'
import { Notification } from '../notification'
import { Rates } from '../rate'
import { Token } from '../token'
import { TatumSdkChain } from './tatum'

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

export abstract class FaucetEvm extends BaseEvm {
  faucet: Faucet

  constructor(id: string) {
    super(id)
    this.faucet = Container.of(id).get(Faucet)
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
  faucet: Faucet
  address: Address

  constructor(id: string) {
    super(id)
    this.nft = Container.of(id).get(Nft)
    this.token = Container.of(id).get(Token)
    this.faucet = Container.of(id).get(Faucet)
    this.address = Container.of(id).get(Address)
  }
}

// Base class for all EVM based chains
export class ArbitrumNova extends BaseEvm {}
export class ArbitrumOne extends BaseEvm {}
export class Aurora extends BaseEvm {}
export class AvalancheC extends BaseEvm {}
export class Cronos extends BaseEvm {}
export class EthereumClassic extends BaseEvm {}
export class Fantom extends BaseEvm {}
export class Gnosis extends BaseEvm {}
export class Haqq extends BaseEvm {}
export class Flare extends BaseEvm {}
export class HarmonyOne extends BaseEvm {}
export class Kucoin extends BaseEvm {}
export class Oasis extends BaseEvm {}
export class Optimism extends BaseEvm {}
export class Palm extends BaseEvm {}
export class Vechain extends BaseEvm {}
export class Xdc extends BaseEvm {}
export class Chiliz extends BaseEvm {}

export class HorizenEon extends FaucetEvm {
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

// Full support for chains
export class Ethereum extends FullEvm {}
export class Polygon extends FullEvm {}
export class Celo extends FullEvm {}
export class BinanceSmartChain extends FullEvm {}
