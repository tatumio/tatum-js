import { kcsApiExample } from './app/kcs.api.example'
import { kcsBlockchainExample } from './app/kcs.blockchain.example'
import { kcsKmsExample } from './app/kcs.kms.example'
import { kcsLogRecordExample } from './app/kcs.log.example'
import { kcsChangeRateExample } from './app/kcs.root.example'
import { kcsWalletExample } from './app/kcs.wallet.example'
import { kcsDriverExample, kcsWeb3Example } from './app/kcs.web3.example'
import {
  kcsLedgerAccountExample,
  kcsLedgerBlockAmountExample,
  kcsLedgerCustomerExample,
  kcsLedgerOrderBookExample,
  kcsLedgerTransactionExample,
} from './app/kcs.ledger.example'
import { kcsOffchainExample } from './app/kcs.offchain.example'
import { kcsSubscriptionsExample } from './app/kcs.subscriptions.example'
import { kcsTxWithPrivateKeyExample, kcsTxWithSignatureIdExample } from './app/kcs.tx.example'

console.log(`Running ${kcsApiExample()}`)
console.log(`Running ${kcsWalletExample()}`)
console.log(`Running ${kcsBlockchainExample()}`)
console.log(`Running ${kcsKmsExample()}`)
console.log(`Running ${kcsLogRecordExample()}`)
console.log(`Running ${kcsChangeRateExample()}`)
console.log(`Running ${kcsDriverExample()}`)
console.log(`Running ${kcsWeb3Example()}`)
console.log(`Running ${kcsLedgerAccountExample()}`)
console.log(`Running ${kcsLedgerBlockAmountExample()}`)
console.log(`Running ${kcsLedgerCustomerExample()}`)
console.log(`Running ${kcsLedgerOrderBookExample()}`)
console.log(`Running ${kcsLedgerTransactionExample()}`)
console.log(`Running ${kcsOffchainExample()}`)
console.log(`Running ${kcsSubscriptionsExample()}`)
console.log(`Runninf ${kcsTxWithPrivateKeyExample()}`)
console.log(`Runninf ${kcsTxWithSignatureIdExample()}`)
