import { btcWalletExample } from './app/btc.wallet.example'
import { btcBlockchainExample } from './app/btc.blockchain.example'
import { btcExchangeRateExample } from './app/btc.exchangeRate.example'
import { btcFromAddressTransactionsExample } from './app/btc.tx.fromAddress.example'
import { btcFromUtxoTransactionsExample } from './app/btc.tx.fromUtxo.example'
import { btcBalanceExample } from './app/btc.balance.example'
import { btcEstimateExample } from './app/btc.estimate.example'
import { btcSubscriptionsExample } from './app/btc.subscriptions.example'
import { btcVirtualAccountExample } from './app/btc.virtualAccount.example'
import { btcBroadcastTransactionsExample } from './app/btc.tx.broadcast.example'
import { btcTransactionRBFExample } from './app/btc.tx.rbf.example'

const examples = async () => {
  console.log(`Running btcBalanceExample`)
  await btcBalanceExample()

  console.log(`Running btcBlockchainExample`)
  await btcBlockchainExample()

  console.log(`Running btcEstimateExample`)
  await btcEstimateExample()

  console.log(`Running btcExchangeRateExample`)
  await btcExchangeRateExample()

  console.log(`Running btcSubscriptionsExample`)
  await btcSubscriptionsExample()

  console.log(`Running btcWalletExample`)
  await btcWalletExample()

  console.log(`Running btcBroadcastTransactionsExample`)
  await btcBroadcastTransactionsExample()

  console.log(`Running btcFromAddressTransactionsExample`)
  await btcFromAddressTransactionsExample()

  console.log(`Running btcFromUtxoTransactionsExample`)
  await btcFromUtxoTransactionsExample()

  console.log(`Running btcTransactionRBFExample`)
  await btcTransactionRBFExample()

  console.log(`Running btcVirtualAccountExample`)
  await btcVirtualAccountExample()
}

void examples()
