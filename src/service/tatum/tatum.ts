import { Container, Service } from 'typedi'
import { isLoadBalancerNetwork } from '../../dto'
import {
  EvmBasedRpcSuite,
  SolanaRpcSuite,
  TronRpcSuite,
  UtxoBasedRpcSuite,
  XrpRpcInterface,
} from '../../dto/rpc'
import { EosRpcSuite } from '../../dto/rpc/EosRpcSuite'
import { NativeEvmBasedRpcSuite } from '../../dto/rpc/NativeEvmBasedRpcInterface'
import { CONFIG, Constant, Utils } from '../../util'
import { Address, AddressTezos, AddressTron } from '../address'
import {
  ExtensionConstructor,
  ExtensionConstructorOrConfig,
  ITatumSdkContainer,
  TatumSdkContainer,
  TatumSdkExtension,
} from '../extensions'
import { Faucet } from '../faucet'
import { FeeEvm, FeeUtxo } from '../fee'
import { Ipfs } from '../ipfs'
import { Nft, NftTezos } from '../nft'
import { Notification } from '../notification'
import { Rates } from '../rate'
import { LoadBalancer } from '../rpc/generic/LoadBalancer'
import { Token } from '../token'
import { MetaMask, WalletProvider } from '../walletProvider'
import { ApiVersion, TatumConfig } from './tatum.dto'

/**
 * Works as an entrypoint to interact with extension of choice.
 * @param type - Extension type imported to the SDK instance
 */
export interface ITatumSdkChain {
  extension<T extends TatumSdkExtension>(
    type: new (tatumSdkContainer: ITatumSdkContainer, ...args: unknown[]) => T,
  ): T
}

export abstract class TatumSdkChain implements ITatumSdkChain {
  walletProvider: WalletProvider

  protected constructor(readonly id: string) {
    this.walletProvider = Container.of(id).get(WalletProvider)
  }

  extension<T extends TatumSdkExtension>(
    type: new (tatumSdkContainer: ITatumSdkContainer, ...args: unknown[]) => T,
  ): T {
    return Container.of(this.id).get(type)
  }

  async destroy(): Promise<void> {
    const config = Container.of(this.id).get(CONFIG)
    for (const extensionConfig of config?.configureExtensions ?? []) {
      await this.destroyExtension(extensionConfig, this.id)
    }

    for (const walletProviderConfig of config?.configureWalletProviders ?? []) {
      await this.destroyExtension(walletProviderConfig, this.id)
    }

    // calls destroy on load balancer
    Container.of(this.id).remove(LoadBalancer)
  }

  private async destroyExtension(extensionConfig: ExtensionConstructorOrConfig, id: string) {
    let type: new (container: ITatumSdkContainer, ...args: unknown[]) => TatumSdkExtension

    if ('type' in extensionConfig) {
      type = extensionConfig.type
    } else {
      type = extensionConfig
    }

    await Container.of(id).get(type)?.destroy()
  }
}

export class BaseTatumSdk extends TatumSdkChain {
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

export abstract class BaseUtxoClass extends BaseTatumSdk {
  rpc: UtxoBasedRpcSuite
  fee: FeeUtxo

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<UtxoBasedRpcSuite>(id, Container.of(id).get(CONFIG))
    this.fee = Container.of(id).get(FeeUtxo)
  }
}

