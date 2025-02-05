import { Container } from 'typedi'
import { SolanaRpcSuite, TezosRpcInterface, TronRpcSuite, XrpRpcInterface } from '../../dto'
import { AlgorandAlgodRpcSuite } from '../../dto/rpc/AlgorandAlgodRpcSuite'
import { AlgorandIndexerRpcSuite } from '../../dto/rpc/AlgorandIndexerRpcSuite'
import { CardanoRpcSuite } from '../../dto/rpc/CardanoRpcSuite'
import { EosRpcSuite } from '../../dto/rpc/EosRpcSuite'
import { IotaRpcSuite } from '../../dto/rpc/IotaRpcSuite'
import { KadenaRpcInterface } from '../../dto/rpc/KadenaRpcSuite'
import { RostrumRpcInterface } from '../../dto/rpc/RostrumRpcSuite'
import { StellarRpcSuite } from '../../dto/rpc/StellarRpcSuite'
import { CONFIG, Utils } from '../../util'
import { Address, AddressTezos, AddressTron } from '../address'
import { Ipfs } from '../ipfs'
import { Nft, NftTezos } from '../nft'
import { Notification } from '../notification'
import { Rates } from '../rate'
import { Token } from '../token'
import { TatumSdkChain } from './tatum'
import { CosmosRpcSuite } from '../../dto/rpc/CosmosRpcSuite'
import { CasperRpcSuite } from '../../dto/rpc/CasperRpcSuite'
import { TonRpcSuite } from '../../dto/rpc/ton/TonRpcSuite'

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
  rpc: TezosRpcInterface

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<TezosRpcInterface>(id, Container.of(id).get(CONFIG))
    this.notification = Container.of(id).get(Notification)
    this.address = Container.of(id).get(AddressTezos)
    this.nft = Container.of(this.id).get(NftTezos)
  }
}

export class Kadena extends BaseOther {
  rpc: KadenaRpcInterface

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<KadenaRpcInterface>(id, Container.of(id).get(CONFIG))
  }
}

export class Iota extends BaseOther {
  rpc: IotaRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<IotaRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class Rostrum extends BaseOther {
  rpc: RostrumRpcInterface

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<RostrumRpcInterface>(id, Container.of(id).get(CONFIG))
  }
}

export class BitcoinElectrs extends BaseOther {
  rpc: RostrumRpcInterface

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<RostrumRpcInterface>(id, Container.of(id).get(CONFIG))
  }
}

export class Casper extends BaseOther {
  rpc: CasperRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<CasperRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class Ton extends BaseOther {
  rpc: TonRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<TonRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class AlgorandAlgod extends BaseOther {
  rpc: AlgorandAlgodRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<AlgorandAlgodRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class AlgorandIndexer extends BaseOther {
  rpc: AlgorandIndexerRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<AlgorandIndexerRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class CardanoRosetta extends BaseOther {
  rpc: CardanoRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<CardanoRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class CosmosRosetta extends BaseOther {
  rpc: CosmosRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<CosmosRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class Stellar extends BaseOther {
  rpc: StellarRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<StellarRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class FullSdk extends TatumSdkChain {
  notification: Notification
  nft: Nft
  token: Token
  address: Address
  rates: Rates
  ipfs: Ipfs

  constructor(id: string) {
    super(id)
    this.notification = Container.of(id).get(Notification)
    this.nft = Container.of(id).get(Nft)
    this.token = Container.of(id).get(Token)
    this.address = Container.of(id).get(Address)
    this.rates = Container.of(id).get(Rates)
    this.ipfs = Container.of(id).get(Ipfs)
  }
}
