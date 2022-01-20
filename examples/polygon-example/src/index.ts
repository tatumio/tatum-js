import { polygonApiExample } from './app/polygon.api.example'
import { polygonBlockchainExample } from './app/polygon.blockchain.example'
import { polygonKmsExample } from './app/polygon.kms.example'
import { polygonLogRecordExample } from './app/polygon.log.example'
import { polygonChangeRateExample } from './app/polygon.root.example'
import { polygonWalletExample } from './app/polygon.wallet.example'
import { polygonDriverExample, polygonWeb3Example } from './app/polygon.web3.example'

console.log(`Running ${polygonApiExample()}`)
console.log(`Running ${polygonWalletExample()}`)
console.log(`Running ${polygonBlockchainExample()}`)
console.log(`Running ${polygonKmsExample()}`)
console.log(`Running ${polygonLogRecordExample()}`)
console.log(`Running ${polygonChangeRateExample()}`)
console.log(`Running ${polygonDriverExample()}`)
console.log(`Running ${polygonWeb3Example()}`)
