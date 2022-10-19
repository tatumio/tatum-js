/**
 * This is example app, which shows how to use BSC SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/BNB-Smart-Chain
 */

import { bscBlockchainExample } from './app/bsc.blockchain.example'
import { bscOffchainExample } from './app/bsc.offchain.example'
import { bscNftExample } from './app/bsc.nft.example'
import { bscSubscriptionsExample } from './app/bsc.subscriptions.example'
import { bscBalanceExample } from './app/bsc.balance.example'
import {
  bscTxWithPrivateKeyExample,
  bscTxWithSignatureIdExample,
  bscNftTxExample,
  bscMultiTokenTxExample,
  gasPumpTxExample,
} from './app/bsc.tx.example'
import { bscAuctionExample } from './app/bsc.auction.example'

console.log(`Running ${bscBlockchainExample()}`)
console.log(`Running ${bscOffchainExample()}`)
console.log(`Running ${bscNftExample()}`)
console.log(`Running ${bscSubscriptionsExample()}`)
console.log(`Running ${bscTxWithPrivateKeyExample()}`)
console.log(`Running ${bscTxWithSignatureIdExample()}`)
console.log(`Running ${bscNftTxExample()}`)
console.log(`Running ${bscMultiTokenTxExample()}`)
console.log(`Running ${gasPumpTxExample()}`)
console.log(`Running ${bscAuctionExample()}`)
console.log(`Running ${bscBalanceExample()}`)
