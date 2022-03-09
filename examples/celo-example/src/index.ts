import { celoApiExample } from './app/celo.api.example'
import { celoBlockchainExample } from './app/celo.blockchain.example'
import { celoKmsExample } from './app/celo.kms.example'
import { celoLogRecordExample } from './app/celo.log.example'
import { celoChangeRateExample } from './app/celo.root.example'
import { celoWalletExample } from './app/celo.wallet.example'
import { celoDriverExample, celoWeb3Example } from './app/celo.web3.example'
import { celoOffchainExample } from './app/celo.offchain.example'
import { celoNftExample } from './app/celo.nft.example'
import { celoSubscriptionsExample } from './app/celo.subscriptions.example'
import {
  celoTxWithPrivateKeyExample,
  celoTxWithSignatureIdExample,
  celoTxFeesCovered,
} from './app/celo.tx.example'

console.log(`Running ${celoApiExample()}`)
console.log(`Running ${celoWalletExample()}`)
console.log(`Running ${celoBlockchainExample()}`)
console.log(`Running ${celoKmsExample()}`)
console.log(`Running ${celoLogRecordExample()}`)
console.log(`Running ${celoChangeRateExample()}`)
console.log(`Running ${celoDriverExample()}`)
console.log(`Running ${celoWeb3Example()}`)
console.log(`Running ${celoOffchainExample()}`)
console.log(`Running ${celoNftExample()}`)
console.log(`Running ${celoSubscriptionsExample()}`)
console.log(`Running ${celoTxWithPrivateKeyExample()}`)
console.log(`Running ${celoTxWithSignatureIdExample()}`)
console.log(`Running ${celoTxFeesCovered()}`)
