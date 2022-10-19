/**
 * This is example app, which shows how to use XLM SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/Stellar
 */

import { xlmBalanceExample } from './app/xlm.balance.example'
import { xlmTrustlineTxExample, xlmTxExample } from './app/xlm.tx.example'
import { xlmBlockchainExample } from './app/xlm.blockchain.example'
import { xlmVirtualAccountExample } from './app/xlm.virtualAccount.example'

console.log(`Running ${xlmBalanceExample()}`)
console.log(`Running ${xlmBlockchainExample()}`)
console.log(`Running ${xlmTxExample()}`)
console.log(`Running ${xlmTrustlineTxExample()}`)
console.log(`Running ${xlmVirtualAccountExample()}`)
