import { klaytnBalanceExample } from './app/klaytn.balance.example'
import { klaytnBlockchainExample } from './app/klaytn.blockchain.example'
import { klaytnErc20Example } from './app/klaytn.erc20.example'
import { klaytnMultiTokenExample } from './app/klaytn.multitoken.example'
import { klaytnNftExample } from './app/klaytn.nft.example'
import { klaytnSmartContractExample } from './app/klaytn.smartContract.example'
import { klaytnSubscriptionsExample } from './app/klaytn.subscriptions.example'
import { klaytnTxExample } from './app/klaytn.tx.example'
import { klaytnVirtualAccountExample } from './app/klaytn.virtualAccount.example'

console.log(`Running ${klaytnBlockchainExample()}`)
console.log(`Running ${klaytnVirtualAccountExample()}`)
console.log(`Running ${klaytnNftExample()}`)
console.log(`Running ${klaytnSubscriptionsExample()}`)
console.log(`Running ${klaytnTxExample()}`)
console.log(`Running ${klaytnMultiTokenExample()}`)
console.log(`Running ${klaytnErc20Example()}`)
console.log(`Running ${klaytnBalanceExample()}`)
console.log(`Running ${klaytnSmartContractExample()}`)
