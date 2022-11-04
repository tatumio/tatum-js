import { flowBlockchainExample } from './app/flow.blockchain.example'
import { flowKmsExample } from './app/flow.kms.example'
import { flowCustomTxExample, flowTxExample } from './app/flow.tx.example'
import { flowWalletExample } from './app/flow.wallet.example'
import { flowSubscriptionsExample } from './app/flow.subscriptions.example'
import { flowVirtualAccountExample } from './app/flow.virtualAccount.example'
import { flowNftExample } from './app/flow.nft.example'

console.log(`Running ${flowBlockchainExample()}`)
console.log(`Running ${flowKmsExample()}`)
console.log(`Running ${flowNftExample()}`)
console.log(`Running ${flowSubscriptionsExample()}`)
console.log(`Running ${flowTxExample()}`)
console.log(`Running ${flowCustomTxExample()}`)
console.log(`Running ${flowVirtualAccountExample()}`)
console.log(`Running ${flowWalletExample()}`)
