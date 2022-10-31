import { ethWalletExample } from './app/eth.wallet.example'
import { ethKmsExample } from './app/eth.kms.example'
import { ethVirtualAccountExample } from './app/eth.virtualAccount.example'
import { ethSubscriptionsExample } from './app/eth.subscriptions.example'
import { ethTxWithPrivateKeyExample, ethTxWithSignatureIdExample } from './app/eth.tx.example'
import { ethBalanceExample } from './app/eth.balance.example'

console.log(`Running ${ethWalletExample()}`)
console.log(`Running ${ethKmsExample()}`)
console.log(`Running ${ethVirtualAccountExample()}`)
console.log(`Running ${ethSubscriptionsExample()}`)
console.log(`Running ${ethTxWithPrivateKeyExample()}`)
console.log(`Running ${ethTxWithSignatureIdExample()}`)
console.log(`Running ${ethBalanceExample()}`)
