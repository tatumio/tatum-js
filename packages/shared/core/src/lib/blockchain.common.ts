import {
  Blockchain,
  BtcBasedBlockchain,
  BtcBasedBlockchains,
  EvmBasedBlockchain,
  EvmBasedBlockchains,
} from './models/Blockchain'

import { Currency, NativeCurrency } from './models/Currency'
import {
  BlockchainToNativeCurrencyMapping,
  CurrencyToBlockchainMapping,
} from './models/BlockchainCurrencyMapping'

export const blockchainHelper = {
  isBtcBased: (blockchain: Blockchain): blockchain is BtcBasedBlockchain =>
    BtcBasedBlockchains.includes(blockchain),
  isEvmBased: (blockchain: Blockchain): blockchain is EvmBasedBlockchain =>
    EvmBasedBlockchains.includes(blockchain),
  getBlockchainByCurrency: (currency: Currency): Blockchain => {
    const blockchain = CurrencyToBlockchainMapping[currency]
    if (!blockchain) throw new Error(`Blockchain for currency ${currency} not found `)
    return blockchain
  },
  getDefaultCurrencyByBlockchain: (blockchain: Blockchain): NativeCurrency => {
    const currency = BlockchainToNativeCurrencyMapping[blockchain]
    if (!currency) throw new Error(`Currency for blockchain ${blockchain} not found`)
    return currency
  },
}
