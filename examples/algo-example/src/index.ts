/**
 * This is example app, which shows how to use ALGO SDK.
 * For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/Algorand
 */

import { algoBlockchainExample } from './app/algo.blockchain.example'
import { algoNftBurnExample } from './app/algo.nft-burn.example'
import { algoNftTransferExample } from './app/algo.nft-transfer.example'
import { algoNftExpressExample } from './app/algo.nft.express.mint.example'
import { algoVirtualAccountExample } from './app/algo.virtualAccount.example'
import { algoTxExample } from './app/algo.tx.example'
import { algoAsaTransferExample } from './app/algo.asa-transfer.example'
import { algoAsaBurnExample } from './app/algo.asa-burn.example'
import { algoBalanceExample } from './app/algo.balance.example'
import { algoSubscriptionsExample } from './app/algo.subscriptions.example'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'

export const sdkArguments: SDKArguments = {
  apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab',
}

export const isTestnet = true

const examples = async () => {
  console.log(`\nRunning algoBalanceExample`)
  await algoBalanceExample()
  console.log(`\nRunning algoBlockchainExample`)
  await algoBlockchainExample()
  console.log(`\nRunning algoTxExample`)
  await algoTxExample()
  console.log(`\nRunning algoNftTransferExample`)
  await algoNftTransferExample()
  console.log(`\nRunning algoNftBurnExample`)
  await algoNftBurnExample()
  console.log(`\nRunning algoNftExpressExample`)
  await algoNftExpressExample()
  console.log(`\nRunning algoAsaBurnExample`)
  await algoAsaBurnExample()
  console.log(`\nRunning algoAsaTransferExample`)
  await algoAsaTransferExample()
  console.log(`\nRunning algoVirtualAccountExample`)
  await algoVirtualAccountExample()
  console.log(`\nRunning algoSubscriptionsExample`)
  await algoSubscriptionsExample()
  console.log(`\nFinish`)
}

void examples()
