import { kcsBlockchainExample } from './app/kcs.blockchain.example'
import { kcsKmsExample } from './app/kcs.kms.example'
import { kcsLogRecordExample } from './app/kcs.log.example'
import { kcsChangeRateExample } from './app/kcs.root.example'
import { kcsWalletExample } from './app/kcs.wallet.example'
import { kcsDriverExample, kcsWeb3Example } from './app/kcs.web3.example'
import { kcsOffchainExample } from './app/kcs.offchain.example'
import { kcsSubscriptionsExample } from './app/kcs.subscriptions.example'
import { kcsTxWithPrivateKeyExample, kcsTxWithSignatureIdExample } from './app/kcs.tx.example'
import { kcsAuctionExample } from './app/kcs.auction.example'

console.log(`Running ${kcsWalletExample()}`)
console.log(`Running ${kcsBlockchainExample()}`)
console.log(`Running ${kcsKmsExample()}`)
console.log(`Running ${kcsLogRecordExample()}`)
console.log(`Running ${kcsChangeRateExample()}`)
console.log(`Running ${kcsDriverExample()}`)
console.log(`Running ${kcsWeb3Example()}`)
console.log(`Running ${kcsOffchainExample()}`)
console.log(`Running ${kcsSubscriptionsExample()}`)
console.log(`Runninf ${kcsTxWithPrivateKeyExample()}`)
console.log(`Runninf ${kcsTxWithSignatureIdExample()}`)
console.log(`Running ${kcsAuctionExample()}`)
