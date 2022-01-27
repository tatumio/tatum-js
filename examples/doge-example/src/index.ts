import { dogeWalletExample } from './app/doge.wallet.example'
import { dogeApiExample } from './app/doge.api.example'
import { dogeKmsExample } from './app/doge.kms.example'
import {
  dogeLedgerAccountsExample,
  dogeLedgerBlockAmountExample,
  dogeLedgerCustomerExample,
  dogeLedgerOrderBookExample,
  dogeLedgerTransactionExample,
  dogeLedgerVirtualCurrencyExample,
} from './app/doge.ledger.example'
import { dogeOffchainExample } from './app/doge.offchain.example'
import { exchangeRateExample } from './app/doge.root.example'
import { dogeTransactionsExample } from './app/doge.tx.example'

console.log(`Running ${dogeWalletExample()}`)
console.log(`Running ${dogeApiExample()}`)
console.log(`Running ${dogeKmsExample()}`)
console.log(`Running ${dogeLedgerAccountsExample()}`)
console.log(`Running ${dogeLedgerBlockAmountExample()}`)
console.log(`Running ${dogeLedgerCustomerExample()}`)
console.log(`Running ${dogeLedgerOrderBookExample()}`)
console.log(`Running ${dogeLedgerTransactionExample()}`)
console.log(`Running ${dogeLedgerVirtualCurrencyExample()}`)
console.log(`Running ${dogeOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${dogeTransactionsExample()}`)
