import { Blockchain } from './Blockchain'
import {
  BSC_BASED_CURRENCIES,
  CELO_CURRENCIES,
  Currency,
  ETH_BASED_CURRENCIES,
  FLOW_CURRENCIES,
  NativeCurrency,
  MATIC_BASED_CURRENCIES,
  TRON_CURRENCIES,
} from './Currency'

export const BlockchainCurrencyMapping: Record<
  Blockchain,
  NativeCurrency | { nativeCurrency: NativeCurrency; currencies: Currency[] }
> = {
  [Blockchain.BTC]: Currency.BTC,
  [Blockchain.LTC]: Currency.LTC,
  [Blockchain.DOGE]: Currency.DOGE,
  [Blockchain.BCH]: Currency.BCH,
  [Blockchain.FABRIC]: Currency.FABRIC,
  [Blockchain.QUORUM]: Currency.QUORUM,
  [Blockchain.SOL]: Currency.SOL,
  [Blockchain.TRON]: {
    nativeCurrency: Currency.TRON,
    currencies: TRON_CURRENCIES,
  },
  [Blockchain.FLOW]: {
    nativeCurrency: Currency.FLOW,
    currencies: FLOW_CURRENCIES,
  },
  [Blockchain.CELO]: {
    nativeCurrency: Currency.CELO,
    currencies: CELO_CURRENCIES,
  },
  [Blockchain.HARMONY]: Currency.ONE,
  [Blockchain.QTUM]: Currency.QTUM,
  [Blockchain.EGLD]: Currency.EGLD,
  [Blockchain.ETH]: {
    nativeCurrency: Currency.ETH,
    currencies: ETH_BASED_CURRENCIES,
  },
  [Blockchain.BSC]: {
    nativeCurrency: Currency.ETH,
    currencies: BSC_BASED_CURRENCIES,
  },
  [Blockchain.POLYGON]: {
    nativeCurrency: Currency.MATIC,
    currencies: MATIC_BASED_CURRENCIES,
  },
  [Blockchain.XDC]: Currency.XDC,
  [Blockchain.XRP]: Currency.XRP,
  [Blockchain.XLM]: Currency.XLM,
  [Blockchain.VET]: Currency.VET,
  [Blockchain.NEO]: Currency.NEO,
  [Blockchain.LYRA]: Currency.LYRA,
  [Blockchain.CARDANO]: Currency.ADA,
  [Blockchain.ALGO]: Currency.ALGO,
}

export const CurrencyToBlockchainMapping: Record<Currency, Blockchain> = buildCurrencyBlockchainMapping()
export const BlockchainToNativeCurrencyMapping: Record<Blockchain, NativeCurrency> =
  buildBlockchainDefaultCurrencyMapping()

function buildBlockchainDefaultCurrencyMapping(): Record<Blockchain, Currency> {
  return Object.keys(BlockchainCurrencyMapping)
    .map((blockchain: Blockchain) => {
      const value = BlockchainCurrencyMapping[blockchain]
      if (typeof value === 'object') return { [blockchain]: value.nativeCurrency }
      return { [blockchain]: value }
    })
    .reduce(
      (obj, item) => ({
        ...obj,
        ...item,
      }),
      {},
    ) as Record<Blockchain, Currency>
}

function buildCurrencyBlockchainMapping(): Record<Currency, Blockchain> {
  return Object.keys(BlockchainCurrencyMapping)
    .map((blockchain: Blockchain) => {
      const value = BlockchainCurrencyMapping[blockchain]

      if (typeof value === 'object') {
        return value.currencies.map((c) => ({
          [c]: blockchain,
        }))
      }

      return { [value]: blockchain }
    })
    .reduce(
      (obj, item) => ({
        ...obj,
        ...item,
      }),
      {},
    ) as Record<Currency, Blockchain>
}
