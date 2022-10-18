/**
 * This is example app, which shows how to use XLM SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/Stellar
 */

import { xlmBlockchainExample } from './app/xlm.blockchain.example'
import { xlmKmsExample } from './app/xlm.kms.example'
import { xlmChangeRateExample } from './app/xlm.root.example'
import { xlmTxExample } from './app/xlm.tx.example'
import { xlmWalletExample } from './app/xlm.wallet.example'

console.log(`Running ${xlmBlockchainExample()}`)
console.log(`Running ${xlmKmsExample()}`)
console.log(`Running ${xlmChangeRateExample()}`)
console.log(`Running ${xlmTxExample()}`)
console.log(`Running ${xlmWalletExample()}`)
