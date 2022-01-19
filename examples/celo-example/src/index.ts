import { celoApiExample } from './app/celo.api.example';
import { celoBlockchainExample } from './app/celo.blockchain.example';
import { celoKmsExample } from './app/celo.kms.example';
import { celoLogRecordExample } from './app/celo.log.example';
import { celoChangeRateExample } from './app/celo.root.example';
import { celoWalletExample } from './app/celo.wallet.example';
import { celoDriverExample, celoWeb3Example } from './app/celo.web3.example';

console.log(`Running ${celoApiExample()}`)
console.log(`Running ${celoWalletExample()}`)
console.log(`Running ${celoBlockchainExample()}`)
console.log(`Running ${celoKmsExample()}`)
console.log(`Running ${celoLogRecordExample()}`)
console.log(`Running ${celoChangeRateExample()}`)
console.log(`Running ${celoDriverExample()}`)
console.log(`Running ${celoWeb3Example()}`)
