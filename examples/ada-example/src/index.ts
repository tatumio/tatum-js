import { adaWalletExample } from './app/ada.wallet.example'
import { adaBlockchainExample } from './app/ada.blockchain.example'
import { adaKmsExample } from './app/ada.kms.example'
import {
  adaLedgerAccountsExample,
  adaLedgerBlockAmountExample,
  adaLedgerCustomerExample,
  adaLedgerOrderbookExample,
  adaLedgerTransactionExample,
} from './app/ada.ledger.example'
import { adaOffchainExample } from './app/ada.offchain.example'
import { exchangeRateExample } from './app/ada.root.example'
// import { adaTransactionsExample } from './app/ada.tx.example'

console.log(`Running ${adaWalletExample()}`)
console.log(`Running ${adaBlockchainExample()}`)
console.log(`Running ${adaKmsExample()}`)
console.log(`Running ${adaLedgerAccountsExample()}`)
console.log(`Running ${adaLedgerBlockAmountExample()}`)
console.log(`Running ${adaLedgerCustomerExample()}`)
console.log(`Running ${adaLedgerOrderbookExample()}`)
console.log(`Running ${adaLedgerTransactionExample()}`)
console.log(`Running ${adaOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
// console.log(`Running ${adaTransactionsExample()}`)
