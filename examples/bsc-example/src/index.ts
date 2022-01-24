import { bscApiExample } from './app/bsc.api.example';
import { bscBlockchainExample } from './app/bsc.blockchain.example';
import { bscKmsExample } from './app/bsc.kms.example';
import { bscLogRecordExample } from './app/bsc.log.example';
import { bscChangeRateExample } from './app/bsc.root.example';
import { bscWalletExample } from './app/bsc.wallet.example';
import { bscDriverExample, bscWeb3Example } from './app/bsc.web3.example';

console.log(`Running ${bscApiExample()}`)
console.log(`Running ${bscWalletExample()}`)
console.log(`Running ${bscBlockchainExample()}`)
console.log(`Running ${bscKmsExample()}`)
console.log(`Running ${bscLogRecordExample()}`)
console.log(`Running ${bscChangeRateExample()}`)
console.log(`Running ${bscDriverExample()}`)
console.log(`Running ${bscWeb3Example()}`)
