import { xrpApiExample } from './app/xrp.api.example'
import { xrpBlockchainExample } from './app/xrp.blockchain.example'
import { xrpKmsExample } from './app/xrp.kms.example'
import { xrpChangeRateExample } from './app/xrp.root.example'
import { xrpOffchainExample } from './app/xrp.offchain.example'
import { xrpTxExample } from './app/xrp.tx.example'
import { xrpWalletExample } from './app/xrp.wallet.example'
import {
  xrpLedgerAccountExample,
  xrpLedgerBlockAmountExample,
  xrpLedgerCustomerExample,
  xrpLedgerOrderBookExample,
  xrpLedgerTransactionExample,
  xrpLedgerVirtualCurrencyExample,
} from './app/xrp.ledger.example'

console.log(`Running ${xrpApiExample()}`)
console.log(`Running ${xrpBlockchainExample()}`)
console.log(`Running ${xrpKmsExample()}`)
console.log(`Running ${xrpLedgerAccountExample()}`)
console.log(`Running ${xrpLedgerBlockAmountExample()}`)
console.log(`Running ${xrpLedgerCustomerExample()}`)
console.log(`Running ${xrpLedgerOrderBookExample()}`)
console.log(`Running ${xrpLedgerTransactionExample()}`)
console.log(`Running ${xrpLedgerVirtualCurrencyExample()}`)
console.log(`Running ${xrpOffchainExample()}`)
console.log(`Running ${xrpChangeRateExample()}`)
console.log(`Running ${xrpTxExample()}`)
console.log(`Running ${xrpWalletExample()}`)
