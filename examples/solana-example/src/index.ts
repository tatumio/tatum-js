import { solanaBlockchainExample } from './app/solana.blockchain.example'
import { solanaNftExample } from './app/solana.nft.example'
import { solanaSubscriptionsExample } from './app/solana.subscriptions.example'
import { solanaTxWithPrivateKeyExample } from './app/solana.tx.example'
import { solanaVirtualAccountExample } from './app/solana.virtualAccount.example'
import { solanaBalanceExample } from './app/solana.balance.example'
import { solanaSplTokenExample } from './app/solana.spl.example'
import { solanaWalletExample } from './app/solana.wallet.example'

const examples = async () => {
  console.log(`Running solanaBlockchainExample`)
  await solanaBlockchainExample()

  console.log(`Running solanaBalanceExample`)
  await solanaBalanceExample()

  console.log(`Running solanaErc20Example`)
  await solanaSplTokenExample()

  console.log(`Running solanaNftExample`)
  await solanaNftExample()

  console.log(`Running solanaTxExample`)
  await solanaTxWithPrivateKeyExample()

  console.log(`Running solanaSubscriptionsExample`)
  await solanaSubscriptionsExample()

  console.log(`Running solanaVirtualAccountExample`)
  await solanaVirtualAccountExample()

  console.log(`Running solanaWalletExample`)
  await solanaWalletExample()
}

void examples()
