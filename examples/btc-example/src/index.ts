import { btcWalletExample } from './app/btc.wallet.example'
import { btcKmsExample } from './app/btc.kms.example'
import {
  btcLedgerAccountsExample,
  btcLedgerBlockAmountExample,
  btcLedgerCustomerExample,
  btcLedgerOrderBookExample,
  btcLedgerTransactionExample,
  btcLedgerVirtualCurrencyExample,
} from './app/btc.ledger.example'
import { btcOffchainExample } from './app/btc.offchain.example'
import { exchangeRateExample } from './app/btc.root.example'
import { btcTransactionsExample } from './app/btc.tx.example'

console.log(`Running ${btcWalletExample()}`)
console.log(`Running ${btcKmsExample()}`)
console.log(`Running ${btcLedgerAccountsExample()}`)
console.log(`Running ${btcLedgerBlockAmountExample()}`)
console.log(`Running ${btcLedgerCustomerExample()}`)
console.log(`Running ${btcLedgerOrderBookExample()}`)
console.log(`Running ${btcLedgerTransactionExample()}`)
console.log(`Running ${btcLedgerVirtualCurrencyExample()}`)
console.log(`Running ${btcOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${btcTransactionsExample()}`)
