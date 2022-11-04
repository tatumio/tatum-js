import { celoBlockchainExample } from './app/celo.blockchain.example'
import { celoVirtualAccountExample } from './app/celo.virtualAccount.example'
import { celoNftExample } from './app/celo.nft.example'
import { celoNftExpressExample } from './app/celo.nft.express.mint.example'
import { celoSubscriptionsExample } from './app/celo.subscriptions.example'
import { celoBalanceExample } from './app/celo.balance.example'
import { celoTxExample } from './app/celo.tx.example'
import { celoMultiTokenExample } from './app/celo.multitoken.example'
import { celoErc20Example } from './app/celo.erc20.example'
import { celoSmartContractExample } from './app/celo.smartContract.example'

const examples = async () => {
  console.log(`\nRunning celoBlockchainExample`)
  await celoBlockchainExample()
  console.log(`\nRunning celoVirtualAccountExample`)
  await celoVirtualAccountExample()
  console.log(`\nRunning celoNftExample`)
  await celoNftExample()
  console.log(`\nRunning celoNftExpressExample`)
  await celoNftExpressExample()
  console.log(`\nRunning celoSubscriptionsExample`)
  await celoSubscriptionsExample()
  console.log(`\nRunning celoTxExample`)
  await celoTxExample()
  console.log(`\nRunning celoMultiTokenExample`)
  await celoMultiTokenExample()
  console.log(`\nRunning celoErc20Example`)
  await celoErc20Example()
  console.log(`\nRunning celoBalanceExample`)
  await celoBalanceExample()
  console.log(`\nRunning celoSmartContractExample`)
  await celoSmartContractExample()
}

void examples()
