import { Blockchain } from './Blockchain'
import {
  BSC_BASED_CURRENCIES,
  CELO_CURRENCIES,
  Currency,
  ETH_BASED_CURRENCIES,
  FLOW_CURRENCIES,
  MATIC_BASED_CURRENCIES,
  NativeCurrency,
  TRON_CURRENCIES,
} from '@tatumio/api-client'

export const BlockchainCurrencyMapping: Record<
  Blockchain,
  NativeCurrency | { nativeCurrency: NativeCurrency; currencies: Currency[] }
> = {
  BTC: Currency.BTC,
  LTC: Currency.LTC,
  DOGE: Currency.DOGE,
  BCH: Currency.BCH,
  FABRIC: Currency.FABRIC,
  QUORUM: Currency.QUORUM,
  SOL: Currency.SOL,
  TRON: {
    nativeCurrency: Currency.TRON,
    currencies: TRON_CURRENCIES,
  },
  FLOW: {
    nativeCurrency: Currency.FLOW,
    currencies: FLOW_CURRENCIES,
  },
  CELO: {
    nativeCurrency: Currency.CELO,
    currencies: CELO_CURRENCIES,
  },
  HARMONY: Currency.ONE,
  QTUM: Currency.QTUM,
  EGLD: Currency.EGLD,
  ETH: {
    nativeCurrency: Currency.ETH,
    currencies: ETH_BASED_CURRENCIES,
  },
  BSC: {
    nativeCurrency: Currency.ETH,
    currencies: BSC_BASED_CURRENCIES,
  },
  POLYGON: {
    nativeCurrency: Currency.MATIC,
    currencies: MATIC_BASED_CURRENCIES,
  },
  XDC: Currency.XDC,
  XRP: Currency.XRP,
  XLM: Currency.XLM,
  VET: Currency.VET,
  NEO: Currency.NEO,
  SCRYPTA: Currency.LYRA,
  CARDANO: Currency.ADA,
  ALGO: Currency.ALGO,
  KCS: Currency.KCS,
}

export const CurrencyToBlockchainMapping: Record<Currency, Blockchain> = buildCurrencyBlockchainMapping()
export const BlockchainToNativeCurrencyMapping: Record<Blockchain, NativeCurrency> =
  buildBlockchainDefaultCurrencyMapping()

function buildBlockchainDefaultCurrencyMapping(): Record<Blockchain, Currency> {
  return (Object.keys(BlockchainCurrencyMapping) as Blockchain[])
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
  return (Object.keys(BlockchainCurrencyMapping) as Blockchain[])
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
