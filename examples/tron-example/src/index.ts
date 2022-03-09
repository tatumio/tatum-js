import { tronWalletExample } from './app/tron.wallet.example'
import { tronKmsExample } from './app/tron.kms.example'
import { tronOffchainExample } from './app/tron.offchain.example'
import { exchangeRateExample } from './app/tron.root.example'
import { tronSubscriptionsExample } from './app/tron.subscriptions.example'
import { tronTxWithPrivateKeyExample, tronTxWithSignatureIdExample } from './app/tron.tx.example'

console.log(`Running ${tronWalletExample()}`)
console.log(`Running ${tronKmsExample()}`)
console.log(`Running ${tronOffchainExample()}`)
console.log(`Running ${exchangeRateExample()}`)
console.log(`Running ${tronSubscriptionsExample()}`)
console.log(`Runninf ${tronTxWithPrivateKeyExample()}`)
console.log(`Runninf ${tronTxWithSignatureIdExample()}`)
