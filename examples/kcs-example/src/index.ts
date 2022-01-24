import { kcsApiExample } from './app/kcs.api.example'
import { kcsBlockchainExample } from './app/kcs.blockchain.example'
import { kcsKmsExample } from './app/kcs.kms.example'
import { kcsLogRecordExample } from './app/kcs.log.example'
import { kcsChangeRateExample } from './app/kcs.root.example'
import { kcsWalletExample } from './app/kcs.wallet.example'
import { kcsDriverExample, kcsWeb3Example } from './app/kcs.web3.example'

console.log(`Running ${kcsApiExample()}`)
console.log(`Running ${kcsWalletExample()}`)
console.log(`Running ${kcsBlockchainExample()}`)
console.log(`Running ${kcsKmsExample()}`)
console.log(`Running ${kcsLogRecordExample()}`)
console.log(`Running ${kcsChangeRateExample()}`)
console.log(`Running ${kcsDriverExample()}`)
console.log(`Running ${kcsWeb3Example()}`)
