/**
 * This is example app, which shows how to use XRP SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/XRP
 */
import { xrpBalanceExample } from './app/xrp.balance.example'
import { xrpBlockchainExample } from './app/xrp.blockchain.example'
import { xrpTxExample } from './app/xrp.tx.example'
import { xrpVirtualAccountExample } from './app/xrp.virtualAccount.example'
import { xrpTxTrustlineExample } from './app/xrp.tx.trustline.example'
import { xrpTxAccountSettingsExample } from './app/xrp.tx.settings.example'

const examples = async () => {
  console.log(`Running xrpBalanceExample`)
  await xrpBalanceExample()

  console.log(`Running xrpBlockchainExample`)
  await xrpBlockchainExample()

  console.log(`Running xrpTxExample`)
  await xrpTxExample()

  console.log(`Running xrpTxTrustlineExample`)
  await xrpTxTrustlineExample()

  console.log(`Running xrpTxAccountSettingsExample`)
  await xrpTxAccountSettingsExample()

  console.log(`Running xrpVirtualAccountExample`)
  await xrpVirtualAccountExample()
}

void examples()
