import {
  BlockchainAdaService,
  BlockchainAlgorandAlgoService,
  BlockchainBinanceService,
  BlockchainBitcoinCashService,
  BlockchainBitcoinService,
  BlockchainBscService,
  BlockchainCeloService,
  BlockchainDogecoinService,
  BlockchainElrondNetworkEgldService,
  BlockchainEthereumService,
  BlockchainFabricService,
  BlockchainFlowService,
  BlockchainFungibleTokenService,
  BlockchainHarmonyOneService,
  BlockchainKcsKcsService,
  BlockchainKlaytnService,
  BlockchainLitecoinService,
  BlockchainMarketplaceService,
  BlockchainMultiTokenErc1155Service,
  BlockchainNeoService,
  BlockchainNftService,
  BlockchainPolygonMaticService,
  BlockchainQtumService,
  BlockchainQuorumService,
  BlockchainRecordService,
  BlockchainScryptaService,
  BlockchainSolanaService,
  BlockchainTronService,
  BlockchainUtilsService,
  BlockchainVeChainService,
  BlockchainXdcNetworkXinFinService,
  BlockchainXlmService,
  BlockchainXrpService,
  LedgerAccountService,
  LedgerCustomerService,
  LedgerOrderBookService,
  LedgerSubscriptionService,
  LedgerTransactionService,
  LedgerVirtualCurrencyService,
  OffChainAccountService,
  OffChainBlockchainService,
  OffChainWithdrawalService,
  SecurityAddressService,
  SecurityKeyManagementSystemService,
  StorageIpfsService,
  TatumServiceService,
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

export type BtcBasedApiService =
  | BlockchainBitcoinService
  | BlockchainBitcoinCashService
  | BlockchainDogecoinService
  | BlockchainLitecoinService

export type EvmBasedApiService = BlockchainEthereumService | BlockchainCeloService

export const ApiServices = {
  blockchain: {
    ada: BlockchainAdaService,
    algo: BlockchainAlgorandAlgoService,
    bnb: BlockchainBinanceService,
    bitcoin: BlockchainBitcoinService,
    bcash: BlockchainBitcoinCashService,
    bsc: BlockchainBscService,
    celo: BlockchainCeloService,
    doge: BlockchainDogecoinService,
    elgo: BlockchainElrondNetworkEgldService,
    eth: BlockchainEthereumService,
    fabric: BlockchainFabricService,
    flow: BlockchainFlowService,
    one: BlockchainHarmonyOneService,
    kcs: BlockchainKcsKcsService,
    klaytn: BlockchainKlaytnService,
    ltc: BlockchainLitecoinService,
    neo: BlockchainNeoService,
    polygon: BlockchainPolygonMaticService,
    qtum: BlockchainQtumService,
    quorum: BlockchainQuorumService,
    scrypta: BlockchainScryptaService,
    solana: BlockchainSolanaService,
    tron: BlockchainTronService,
    utils: BlockchainUtilsService,
    vechain: BlockchainVeChainService,
    xdc: BlockchainXdcNetworkXinFinService,
    xlm: BlockchainXlmService,
    xrp: BlockchainXrpService,
  },
  ipfs: StorageIpfsService,
  fungibleToken: BlockchainFungibleTokenService,
  marketplace: BlockchainMarketplaceService,
  multiToken: BlockchainMultiTokenErc1155Service,
  nft: BlockchainNftService,
  record: BlockchainRecordService,
  ledger: {
    account: LedgerAccountService,
    customer: LedgerCustomerService,
    orderBook: LedgerOrderBookService,
    subscriptions: LedgerSubscriptionService,
    transaction: LedgerTransactionService,
    virtualCurrency: LedgerVirtualCurrencyService,
  },
  offChain: {
    account: OffChainAccountService,
    blockchain: OffChainBlockchainService,
    withdrawal: OffChainWithdrawalService,
  },
  security: SecurityAddressService,
  kms: SecurityKeyManagementSystemService,
  tatum: TatumServiceService,
}
