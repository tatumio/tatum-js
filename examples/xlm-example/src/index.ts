/**
 * This is example app, which shows how to use XLM SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/Stellar
 */

import { xlmBalanceExample } from './app/xlm.balance.example'
import { xlmTrustlineTxExample, xlmTxExample } from './app/xlm.tx.example'
import { xlmBlockchainExample } from './app/xlm.blockchain.example'
import { xlmVirtualAccountExample } from './app/xlm.virtualAccount.example'

const examples = async () => {
  console.log(`Running xlmBalanceExample`)
  await xlmBalanceExample()

  console.log(`Running xlmBlockchainExample`)
  await xlmBlockchainExample()

  console.log(`Running xlmTxExample`)
  await xlmTxExample()

  console.log(`Running xlmTrustlineTxExample`)
  await xlmTrustlineTxExample()

  console.log(`Running xlmVirtualAccountExample`)
  await xlmVirtualAccountExample()
}

void examples()
