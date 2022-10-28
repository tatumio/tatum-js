// import { dogeWalletExample } from './app/doge.wallet.example'
// import { dogeBlockchainExample } from './app/doge.blockchain.example'
// import { dogeKmsExample } from './app/doge.kms.example'
// import { dogeOffchainExample } from './app/doge.offchain.example'
// import { exchangeRateExample } from './app/doge.root.example'
// import { dogeTransactionsExample } from './app/doge.tx.example'
import { dogeTransaction2Example } from './app/doge.tx2.example'

async function examples() {
  await dogeTransaction2Example()
  // await dogeWalletExample()
}

void examples()

// console.log(`Running ${dogeWalletExample()}`)
// console.log(`Running ${dogeBlockchainExample()}`)
// console.log(`Running ${dogeKmsExample()}`)
// console.log(`Running ${dogeOffchainExample()}`)
// console.log(`Running ${exchangeRateExample()}`)
// console.log(`Running ${dogeTransactionsExample()}`)
