import { xdcBlockchainExample } from './app/xdc.blockchain.example'
import { xdcKmsExample } from './app/xdc.kms.example'
import { xdcWalletExample } from './app/xdc.wallet.example'
import { xdcVirtualAccountExample } from './app/xdc.virtualAccount.example'
import { xdcSubscriptionsExample } from './app/xdc.subscriptions.example'
import { xdcBalanceExample } from './app/xdc.balance.example'

console.log(`Running ${xdcWalletExample()}`)
console.log(`Running ${xdcBlockchainExample()}`)
console.log(`Running ${xdcKmsExample()}`)
console.log(`Running ${xdcVirtualAccountExample()} `)
console.log(`Running ${xdcSubscriptionsExample()}`)
console.log(`Running ${xdcBalanceExample()}`)
