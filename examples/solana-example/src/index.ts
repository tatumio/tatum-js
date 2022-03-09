import { solanaBlockchainExample } from './app/solana.blockchain.example'
import { solanaKmsExample } from './app/solana.kms.example'
import { solanaChangeRateExample } from './app/solana.root.example'
import { solanaWalletExample } from './app/solana.wallet.example'
import { solanaDriverExample } from './app/solana.web3.example'
import { solanaOffchainExample } from './app/solana.offchain.example'
import { solanaNftExample } from './app/solana.nft.example'
import { solanaSubscriptionsExample } from './app/solana.subscriptions.example'
import { solanaTxWithSignatureIdExample, solanaTxWithPrivateKeyExample } from './app/solana.tx.example'

console.log(`Running ${solanaWalletExample()}`)
console.log(`Running ${solanaBlockchainExample()}`)
console.log(`Running ${solanaKmsExample()}`)
console.log(`Running ${solanaChangeRateExample()}`)
console.log(`Running ${solanaDriverExample()}`)
console.log(`Running ${solanaOffchainExample()}`)
console.log(`Running ${solanaNftExample()}`)
console.log(`Running ${solanaSubscriptionsExample()}`)
console.log(`Running ${solanaTxWithSignatureIdExample()}`)
console.log(`Running ${solanaTxWithPrivateKeyExample()}`)
