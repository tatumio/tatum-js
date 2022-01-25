import { btcWalletExample } from './app/btc.wallet.example'
import { btcApiExample } from './app/btc.api.example'
import { btcKmsExample } from './app/btc.kms.example'
import { btcLedgerAccountsExample } from './app/btc.ledger.example'
import { btcOffchainExample } from './app/btc.offchain.example'
import { exchangeRateExample } from './app/btc.root.example'
import { btcTransactionsExample } from './app/btc.tx.example'

console.log(`Running ${btcWalletExample()}`)
console.log(`Running ${btcApiExample()}`)
console.log(`Running ${btcKmsExample()}`)
console.log(`Running ${btcLedgerAccountsExample()}`)
console.log(`Running ${btcOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${btcTransactionsExample()}`)
