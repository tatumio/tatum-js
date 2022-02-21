import { ethWalletExample } from './app/eth.wallet.example'
import { ethKmsExample } from './app/eth.kms.example'
import {
  ethLedgerAccountExample,
  ethLedgerBlockAmountExample,
  ethLedgerCustomerExample,
  ethLedgerOrderBookExample,
  ethLedgerTransactionExample,
  ethLedgerVirtualCurrencyExample,
} from './app/eth.ledger.example'
import { ethOffchainExample } from './app/eth.offchain.example'
import { exchangeRateExample } from './app/eth.root.example'
import { ethSubscriptionsExample } from './app/eth.subscriptions.example'
import { ethTxWithPrivateKeyExample, ethTxWithSignatureIdExample } from './app/eth.tx.example'
import { ethAuctionExample } from './app/eth.auction.example'

console.log(`Running ${ethAuctionExample()}`)
console.log(`Running ${ethWalletExample()}`)
console.log(`Running ${ethKmsExample()}`)
console.log(`Running ${ethLedgerAccountExample()}`)
console.log(`Running ${ethLedgerBlockAmountExample()}`)
console.log(`Running ${ethLedgerCustomerExample()}`)
console.log(`Running ${ethLedgerOrderBookExample()}`)
console.log(`Running ${ethLedgerTransactionExample()}`)
console.log(`Running ${ethLedgerVirtualCurrencyExample()}`)
console.log(`Running ${ethOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${ethSubscriptionsExample()}`)
console.log(`Runninf ${ethTxWithPrivateKeyExample()}`)
console.log(`Runninf ${ethTxWithSignatureIdExample()}`)
