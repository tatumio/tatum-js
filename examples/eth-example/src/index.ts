import { ethWalletExample } from './app/eth.wallet.example'
import { ethVirtualAccountExample } from './app/eth.virtualAccount.example'
import { ethSubscriptionsExample } from './app/eth.subscriptions.example'
import { ethBalanceExample } from './app/eth.balance.example'
import { ethErc20Example } from './app/eth.erc20.example'
import { ethMultiTokenExample } from './app/eth.multitoken.example'
import { ethNftExample } from './app/eth.nft.example'
import { ethSmartContractExample } from './app/eth.smartContract.example'
import { ethBlockchainExample } from './app/eth.blockchain.example'
import { ethTxExample } from './app/eth.tx.example'

/**
 * This is example app, which shows how to use ETH SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/Ethereum
 */
const examples = async () => {
  console.log(`Running ethBlockchainExample`)
  await ethBlockchainExample()

  console.log(`Running ethBalanceExample`)
  await ethBalanceExample()

  console.log(`Running ethTxExample`)
  await ethTxExample()
  console.log(`Running ethErc20Example`)
  await ethErc20Example()

  console.log(`Running ethNftExample`)
  await ethNftExample()

  console.log(`Running ethMultiTokenExample`)
  await ethMultiTokenExample()

  console.log(`Running ethSubscriptionsExample`)
  await ethSubscriptionsExample()

  console.log(`Running ethWalletExample`)
  await ethWalletExample()

  console.log(`Running ethVirtualAccountExample`)
  await ethVirtualAccountExample()

  console.log(`Running ethSmartContractExample`)
  await ethSmartContractExample()
}

void examples()
