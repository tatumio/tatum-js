import { kcsBlockchainExample } from './app/kcs.blockchain.example'
import { kcsWalletExample } from './app/kcs.wallet.example'
import { kcsSubscriptionsExample } from './app/kcs.subscriptions.example'
import { kcsTxExample } from './app/kcs.tx.example'
import { kcsMultiTokenExample } from './app/kcs.multitoken.example'
import { kcsVirtualAccountExample } from './app/kcs.virtualAccount.example'
import { kcsBalanceExample } from './app/kcs.balance.example'
import { kcsSmartContractExample } from './app/kcs.smartContract.example'
import { kcsErc20Example } from './app/kcs.erc20.example'
import { kcsNftExample } from './app/kcs.nft.example'

const examples = async () => {
  console.log(`Running kcsBlockchainExample`)
  await kcsBlockchainExample()

  console.log(`Running kcsBalanceExample`)
  await kcsBalanceExample()

  console.log(`Running kcsErc20Example`)
  await kcsErc20Example()

  console.log(`Running kcsNftExample`)
  await kcsNftExample()

  console.log(`Running kcsWalletExample`)
  await kcsWalletExample()

  console.log(`Running kcsVirtualAccountExample`)
  await kcsVirtualAccountExample()

  console.log(`Running kcsTxExample`)
  await kcsTxExample()

  console.log(`Running kcsSubscriptionsExample`)
  await kcsSubscriptionsExample()

  console.log(`Running kcsSmartContractExample`)
  await kcsSmartContractExample()

  console.log(`Running kcsMultiTokenExample`)
  await kcsMultiTokenExample()

  console.log(`Running kcsVirtualAccountExample`)
  await kcsVirtualAccountExample()

  console.log(`Running kcsWalletExample`)
  await kcsWalletExample()
}

void examples()
