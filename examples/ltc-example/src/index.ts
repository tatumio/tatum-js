import { ltcWalletExample } from './app/ltc.wallet.example'
import { ltcBlockchainExample } from './app/ltc.blockchain.example'
import { exchangeRateExample } from './app/ltc.root.example'
import { ltcTransactionsExample } from './app/ltc.tx.example'
import { ltcSubscriptionsExample } from './app/ltc.subscriptions.example'
import { ltcVirtualAccountExample } from './app/ltc.virtualAccount.example'
import { ltcBalanceExample } from './app/ltc.balance.example'
import { ltcEstimateExample } from './app/ltc.estimate.example'

console.log(`Running ${ltcWalletExample()}`)
console.log(`Running ${ltcBlockchainExample()}`)
console.log(`Running ${ltcBalanceExample()}`)
console.log(`Running ${ltcSubscriptionsExample()}`)
console.log(`Running ${ltcVirtualAccountExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${ltcEstimateExample()}`)
console.log(`Running ${ltcTransactionsExample()}`)
