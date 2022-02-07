import { tronWalletExample } from './app/tron.wallet.example'
import { tronApiExample } from './app/tron.api.example'
import { tronKmsExample } from './app/tron.kms.example'
import {
  tronLedgerAccountExample,
  tronLedgerBlockAmountExample,
  tronLedgerCustomerExample,
  tronLedgerOrderBookExample,
  tronLedgerTransactionExample,
  tronLedgerVirtualCurrencyExample,
} from './app/tron.ledger.example'
import { tronOffchainExample } from './app/tron.offchain.example'
import { exchangeRateExample } from './app/tron.root.example'
import { tronSubscriptionsExample } from './app/tron.subscriptions.example'
import { tronTxWithPrivateKeyExample, tronTxWithSignatureIdExample } from './app/tron.tx.example'

console.log(`Running ${tronWalletExample()}`)
console.log(`Running ${tronApiExample()}`)
console.log(`Running ${tronKmsExample()}`)
console.log(`Running ${tronLedgerAccountExample()}`)
console.log(`Running ${tronLedgerBlockAmountExample()}`)
console.log(`Running ${tronLedgerCustomerExample()}`)
console.log(`Running ${tronLedgerOrderBookExample()}`)
console.log(`Running ${tronLedgerTransactionExample()}`)
console.log(`Running ${tronLedgerVirtualCurrencyExample()}`)
console.log(`Running ${tronOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${tronSubscriptionsExample()}`)
console.log(`Runninf ${tronTxWithPrivateKeyExample()}`)
console.log(`Runninf ${tronTxWithSignatureIdExample()}`)
