import { SolanaRpcSuite, TronRpcSuite, XrpRpcInterface } from '../../dto'
import { CONFIG, Utils } from '../../util'
import { Container } from 'typedi'
import { TatumSdkChain } from './tatum'
import { EosRpcSuite } from '../../dto/rpc/EosRpcSuite'
import { Nft, NftTezos } from '../nft'
import { Address, AddressTezos, AddressTron } from '../address'
import { Rates } from '../rate'
import { Ipfs } from '../ipfs'
import { Token } from '../token'
import { Notification } from '../notification'
import { Faucet } from '../faucet'

export abstract class BaseOther extends TatumSdkChain {
  ipfs: Ipfs
  rates: Rates

  constructor(id: string) {
    super(id)
    this.ipfs = Container.of(id).get(Ipfs)
    this.rates = Container.of(id).get(Rates)
  }
}

export class Xrp extends BaseOther {
  rpc: XrpRpcInterface
  notification: Notification
  address: Address

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<XrpRpcInterface>(id, Container.of(id).get(CONFIG))
    this.notification = Container.of(id).get(Notification)
    this.address = Container.of(id).get(Address)
  }
}

export class Solana extends BaseOther {
  rpc: SolanaRpcSuite
  notification: Notification
  address: Address

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<SolanaRpcSuite>(id, Container.of(id).get(CONFIG))
    this.notification = Container.of(id).get(Notification)
    this.address = Container.of(id).get(Address)
  }
}

export class Eos extends BaseOther {
  rpc: EosRpcSuite
  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<EosRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class Tron extends BaseOther {
  notification: Notification
  rpc: TronRpcSuite
  address: AddressTron

  constructor(id: string) {
    super(id)
    this.notification = Container.of(id).get(Notification)
    this.rpc = Utils.getRpc<TronRpcSuite>(id, Container.of(id).get(CONFIG))
    this.address = Container.of(id).get(AddressTron)
  }
}

export class Tezos extends BaseOther {
  notification: Notification
  address: AddressTezos
  nft: NftTezos

  constructor(id: string) {
    super(id)
    this.notification = Container.of(id).get(Notification)
    this.address = Container.of(id).get(AddressTezos)
    this.nft = Container.of(this.id).get(NftTezos)
  }
}

export class FullSdk extends TatumSdkChain {
  notification: Notification
  nft: Nft
  token: Token
  address: Address
  rates: Rates
  faucet: Faucet
  ipfs: Ipfs

  constructor(id: string) {
    super(id)
    this.notification = Container.of(id).get(Notification)
    this.nft = Container.of(id).get(Nft)
    this.token = Container.of(id).get(Token)
    this.address = Container.of(id).get(Address)
    this.rates = Container.of(id).get(Rates)
    this.faucet = Container.of(id).get(Faucet)
    this.ipfs = Container.of(id).get(Ipfs)
  }
}

