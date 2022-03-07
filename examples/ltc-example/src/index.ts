import { ltcWalletExample } from './app/ltc.wallet.example'
import { ltcBlockchainExample } from './app/ltc.blockchain.example'
import { ltcKmsExample } from './app/ltc.kms.example'
import {
  ltcLedgerAccountsExample,
  ltcLedgerBlockAmountExample,
  ltcLedgerCustomerExample,
  ltcLedgerOrderBookExample,
  ltcLedgerTransactionExample,
  ltcLedgerVirtualCurrencyExample,
} from './app/ltc.ledger.example'
import { ltcOffchainExample } from './app/ltc.offchain.example'
import { exchangeRateExample } from './app/ltc.root.example'
import { ltcTransactionsExample } from './app/ltc.tx.example'

console.log(`Running ${ltcWalletExample()}`)
console.log(`Running ${ltcBlockchainExample()}`)
console.log(`Running ${ltcKmsExample()}`)
console.log(`Running ${ltcLedgerAccountsExample()}`)
console.log(`Running ${ltcLedgerBlockAmountExample()}`)
console.log(`Running ${ltcLedgerCustomerExample()}`)
console.log(`Running ${ltcLedgerOrderBookExample()}`)
console.log(`Running ${ltcLedgerTransactionExample()}`)
console.log(`Running ${ltcLedgerVirtualCurrencyExample()}`)
console.log(`Running ${ltcOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${ltcTransactionsExample()}`)
