/**
 * This is example app, which shows how to use XRP SDK. For more details, see README or checkout our documentation at https://apidoc.tatum.io/tag/XRP
 */
import { accountBalanceExample } from './app/xrp.acount.balance.example'
import { blockchainOperationsExample } from './app/xrp.blockchain.example'
import { txExample } from './app/xrp.tx.example'
import { virtualAccountExample } from './app/xrp.virtualAccount.example'

accountBalanceExample().catch(console.error)
blockchainOperationsExample().catch(console.error)
txExample().catch(console.error)
virtualAccountExample().catch(console.error)
