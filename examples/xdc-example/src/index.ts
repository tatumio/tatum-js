import { xdcBlockchainExample } from './app/xdc.blockchain.example'
import { xdcWalletExample } from './app/xdc.wallet.example'
import { xdcVirtualAccountExample } from './app/xdc.virtualAccount.example'
import { xdcSubscriptionsExample } from './app/xdc.subscriptions.example'
import { xdcBalanceExample } from './app/xdc.balance.example'
import { xdcErc20Example } from './app/xdc.erc20.example'
import { xdcSmartContractExample } from './app/xdc.smartContract.example'
import { xdcTxExample } from './app/xdc.tx.example'

const examples = async () => {
  console.log(`Running xdcBlockchainExample`)
  await xdcBlockchainExample()

  console.log(`Running xdcBalanceExample`)
  await xdcBalanceExample()

  console.log(`Running xdcErc20Example`)
  await xdcErc20Example()

  console.log(`Running xdcVirtualAccountExample`)
  await xdcVirtualAccountExample()

  console.log(`Running xdcTxExample`)
  await xdcTxExample()

  console.log(`Running xdcSubscriptionsExample`)
  await xdcSubscriptionsExample()

  console.log(`Running xdcSmartContractExample`)
  await xdcSmartContractExample()

  console.log(`Running xdcVirtualAccountExample`)
  await xdcVirtualAccountExample()

  console.log(`Running xdcWalletExample`)
  await xdcWalletExample()
}

void examples()
