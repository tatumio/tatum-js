import {
  AccountService,
  AlgorandService,
  BitcoinCashService,
  BitcoinService,
  BlockchainAddressesService,
  BlockchainOperationsService,
  BlockchainStorageService,
  BlockchainUtilsService,
  BnbBeaconChainService,
  BnbSmartChainService,
  CardanoService,
  CeloService,
  CustomerService,
  DogecoinService,
  ElrondService,
  EthereumService,
  ExchangeRateService,
  FlowService,
  FungibleTokensErc20OrCompatibleService,
  GasPumpService,
  HarmonyService,
  IpfsService,
  KeyManagementSystemService,
  KlaytnService,
  KuCoinService,
  LitecoinService,
  MaliciousAddressService,
  MarketplaceService,
  MultiTokensErc1155OrCompatibleService,
  NeoService,
  NftErc721OrCompatibleService,
  NotificationSubscriptionsService,
  OrderBookService,
  PolygonService,
  QtumService,
  ServiceUtilsService,
  SolanaService,
  StellarService,
  TerraService,
  TransactionService,
  TronService,
  VeChainService,
  VirtualCurrencyService,
  WithdrawalService,
  XinFinService,
  XrpService,
} from '../generated'
import { OpenAPI } from '../generated/core/OpenAPI'

export type TatumApiType = ReturnType<typeof TatumApi>

export enum TatumUrl {
  EU = 'https://api-eu1.tatum.io',
  US_WEST = 'https://api-us-west1.tatum.io',
}

export const TATUM_API_CONSTANTS = {
  URL: TatumUrl.EU,
  HEADER_API_KEY: 'x-api-key',
  API_VERSION: 'v3',
  API_KEY: '',
  TRON_PRO_API_KEY: '',
}

export function TatumApi(apiKey: string, url = TATUM_API_CONSTANTS.URL) {
  OpenAPI.HEADERS = { [TATUM_API_CONSTANTS.HEADER_API_KEY]: apiKey }
  OpenAPI.BASE = url

  // @TODO
  TATUM_API_CONSTANTS.API_KEY = apiKey

  return ApiServices
}

export type BtcBasedApiService = BitcoinService | BitcoinCashService | DogecoinService | LitecoinService

export type EvmBasedApiService = EthereumService | CeloService

export const ApiServices = {
  blockchain: {
    ada: CardanoService,
    algo: AlgorandService,
    bnb: BnbBeaconChainService,
    bitcoin: BitcoinService,
    bcash: BitcoinCashService,
    bsc: BnbSmartChainService,
    celo: CeloService,
    doge: DogecoinService,
    elgo: ElrondService,
    eth: EthereumService,
    flow: FlowService,
    one: HarmonyService,
    kcs: KuCoinService,
    klaytn: KlaytnService,
    ltc: LitecoinService,
    neo: NeoService,
    polygon: PolygonService,
    qtum: QtumService,
    solana: SolanaService,
    tron: TronService,
    util: BlockchainUtilsService,
    gasPump: GasPumpService,
    vechain: VeChainService,
    terra: TerraService,
    xdc: XinFinService,
    xlm: StellarService,
    xrp: XrpService,
  },
  ipfs: IpfsService,
  fungibleToken: FungibleTokensErc20OrCompatibleService,
  marketplace: MarketplaceService,
  multiToken: MultiTokensErc1155OrCompatibleService,
  nft: NftErc721OrCompatibleService,
  record: BlockchainStorageService,
  ledger: {
    account: AccountService,
    customer: CustomerService,
    orderBook: OrderBookService,
    subscriptions: NotificationSubscriptionsService,
    transaction: TransactionService,
    virtualCurrency: VirtualCurrencyService,
  },
  offChain: {
    account: BlockchainAddressesService,
    blockchain: BlockchainOperationsService,
    withdrawal: WithdrawalService,
  },
  security: MaliciousAddressService,
  kms: KeyManagementSystemService,
  exchangeRate: ExchangeRateService,
  tatum: ServiceUtilsService,
}
