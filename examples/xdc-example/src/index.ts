import { xdcBlockchainExample } from './app/xdc.blockchain.example'
import { xdcKmsExample } from './app/xdc.kms.example'
import { bscLogRecordExample } from './app/xdc.log.example'
import { bscChangeRateExample } from './app/xdc.root.example'
import { xdcWalletExample } from './app/xdc.wallet.example'
import { bscDriverExample, xdcWeb3Example } from './app/xdc.web3.example'
import { xdcOffchainExample } from './app/xdc.offchain.example'
import { xdcNftExample } from './app/xdc.nft.example'
import { xdcSubscriptionsExample } from './app/xdc.subscriptions.example'
import {
  bscTxWithPrivateKeyExample,
  bscTxWithSignatureIdExample,
  bscTxFeesCovered,
} from './app/xdc.tx.example'
import { xdcAuctionExample } from './app/xdc.auction.example'

console.log(`Running ${xdcWalletExample()}`)
console.log(`Running ${xdcBlockchainExample()}`)
console.log(`Running ${xdcKmsExample()}`)
console.log(`Running ${bscLogRecordExample()}`)
console.log(`Running ${bscChangeRateExample()}`)
console.log(`Running ${bscDriverExample()}`)
console.log(`Running ${xdcWeb3Example()}`)
console.log(`Running ${xdcOffchainExample()}`)
console.log(`Running ${xdcNftExample()}`)
console.log(`Running ${xdcSubscriptionsExample()}`)
console.log(`Running ${bscTxWithPrivateKeyExample()}`)
console.log(`Running ${bscTxWithSignatureIdExample()}`)
console.log(`Running ${bscTxFeesCovered()}`)
console.log(`Running ${xdcAuctionExample()}`)
