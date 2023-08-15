import { dogeWalletExample } from './app/doge.wallet.example'
import { dogeBlockchainExample } from './app/doge.blockchain.example'
import { dogeVirtualAccountExample } from './app/doge.virtualAccount.example'
import { dogeTransactionExample } from './app/doge.tx.example'
import { dogeSubscriptionsExample } from './app/doge.subscriptions.example'
import { dogeTransactionBroadcastExample } from './app/doge.tx.broadcast.example'
import { dogeTransactionRBFExample } from './app/doge.tx.rbf.example'

const examples = async () => {
  console.log(`Running dogeWalletExample`)
  await dogeWalletExample()

  console.log(`Running dogeBlockchainExample`)
  await dogeBlockchainExample()

  console.log(`Running dogeVirtualAccountExample`)
  await dogeVirtualAccountExample()

  console.log(`Running dogeTransactionExample`)
  await dogeTransactionExample()

  console.log(`Running dogeTransactionRBFExample`)
  await dogeTransactionRBFExample()

  console.log(`Running dogeTransactionBroadcastExample`)
  await dogeTransactionBroadcastExample()

  console.log(`Running dogeSubscriptionsExample`)
  await dogeSubscriptionsExample()
}

void examples()
