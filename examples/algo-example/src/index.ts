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
import { SDKArguments } from '@tatumio/shared-abstract-sdk'

export const sdkArguments: SDKArguments = {
  apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab',
  // url: 'https://api.tatum.io',
}

const examples = async () => {
  console.log(`\nRunning algoBalanceExample`)
  await algoBalanceExample()
  console.log(`\nRunning algoBlockchainExample`)
  await algoBlockchainExample()
  console.log(`\nRunning algoNftExample`)
  await algoNftExample()
  console.log(`\nRunning algoNftExpressExample`)
  await algoNftExpressExample()
  console.log(`\nRunning algoAsaExample`)
  await algoAsaExample()
  console.log(`\nRunning algoVirtualAccountExample`)
  await algoVirtualAccountExample()
  console.log(`\nRunning algoTxExample`)
  await algoTxExample()
  console.log(`\nRunning algoSubscriptionsExample`)
  await algoSubscriptionsExample()
}

examples()
