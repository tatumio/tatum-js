import { klaytnBalanceExample } from './app/klaytn.balance.example'
import { klaytnBlockchainExample } from './app/klaytn.blockchain.example'
import { klaytnErc20Example } from './app/klaytn.erc20.example'
import { klaytnMultiTokenExample } from './app/klaytn.multitoken.example'
import { klaytnNftExample } from './app/klaytn.nft.example'
import { klaytnNftExpressExample } from './app/klaytn.nft.express.mint.example'
import { klaytnSmartContractExample } from './app/klaytn.smartContract.example'
import { klaytnSubscriptionsExample } from './app/klaytn.subscriptions.example'
import { klaytnTxExample } from './app/klaytn.tx.example'
import { klaytnVirtualAccountExample } from './app/klaytn.virtualAccount.example'

/**
 * This is example app, which shows how to use BSC SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/BNB-Smart-Chain
 */
const examples = async () => {
  console.log(`\nRunning klaytnBlockchainExample`)
  await klaytnBlockchainExample()
  console.log(`\nRunning klaytnVirtualAccountExample`)
  await klaytnVirtualAccountExample()
  console.log(`\nRunning klaytnNftExample`)
  await klaytnNftExample()
  console.log(`\nRunning klaytnNftExpressExample`)
  await klaytnNftExpressExample()
  console.log(`\nRunning klaytnSubscriptionsExample`)
  await klaytnSubscriptionsExample()
  console.log(`\nRunning klaytnTxExample`)
  await klaytnTxExample()
  console.log(`\nRunning klaytnMultiTokenExample`)
  await klaytnMultiTokenExample()
  console.log(`\nRunning klaytnErc20Example`)
  await klaytnErc20Example()
  console.log(`\nRunning klaytnBalanceExample`)
  await klaytnBalanceExample()
  console.log(`\nRunning klaytnSmartContractExample`)
  await klaytnSmartContractExample()
}

void examples()
