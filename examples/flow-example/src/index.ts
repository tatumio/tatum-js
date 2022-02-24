import { flowApiExample } from './app/flow.api.example'
import { flowBlockchainExample } from './app/flow.blockchain.example'
import { flowKmsExample } from './app/flow.kms.example'
import { flowChangeRateExample } from './app/flow.root.example'
import { flowOffchainExample } from './app/flow.offchain.example'
import { flowTxExample } from './app/flow.tx.example'
import { flowWalletExample } from './app/flow.wallet.example'
import {
  flowLedgerAccountExample,
  flowLedgerBlockAmountExample,
  flowLedgerCustomerExample,
  flowLedgerOrderBookExample,
  flowLedgerTransactionExample,
  flowLedgerVirtualCurrencyExample,
} from './app/flow.ledger.example'

console.log(`Running ${flowApiExample()}`)
console.log(`Running ${flowBlockchainExample()}`)
console.log(`Running ${flowKmsExample()}`)
console.log(`Running ${flowLedgerAccountExample()}`)
console.log(`Running ${flowLedgerBlockAmountExample()}`)
console.log(`Running ${flowLedgerCustomerExample()}`)
console.log(`Running ${flowLedgerOrderBookExample()}`)
console.log(`Running ${flowLedgerTransactionExample()}`)
console.log(`Running ${flowLedgerVirtualCurrencyExample()}`)
console.log(`Running ${flowOffchainExample()}`)
console.log(`Running ${flowChangeRateExample()}`)
console.log(`Running ${flowTxExample()}`)
console.log(`Running ${flowWalletExample()}`)
