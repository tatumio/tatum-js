/**
 * This is example app, which shows how to use BSC SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/BNB-Smart-Chain
 */

import { bscBlockchainExample } from './app/bsc.blockchain.example'
import { bscVirtualAccountExample } from './app/bsc.virtualAccount.example'
import { bscNftExample } from './app/bsc.nft.example'
import { bscSubscriptionsExample } from './app/bsc.subscriptions.example'
import { bscBalanceExample } from './app/bsc.balance.example'
import { bscTxExample } from './app/bsc.tx.example'
import { bscAuctionExample } from './app/bsc.auction.example'
import { bscMultiTokenExample } from './app/bsc.multitoken.example'
import { bscErc20Example } from './app/bsc.erc20.example'
import { bscSmartContractExample } from './app/bsc.smartContract.example'

console.log(`Running ${bscBlockchainExample()}`)
console.log(`Running ${bscVirtualAccountExample()}`)
console.log(`Running ${bscNftExample()}`)
console.log(`Running ${bscSubscriptionsExample()}`)
console.log(`Running ${bscTxExample()}`)
console.log(`Running ${bscMultiTokenExample()}`)
console.log(`Running ${bscErc20Example()}`)
console.log(`Running ${bscAuctionExample()}`)
console.log(`Running ${bscBalanceExample()}`)
console.log(`Running ${bscSmartContractExample()}`)
