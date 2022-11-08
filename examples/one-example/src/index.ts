/**
 * This is example app, which shows how to use ONE SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/Harmony
 */

import { oneBlockchainExample } from './app/one.blockchain.example'
import { oneSubscriptionsExample } from './app/one.subscriptions.example'
import { oneTxExample } from './app/one.tx.example'
import { oneBalanceExample } from './app/one.balance.example'
import { oneErc20Example } from './app/one.erc20.example'
import { oneMultiTokenExample } from './app/one.multitoken.example'
import { oneNftExample } from './app/one.nft.example'
import { oneSmartContractExample } from './app/one.smartContract.example'
import { oneVirtualAccountExample } from './app/one.virtualAccount.example'
import { oneWalletExample } from './app/one.wallet.example'

const examples = async () => {
  console.log(`Running oneBlockchainExample`)
  await oneBlockchainExample()

  console.log(`Running oneBalanceExample`)
  await oneBalanceExample()

  console.log(`Running oneTxExample`)
  await oneTxExample()

  console.log(`Running oneErc20Example`)
  await oneErc20Example()

  console.log(`Running oneSubscriptionsExample`)
  await oneSubscriptionsExample()

  console.log(`Running oneSmartContractExample`)
  await oneSmartContractExample()

  console.log(`Running oneNftExample`)
  await oneNftExample()

  console.log(`Running oneMultiTokenExample`)
  await oneMultiTokenExample()

  console.log(`Running oneVirtualAccountExample`)
  await oneVirtualAccountExample()

  console.log(`Running oneWalletExample`)
  await oneWalletExample()
}

void examples()
