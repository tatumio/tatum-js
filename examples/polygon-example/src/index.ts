/**
 * This is example app, which shows how to use Polygon SDK.
 * For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/Polygon
 */

import { polygonBlockchainExample } from './app/polygon.blockchain.example'
import { polygonVirtualAccountExample } from './app/polygon.virtualAccount.example'
import { polygonNftExample } from './app/polygon.nft.example'
import { polygonSubscriptionsExample } from './app/polygon.subscriptions.example'
import { polygonAuctionExample } from './app/polygon.auction.example'
import { polygonBalanceExample } from './app/polygon.balance.example'
import { polygonErc20Example } from './app/polygon.erc20.example'
import { polygonNftExpressExample } from './app/polygon.nft.mint.express.example'
import { polygonTransactionExample } from './app/polygon.tx.example'
import { polygonMultitokenExample } from './app/polygon.multitoken.example'

console.log(`Running ${polygonBalanceExample()}`)
console.log(`Running ${polygonBlockchainExample()}`)
console.log(`Running ${polygonTransactionExample()}`)
console.log(`Running ${polygonNftExample()}`)
console.log(`Running ${polygonNftExpressExample()}`)
console.log(`Running ${polygonErc20Example()}`)
console.log(`Running ${polygonMultitokenExample()}`)
console.log(`Running ${polygonVirtualAccountExample()}`)
console.log(`Running ${polygonSubscriptionsExample()}`)
console.log(`Running ${polygonAuctionExample()}`)
