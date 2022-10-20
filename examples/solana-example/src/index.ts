import { solanaBlockchainExample } from './app/solana.blockchain.example'
import { solanaNftExample } from './app/solana.nft.example'
import { solanaSubscriptionsExample } from './app/solana.subscriptions.example'
import { solanaTxWithPrivateKeyExample } from './app/solana.tx.example'
import { solanaTxWithCustodialManagedWallet } from './app/solana.custodial.managed.wallet.example'
import { solanaVirtualAccountExample } from './app/solana.virtualAccount.example'
import { solanaBalanceExample } from './app/solana.balance.example'
import { solanaSplTokenExample } from './app/solana.spl.example'

console.log(`Running ${solanaBlockchainExample()}`)
console.log(`Running ${solanaBalanceExample()}`)
console.log(`Running ${solanaSplTokenExample()}`)
console.log(`Running ${solanaTxWithCustodialManagedWallet()}`)
console.log(`Running ${solanaNftExample()}`)
console.log(`Running ${solanaSubscriptionsExample()}`)
console.log(`Running ${solanaTxWithPrivateKeyExample()}`)
console.log(`Running ${solanaVirtualAccountExample()}`)
