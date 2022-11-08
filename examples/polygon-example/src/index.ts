/**
 * This is example app, which shows how to use Polygon SDK.
 * For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/Polygon
 */

import { polygonMultiTokenExample } from './app/polygon.multitoken.example'
import { polygonVirtualAccountExample } from './app/polygon.virtualAccount.example'
import { polygonWalletExample } from './app/polygon.wallet.example'
import { polygonBlockchainExample } from './app/polygon.blockchain.example'
import { polygonBalanceExample } from './app/polygon.balance.example'
import { polygonErc20Example } from './app/polygon.erc20.example'
import { polygonNftExample } from './app/polygon.nft.example'
import { polygonTxExample } from './app/polygon.tx.example'
import { polygonSubscriptionsExample } from './app/polygon.subscriptions.example'
import { polygonSmartContractExample } from './app/polygon.smartContract.example'
import { polygonAuctionExample } from './app/polygon.auction.example'

const examples = async () => {
  console.log(`Running polygonAuctionExample`)
  await polygonAuctionExample()

  console.log(`Running polygonBlockchainExample`)
  await polygonBlockchainExample()

  console.log(`Running polygonBalanceExample`)
  await polygonBalanceExample()

  console.log(`Running polygonErc20Example`)
  await polygonErc20Example()

  console.log(`Running polygonNftExample`)
  await polygonNftExample()

  console.log(`Running polygonVirtualAccountExample`)
  await polygonVirtualAccountExample()

  console.log(`Running polygonTxExample`)
  await polygonTxExample()

  console.log(`Running polygonSubscriptionsExample`)
  await polygonSubscriptionsExample()

  console.log(`Running polygonSmartContractExample`)
  await polygonSmartContractExample()

  console.log(`Running polygonMultiTokenExample`)
  await polygonMultiTokenExample()

  console.log(`Running polygonVirtualAccountExample`)
  await polygonVirtualAccountExample()

  console.log(`Running polygonWalletExample`)
  await polygonWalletExample()
}

void examples()
