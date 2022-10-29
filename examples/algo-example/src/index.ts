/**
 * This is example app, which shows how to use ALGO SDK.
 * For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/Algorand
 */

import { algoBlockchainExample } from './app/algo.blockchain.example'
import { algoNftExample } from './app/algo.nft.example'
import { algoNftExpressExample } from './app/algo.nft.express.mint.example'
import { algoVirtualAccountExample } from './app/algo.virtualAccount.example'
import { algoTxExample } from './app/algo.tx.example'
import { algoAsaExample } from './app/algo.asa.example'
import { algoBalanceExample } from './app/algo.balance.example'
import { algoSubscriptionsExample } from './app/algo.subscriptions.example'

console.log(`Running ${algoBalanceExample()}`)
console.log(`Running ${algoBlockchainExample()}`)
console.log(`Running ${algoNftExample()}`)
console.log(`Running ${algoNftExpressExample()}`)
console.log(`Running ${algoAsaExample()}`)
console.log(`Running ${algoVirtualAccountExample()}`)
console.log(`Runninf ${algoTxExample()}`)
console.log(`Running ${algoSubscriptionsExample()}`)
