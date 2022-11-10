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
import { klaytnWalletExample } from './app/klaytn.wallet.example'

/**
 * This is example app, which shows how to use BSC SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/BNB-Smart-Chain
 */
const examples = async () => {
  console.log(`Running klaytnBlockchainExample`)
  await klaytnBlockchainExample()

  console.log(`Running klaytnBalanceExample`)
  await klaytnBalanceExample()

  console.log(`Running klaytnTxExample`)
  await klaytnTxExample()

  console.log(`Running klaytnErc20Example`)
  await klaytnErc20Example()

  console.log(`Running klaytnNftExample`)
  await klaytnNftExample()

  console.log(`Running klaytnMultiTokenExample`)
  await klaytnMultiTokenExample()

  console.log(`Running klaytnSubscriptionsExample`)
  await klaytnSubscriptionsExample()

  console.log(`Running klaytnSmartContractExample`)
  await klaytnSmartContractExample()

  console.log(`Running klaytnNftExpressExample`)
  await klaytnNftExpressExample()

  console.log(`Running klaytnVirtualAccountExample`)
  await klaytnVirtualAccountExample()

  console.log(`Running klaytnWalletExample`)
  await klaytnWalletExample()
}

void examples()
