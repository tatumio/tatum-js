/**
 * This is example app, which shows how to use XLM SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/BNB-Beacon-Chain
 */

import { bnbWalletExample } from './app/bnb.wallet.example'
import { bnbTxExample } from './app/bnb.tx.example'
import { bnbBlockchainExample } from './app/bnb.blockchain.example'
import { bnbVirtualAccountExample } from './app/bnb.virtualAccount.examples'

console.log(`Running ${bnbWalletExample()}`)
console.log(`Running ${bnbTxExample()}`)
console.log(`Running ${bnbBlockchainExample()}`)
console.log(`Running ${bnbVirtualAccountExample()}`)
