import { egldWalletExample } from './app/egld.wallet.example'
import { egldApiExample } from './app/egld.api.example'
import { egldKmsExample } from './app/egld.kms.example'
import {
  egldLedgerAccountExample,
  egldLedgerBlockAmountExample,
  egldLedgerCustomerExample,
  egldLedgerOrderBookExample,
  egldLedgerTransactionExample,
  egldLedgerVirtualCurrencyExample,
} from './app/egld.ledger.example'
import { egldOffchainExample } from './app/egld.offchain.example'
import { exchangeRateExample } from './app/egld.root.example'
import { egldBlockchainExample } from './app/egld.blockchain.example'
import { egldTxExample } from './app/egld.tx.example'

console.log(`Running ${egldWalletExample()}`)
console.log(`Running ${egldApiExample()}`)
console.log(`Running ${egldBlockchainExample()}`)
console.log(`Running ${egldKmsExample()}`)
console.log(`Running ${egldLedgerAccountExample()}`)
console.log(`Running ${egldLedgerBlockAmountExample()}`)
console.log(`Running ${egldLedgerCustomerExample()}`)
console.log(`Running ${egldLedgerOrderBookExample()}`)
console.log(`Running ${egldLedgerTransactionExample()}`)
console.log(`Running ${egldLedgerVirtualCurrencyExample()}`)
console.log(`Running ${egldOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${egldTxExample()}`)
