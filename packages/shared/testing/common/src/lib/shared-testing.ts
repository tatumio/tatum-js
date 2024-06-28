import { ETH_TEST_DATA } from './test-data/eth.test-data'
import { BTC_TEST_DATA } from './test-data/btc.test-data'
import { DOGE_TEST_DATA } from './test-data/doge.test-data'
import { CELO_TEST_DATA } from './test-data/celo.test-data'
import { BCH_TEST_DATA } from './test-data/bch.test-data'
import { LTC_TEST_DATA } from './test-data/ltc.test-data'
import { POLYGON_TEST_DATA } from './test-data/polygon.test-data'
import { KCS_TEST_DATA } from './test-data/kcs.test-data'
import { ONE_TEST_DATA } from './test-data/one.test-data'
import { BSC_TEST_DATA } from './test-data/bsc.test-data'
import { XRP_TEST_DATA } from './test-data/xrp.test-data'
import { XLM_TEST_DATA } from './test-data/xlm.test-data'
import { SCRYPTA_TEST_DATA } from './test-data/scrypta.test-data'
import { FLOW_TEST_DATA } from './test-data/flow.test-data'
import { SOLANA_TEST_DATA } from './test-data/solana.test-data'
import { TRON_TEST_DATA } from './test-data/tron.test-data'
import { KLAYTN_TEST_DATA } from './test-data/klaytn.test-data'
import { ALGO_TEST_DATA } from './test-data/algo.test-data'
import { EGLD_TEST_DATA } from './test-data/egld.test-data'
import { XDC_TEST_DATA } from './test-data/xdc.test-data'

export type BlockchainNetworkTestData = {
  XPUB: string
  XPUB_REGEX: RegExp
  ADDRESS_0: string
  ADDRESS_100: string
  PRIVATE_KEY_0: string
  PRIVATE_KEY_100: string
  CONTRACT_ADDRESS?: string
  SERIALIZED_TX?: string
  ERC_20?: {
    CONTRACT_ADDRESS: string
    PRIVATE_KEY: string
    ADDRESS: string
  }
  PROVIDER?: string
  ERC_721?: {
    PRIVATE_KEY: string
    CONTRACT_ADDRESS: string
    ADDRESS?: string
  }
  MULTITOKEN?: {
    PRIVATE_KEY: string
    CONTRACT_ADDRESS: string
    ADDRESS?: string
  }
  SMART_CONTRACT?: {
    PRIVATE_KEY: string
    CONTRACT_ADDRESS: string
  }
  CUSTODIAL?: {
    PRIVATE_KEY: string
    SIGNATURE_ID: string
    CONTRACT_ADDRESS: string
    TOKEN_ADDRESS: string
    SLAVE_ADDRESS?: string
    MASTER_ADDRESS?: string
  }
}

export interface BlockchainTestData {
  MAINNET: BlockchainNetworkTestData
  TESTNET: BlockchainNetworkTestData
  TX_HASH: string
  BLOCK_HASH: string
  BLOCK_HEIGHT: number
  INVALID_XPUB_ERROR: string
  INVALID_XPUB_CHILD_INDEX_ERROR: string
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: string
  INVALID_PRIVATE_KEY_ERROR: string
  PROVIDER?: string
  AUCTIONS?: any
}

export const TEST_DATA = {
  MNEMONIC:
    'kit erase harsh crawl taste rebel bus ocean traffic vast undo street patrol around network deputy wage usage aware void float snake baby sister',
  ETH: ETH_TEST_DATA,
  BTC: BTC_TEST_DATA,
  DOGE: DOGE_TEST_DATA,
  CELO: CELO_TEST_DATA,
  BCH: BCH_TEST_DATA,
  LTC: LTC_TEST_DATA,
  POLYGON: POLYGON_TEST_DATA,
  KLAYTN: KLAYTN_TEST_DATA,
  KCS: KCS_TEST_DATA,
  ONE: ONE_TEST_DATA,
  BSC: BSC_TEST_DATA,
  XRP: XRP_TEST_DATA,
  XLM: XLM_TEST_DATA,
  XDC: XDC_TEST_DATA,
  SCRYPTA: SCRYPTA_TEST_DATA,
  FLOW: FLOW_TEST_DATA,
  SOLANA: SOLANA_TEST_DATA,
  TRON: TRON_TEST_DATA,
  ALGO: ALGO_TEST_DATA,
  EGLD: EGLD_TEST_DATA,
  FLR: ETH_TEST_DATA,
  CRO: ETH_TEST_DATA,
  BASE: ETH_TEST_DATA,
  AVAX: ETH_TEST_DATA,
  OPTIMISM: ETH_TEST_DATA,
  FTM: ETH_TEST_DATA,
}

export function expectHexString(value: string): void {
  expect(value).toBeDefined()
  expect(value).toMatch(/^(0x|0X)?[a-fA-F0-9]+$/)
}

/**
 * @deprecated Replace it with API key from https://tatum.io/
 */
export const REPLACE_ME_WITH_TATUM_API_KEY = process.env['TATUM_API_KEY'] as string
