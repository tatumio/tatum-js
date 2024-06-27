import {
  AccountService,
  AlgorandService,
  AuctionService,
  AvalancheService,
  BaseService,
  BitcoinCashService,
  BitcoinService,
  BlockchainAddressesService,
  BlockchainFeesService,
  BlockchainOperationsService,
  BlockchainStorageService,
  BlockchainUtilsService,
  BnbBeaconChainService,
  BnbSmartChainService,
  CardanoService,
  CeloService,
  CronosService,
  CustodialManagedWalletsService,
  CustomerService,
  TokenApiService,
  NftApiService,
  WalletApiService,
  TransactionsApiService,
  DeFiApiService,
  DogecoinService,
  ElrondService,
  EthereumService,
  ExchangeRateService,
  FlareService,
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
  NftErc721OrCompatibleService,
  NotificationSubscriptionsService,
  OptimismService,
  OrderBookService,
  PolygonService,
  ServiceUtilsService,
  SolanaService,
  StellarService,
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

export type TatumUrlArg = string

export const TATUM_API_CONSTANTS = {
  URL: 'https://api.tatum.io',
  HEADER_API_KEY: 'x-api-key',
  NODE_TYPE_KEY: 'x-node-type',
  API_VERSION: 'v3',
  API_KEY: '',
  TRON_PRO_API_KEY: '',
}

export function TatumApi(apiKey: string, url: string = TATUM_API_CONSTANTS.URL) {
  OpenAPI.HEADERS = { [TATUM_API_CONSTANTS.HEADER_API_KEY]: apiKey }
  OpenAPI.BASE = process.env['TATUM_API_URL'] ?? url

  // @TODO
  TATUM_API_CONSTANTS.API_KEY = apiKey

  return ApiServices
}

export type BtcBasedApiService = BitcoinService | BitcoinCashService | DogecoinService | LitecoinService

export type EvmBasedApiService = EthereumService | CeloService

export const ApiServices = {
  blockchain: {
    ada: CardanoService,
    avalanche: AvalancheService,
    algo: AlgorandService,
    base: BaseService,
    bnb: BnbBeaconChainService,
    bitcoin: BitcoinService,
    bcash: BitcoinCashService,
    bsc: BnbSmartChainService,
    celo: CeloService,
    cronos: CronosService,
    doge: DogecoinService,
    elgo: ElrondService,
    eth: EthereumService,
    flare: FlareService,
    flow: FlowService,
    one: HarmonyService,
    kcs: KuCoinService,
    klaytn: KlaytnService,
    ltc: LitecoinService,
    polygon: PolygonService,
    solana: SolanaService,
    optimism: OptimismService,
    tron: TronService,
    util: BlockchainUtilsService,
    gasPump: GasPumpService,
    vechain: VeChainService,
    xdc: XinFinService,
    xlm: StellarService,
    xrp: XrpService,
  },
  fee: BlockchainFeesService,
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
  virtualAccount: {
    account: BlockchainAddressesService,
    blockchain: BlockchainOperationsService,
    withdrawal: WithdrawalService,
  },
  security: MaliciousAddressService,
  kms: KeyManagementSystemService,
  exchangeRate: ExchangeRateService,
  tatum: ServiceUtilsService,
  custodial: CustodialManagedWalletsService,
  auction: AuctionService,
  gasPump: GasPumpService,
  data: {
    defi: DeFiApiService,
    wallet: WalletApiService,
    token: TokenApiService,
    nftService: NftApiService,
  },
}
