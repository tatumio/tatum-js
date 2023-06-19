import { Container, Service } from 'typedi'
import { EvmBasedRpcSuite, SolanaRpcSuite, TronRpcSuite, UtxoBasedRpcSuite, XrpRpcSuite } from '../../dto/rpc'
import { CONFIG, Utils } from '../../util'
import { Address } from '../address'
import { FeeEvm, FeeUtxo } from '../fee'
import { Nft } from '../nft'
import { Notification } from '../notification'
import { Rates } from '../rate'
import { Token } from '../token'
import { WalletProvider } from '../walletProvider'
import { ApiVersion, TatumConfig } from './tatum.dto'

export class BaseTatumSdk {
  notification: Notification
  nft: Nft
  token: Token
  address: Address
  walletProvider: WalletProvider
  rates: Rates

  constructor(private readonly id: string) {
    this.notification = Container.of(this.id).get(Notification)
    this.nft = Container.of(id).get(Nft)
    this.token = Container.of(id).get(Token)
    this.walletProvider = Container.of(id).get(WalletProvider)
    this.address = Container.of(id).get(Address)
    this.rates = Container.of(id).get(Rates)
  }
}

export abstract class BaseUtxoClass extends BaseTatumSdk {
  rpc: UtxoBasedRpcSuite
  fee: FeeUtxo

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<UtxoBasedRpcSuite>(id, Container.of(id).get(CONFIG).network)
    this.fee = Container.of(id).get(FeeUtxo)
  }
}

export abstract class BaseEvmClass extends BaseTatumSdk {
  rpc: EvmBasedRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<EvmBasedRpcSuite>(id, Container.of(id).get(CONFIG).network)
  }
}

export class Ethereum extends BaseEvmClass {
  fee: FeeEvm

  constructor(id: string) {
    super(id)
    this.fee = Container.of(id).get(FeeEvm)
  }
}
export class ArbitrumNova extends BaseEvmClass {}
export class ArbitrumOne extends BaseEvmClass {}
export class Aurora extends BaseEvmClass {}
export class AvalancheC extends BaseEvmClass {}
export class BinanceSmartChain extends BaseEvmClass {}
export class Celo extends BaseEvmClass {}
export class Cronos extends BaseEvmClass {}
export class EthereumClassic extends BaseEvmClass {}
export class Fantom extends BaseEvmClass {}
export class Gnosis extends BaseEvmClass {}
export class HarmonyOne extends BaseEvmClass {}
export class Klaytn extends BaseEvmClass {}
export class Kucoin extends BaseEvmClass {}
export class Oasis extends BaseEvmClass {}
export class Optimism extends BaseEvmClass {}
export class Palm extends BaseEvmClass {}
export class Polygon extends BaseEvmClass {}
export class Vechain extends BaseEvmClass {}
export class Xdc extends BaseEvmClass {}

// UTXO chains
export class Bitcoin extends BaseUtxoClass {}
export class Litecoin extends BaseUtxoClass {}
export class Dogecoin extends BaseUtxoClass {}
export class BitcoinCash extends BaseUtxoClass {}

// other chains
export class Xrp extends BaseTatumSdk {
  rpc: XrpRpcSuite
  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<XrpRpcSuite>(id, Container.of(id).get(CONFIG).network)
  }
}
export class Solana extends BaseTatumSdk {
  rpc: SolanaRpcSuite
  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<SolanaRpcSuite>(id, Container.of(id).get(CONFIG).network)
  }
}
export class Tron extends BaseTatumSdk {
  rpc: TronRpcSuite
  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<TronRpcSuite>(id, Container.of(id).get(CONFIG).network)
  }
}

@Service({ transient: true })
export class TatumSDK {
  /**
   * Initialize Tatum SDK. This method must be called before any other method.
   * Default configuration is used if no configuration is provided.
   * @param config
   */
  public static async init<T>(config: TatumConfig): Promise<T> {
    const defaultConfig: TatumConfig = {
      verbose: false,
      version: ApiVersion.V2,
      retryCount: 1,
      retryDelay: 1000,
      ...config,
    }

    const id = TatumSDK.generateRandomString()
    Container.of(id).set(CONFIG, defaultConfig)

    return Utils.getClient<T>(id, defaultConfig.network)
  }

  private static generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 60; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
}
