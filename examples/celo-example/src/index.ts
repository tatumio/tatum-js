import { celoBlockchainExample } from './app/celo.blockchain.example'
import { celoWalletExample } from './app/celo.wallet.example'
import { celoSubscriptionsExample } from './app/celo.subscriptions.example'
import { celoTxExample } from './app/celo.tx.example'
import { celoMultiTokenExample } from './app/celo.multitoken.example'
import { celoVirtualAccountExample } from './app/celo.virtualAccount.example'
import { celoBalanceExample } from './app/celo.balance.example'
import { celoSmartContractExample } from './app/celo.smartContract.example'
import { celoErc20Example } from './app/celo.erc20.example'
import { celoNftExample } from './app/celo.nft.example'
import { celoNftExpressExample } from './app/celo.nft.express.mint.example'

const examples = async () => {
  console.log(`Running celoBlockchainExample`)
  await celoBlockchainExample()

  console.log(`Running celoBalanceExample`)
  await celoBalanceExample()

  console.log(`Running celoErc20Example`)
  await celoErc20Example()

  console.log(`Running celoNftExample`)
  await celoNftExample()

  console.log(`Running celoTxExample`)
  await celoTxExample()

  console.log(`Running celoSubscriptionsExample`)
  await celoSubscriptionsExample()

  console.log(`Running celoSmartContractExample`)
  await celoSmartContractExample()

  console.log(`Running celoMultiTokenExample`)
  await celoMultiTokenExample()

  console.log(`Running celoVirtualAccountExample`)
  await celoVirtualAccountExample()

  console.log(`Running celoWalletExample`)
  await celoWalletExample()

  console.log(`Running celoNftExpressExample`)
  await celoNftExpressExample()
}

void examples()
