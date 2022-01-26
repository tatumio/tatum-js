import { bchWalletExample } from './app/bch.wallet.example'
import { bchApiExample } from './app/bch.api.example'
import { bchKmsExample } from './app/bch.kms.example'
import {
  bchLedgerAccountsExample,
  bchLedgerBlockAmountExample,
  bchLedgerCustomerExample,
  bchLedgerOrderbookExample,
  bchLedgerTransactionExample,
  bchLedgerVirtualCurrencyExample,
} from './app/bch.ledger.example'
import { bchOffchainExample } from './app/bch.offchain.example'
import { exchangeRateExample } from './app/bch.root.example'
import { bchTransactionsExample } from './app/bch.tx.example'

console.log(`Running ${bchWalletExample()}`)
console.log(`Running ${bchApiExample()}`)
console.log(`Running ${bchKmsExample()}`)
console.log(`Running ${bchLedgerAccountsExample()}`)
console.log(`Running ${bchLedgerBlockAmountExample()}`)
console.log(`Running ${bchLedgerCustomerExample()}`)
console.log(`Running ${bchLedgerOrderbookExample()}`)
console.log(`Running ${bchLedgerTransactionExample()}`)
console.log(`Running ${bchLedgerVirtualCurrencyExample()}`)
console.log(`Running ${bchOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${bchTransactionsExample()}`)
