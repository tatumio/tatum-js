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

export type BlockchainNetworkTestData = {
  XPUB: string
  XPUB_REGEX: RegExp
  ADDRESS_0: string
  ADDRESS_100: string
  PRIVATE_KEY_0: string
  PRIVATE_KEY_100: string
  CONTRACT_ADDRESS?: string
  ERC_20?: {
    ADDRESS: string
  }
}

export interface BlockchainTestData {
  MAINNET: BlockchainNetworkTestData
  TESTNET: BlockchainNetworkTestData
  INVALID_XPUB_ERROR: string
  INVALID_XPUB_CHILD_INDEX_ERROR: string
  INVALID_PRIVATE_KEY_CHILD_INDEX_ERROR: string
  INVALID_PRIVATE_KEY_ERROR: string
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
  KCS: KCS_TEST_DATA,
  ONE: ONE_TEST_DATA,
  BSC: BSC_TEST_DATA,
  XRP: XRP_TEST_DATA,
}

/**
 * @deprecated Replace it with API key from https://tatum.io/
 */
export const REPLACE_ME_WITH_TATUM_API_KEY = process.env['TATUM_API_KEY'] as string
