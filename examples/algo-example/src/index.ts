import { algoBlockchainExample } from './app/algo.blockchain.example'
import { algoVirtualAccountExample } from './app/algo.virtualAccount.example'
import { algoTxExample } from './app/algo.tx.example'
import { algoBalanceExample } from './app/algo.balance.example'
import { algoSubscriptionsExample } from './app/algo.subscriptions.example'
import { algoFungibleExample } from './app/algo.fungible.example'
import { algoNftExample } from './app/algo.nft.example'
import { algoWalletExample } from './app/algo.wallet.examples'
import { algoNftFractionalExample } from './app/algo.nft.fractional.example'

/**
 * This is an example app that shows how to use the Tatum JavaScript SDK for Algorand. For more details, see the README or check out the API Reference for Algorand at https://apidoc.tatum.io/tag/Algorand.
 */

const examples = async () => {
  console.log(`Running algoWalletExample`)
  await algoWalletExample()

  console.log(`Running algoBlockchainExample`)
  await algoBlockchainExample()

  console.log(`Running algoBalanceExample`)
  await algoBalanceExample()

  console.log(`Running algoFungibleExample`)
  await algoFungibleExample()

  console.log(`Running algoNftExample`)
  await algoNftExample()

  console.log(`Running algoNftFractionalExample`)
  await algoNftFractionalExample()

  console.log(`Running algoVirtualAccountExample`)
  await algoVirtualAccountExample()

  console.log(`Running algoTxExample`)
  await algoTxExample()

  console.log(`Running algoSubscriptionsExample`)
  await algoSubscriptionsExample()
}

void examples()
