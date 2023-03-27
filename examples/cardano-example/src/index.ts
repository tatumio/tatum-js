import { cardanoWalletExample } from './app/cardano.wallet.example'
import { cardanoBlockchainExample } from './app/cardano.blockchain.example'
import { cardanoVirtualAccountExample } from './app/cardano.virtualAccount.example'
import { cardanoTransactionExample } from './app/cardano.tx.example'
import { cardanoTransactionBroadcastExample } from './app/cardano.tx.broadcast.example'

const examples = async () => {
  console.log(`Running cardanoWalletExample`)
  await cardanoWalletExample()

  console.log(`Running cardanoBlockchainExample`)
  await cardanoBlockchainExample()

  console.log(`Running cardanoVirtualAccountExample`)
  await cardanoVirtualAccountExample()

  console.log(`Running cardanoTransactionExample`)
  await cardanoTransactionExample()

  console.log(`Running cardanoTransactionBroadcastExample`)
  await cardanoTransactionBroadcastExample()
}

void examples()
