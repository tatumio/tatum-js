import { bscBlockchainExample } from './app/bsc.blockchain.example'
import { bscVirtualAccountExample } from './app/bsc.virtualAccount.example'
import { bscNftExample } from './app/bsc.nft.example'
import { bscNftExpressExample } from './app/bsc.nft.express.mint.example'
import { bscSubscriptionsExample } from './app/bsc.subscriptions.example'
import { bscBalanceExample } from './app/bsc.balance.example'
import { bscTxExample } from './app/bsc.tx.example'
import { bscAuctionExample } from './app/bsc.auction.example'
import { bscMultiTokenExample } from './app/bsc.multitoken.example'
import { bscErc20Example } from './app/bsc.erc20.example'
import { bscSmartContractExample } from './app/bsc.smartContract.example'

/**
 * This is example app, which shows how to use BSC SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/BNB-Smart-Chain
 */
const examples = async () => {
  console.log(`\nRunning bscBlockchainExample`)
  await bscBlockchainExample()
  console.log(`\nRunning bscVirtualAccountExample`)
  await bscVirtualAccountExample()
  console.log(`\nRunning bscNftExample`)
  await bscNftExample()
  console.log(`\nRunning bscNftExpressExample`)
  await bscNftExpressExample()
  console.log(`\nRunning bscSubscriptionsExample`)
  await bscSubscriptionsExample()
  console.log(`\nRunning bscTxExample`)
  await bscTxExample()
  console.log(`\nRunning bscMultiTokenExample`)
  await bscMultiTokenExample()
  console.log(`\nRunning bscErc20Example`)
  await bscErc20Example()
  console.log(`\nRunning bscAuctionExample`)
  await bscAuctionExample()
  console.log(`\nRunning bscBalanceExample`)
  await bscBalanceExample()
  console.log(`\nRunning bscSmartContractExample`)
  await bscSmartContractExample()
}

void examples()
