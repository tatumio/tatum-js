import { xlmApiExample } from './app/xlm.api.example'
import { xlmBlockchainExample } from './app/xlm.blockchain.example'
import { xlmKmsExample } from './app/xlm.kms.example'
import { xlmChangeRateExample } from './app/xlm.root.example'
import { xlmOffchainExample } from './app/xlm.offchain.example'
import { xlmTxExample } from './app/xlm.tx.example'
import { xlmWalletExample } from './app/xlm.wallet.example'
import {
  xlmLedgerAccountExample,
  xlmLedgerBlockAmountExample,
  xlmLedgerCustomerExample,
  xlmLedgerOrderBookExample,
  xlmLedgerTransactionExample,
  xlmLedgerVirtualCurrencyExample,
} from './app/xlm.ledger.example'

console.log(`Running ${xlmApiExample()}`)
console.log(`Running ${xlmBlockchainExample()}`)
console.log(`Running ${xlmKmsExample()}`)
console.log(`Running ${xlmLedgerAccountExample()}`)
console.log(`Running ${xlmLedgerBlockAmountExample()}`)
console.log(`Running ${xlmLedgerCustomerExample()}`)
console.log(`Running ${xlmLedgerOrderBookExample()}`)
console.log(`Running ${xlmLedgerTransactionExample()}`)
console.log(`Running ${xlmLedgerVirtualCurrencyExample()}`)
console.log(`Running ${xlmOffchainExample()}`)
console.log(`Running ${xlmChangeRateExample()}`)
console.log(`Running ${xlmTxExample()}`)
console.log(`Running ${xlmWalletExample()}`)
