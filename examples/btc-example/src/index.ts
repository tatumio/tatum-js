import { btcWalletExample } from './app/btc.wallet.example'
import { btcBlockchainExample } from './app/btc.blockchain.example'
import { exchangeRateExample } from './app/btc.root.example'
import { btcFromAddressTransactionsExample } from './app/btc.tx.fromAddress.example'
import { btcFromUtxoTransactionsExample } from './app/btc.tx.fromUtxo.example'
import { btcBalanceExample } from './app/btc.balance.example'
import { btcEstimateExample } from './app/btc.estimate.example'
import { btcSubscriptionsExample } from './app/btc.subscriptions.example'
import { btcVirtualAccountExample } from './app/btc.virtualAccount.example'

console.log(`Running ${btcBalanceExample()}`)
console.log(`Running ${btcBlockchainExample()}`)
console.log(`Running ${btcEstimateExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${btcSubscriptionsExample()}`)
console.log(`Running ${btcWalletExample()}`)
console.log(`Running ${btcFromAddressTransactionsExample()}`)
console.log(`Running ${btcFromUtxoTransactionsExample()}`)
console.log(`Running ${btcVirtualAccountExample()}`)
console.log(`Running ${btcWalletExample()}`)