export abstract class BaseEvmClass extends BaseTatumSdk {
  rpc: EvmBasedRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<EvmBasedRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class Ethereum extends BaseEvmClass {
  fee: FeeEvm

  constructor(id: string) {
    super(id)
    this.fee = Container.of(id).get(FeeEvm)
  }
}

export class Klaytn extends BaseTatumSdk {
  rpc: NativeEvmBasedRpcSuite

  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<EvmBasedRpcSuite>(id, Container.of(id).get(CONFIG))
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
export class Haqq extends BaseEvmClass {}
export class Flare extends BaseEvmClass {}
export class HarmonyOne extends BaseEvmClass {}
export class Kucoin extends BaseEvmClass {}
export class Oasis extends BaseEvmClass {}
export class Optimism extends BaseEvmClass {}
export class Palm extends BaseEvmClass {}
export class Polygon extends BaseEvmClass {}
export class Vechain extends BaseEvmClass {}
export class Xdc extends BaseEvmClass {}
export class HorizenEon extends BaseEvmClass {}
export class Chiliz extends BaseEvmClass {}

// UTXO chains
export class Bitcoin extends BaseUtxoClass {}
export class Litecoin extends BaseUtxoClass {}
export class Dogecoin extends BaseUtxoClass {}
export class BitcoinCash extends BaseUtxoClass {}
export class ZCash extends BaseUtxoClass {}

// other chains
export class Xrp extends BaseTatumSdk {
  rpc: XrpRpcInterface
  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<XrpRpcInterface>(id, Container.of(id).get(CONFIG))
  }
}
export class Solana extends BaseTatumSdk {
  rpc: SolanaRpcSuite
  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<SolanaRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class Eos extends TatumSdkChain {
  rpc: EosRpcSuite
  constructor(id: string) {
    super(id)
    this.rpc = Utils.getRpc<EosRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class Tron extends TatumSdkChain {
  notification: Notification
  nft: Nft
  token: Token
  address: AddressTron
  rates: Rates
  rpc: TronRpcSuite

  constructor(id: string) {
    super(id)
    this.notification = Container.of(id).get(Notification)
    this.nft = Container.of(id).get(Nft)
    this.token = Container.of(id).get(Token)
    this.address = Container.of(id).get(AddressTron)
    this.rates = Container.of(id).get(Rates)
    this.rpc = Utils.getRpc<TronRpcSuite>(id, Container.of(id).get(CONFIG))
  }
}

export class Tezos extends TatumSdkChain {
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

@Service({ transient: true })
export class TatumSDK {
  /**
   * Initialize Tatum SDK. This method must be called before any other method.
   * Default configuration is used if no configuration is provided.
   * @param config
   */
  public static async init<T extends ITatumSdkChain>(config: TatumConfig): Promise<T> {
    const defaultConfig: Partial<TatumConfig> = {
      version: ApiVersion.V4,
      retryCount: 1,
      retryDelay: 1000,
      rpc: {
        oneTimeLoadBalancing: false,
        allowedBlocksBehind: Constant.OPEN_RPC.ALLOWED_BLOCKS_BEHIND,
      },
    }

    const mergedConfig = Utils.deepMerge(defaultConfig, config) as TatumConfig

    // TODO: check when rpc is customized if there is allowedBlocksBehind if not throw error or set default
    // TODO: Check if rpc works for other chains and all configurations are set correctly

    const id = TatumSDK.generateRandomString()
    Container.of(id).set(CONFIG, mergedConfig)
    if (isLoadBalancerNetwork(mergedConfig.network)) {
      const loadBalancer = Container.of(id).get(LoadBalancer)
      await loadBalancer.init()
    }

    const containerInstance = new TatumSdkContainer(Container.of(id))

    await this.configureExtensions(config, id, containerInstance)
    await this.addBuiltInExtensions(id, containerInstance)

    return Utils.getClient<T>(id, mergedConfig.network)
  }

  private static builtInExtensions: ExtensionConstructor[] = [MetaMask]

  private static async addBuiltInExtensions(id: string, containerInstance: TatumSdkContainer) {
    for (const extension of this.builtInExtensions) {
      const instance = new extension(containerInstance)

      if (instance.supportedNetworks.includes(Container.of(id).get(CONFIG).network)) {
        await instance.init()
        Container.of(id).set(extension, instance)
      }
    }
  }

  private static async configureExtensions(
    config: TatumConfig,
    id: string,
    containerInstance: TatumSdkContainer,
  ) {
    for (const extensionConfig of config?.configureExtensions ?? []) {
      await this.addExtension(extensionConfig, id, containerInstance)
    }

    for (const walletProviderConfig of config?.configureWalletProviders ?? []) {
      await this.addExtension(walletProviderConfig, id, containerInstance)
    }
  }

  private static async addExtension(
    extensionConfig: ExtensionConstructorOrConfig,
    id: string,
    containerInstance: TatumSdkContainer,
  ) {
    let type: new (container: ITatumSdkContainer, ...args: unknown[]) => TatumSdkExtension
    const args: unknown[] = []

    if ('type' in extensionConfig) {
      type = extensionConfig.type
      args.push(extensionConfig.config)
    } else {
      type = extensionConfig
    }

    const instance = new type(containerInstance, ...args)

    this.checkIfNetworkSupportedInExtension(instance, id, type)

    await instance.init()
    Container.of(id).set(type, instance)
  }

  private static checkIfNetworkSupportedInExtension(
    instance: TatumSdkExtension,
    id: string,
    type: { new (container: ITatumSdkContainer, ...args: unknown[]): TatumSdkExtension },
  ) {
    if (!instance.supportedNetworks.includes(Container.of(id).get(CONFIG).network)) {
      throw new Error(
        `Extension ${type.name} is not supported on ${Container.of(id).get(CONFIG).network} network.`,
      )
    }
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
