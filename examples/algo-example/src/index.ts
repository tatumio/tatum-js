import { algoBlockchainExample } from './app/algo.blockchain.example'
import { algoKmsExample } from './app/algo.kms.example'
import { algoLogRecordExample } from './app/algo.log.example'
import { algoOffchainExample } from './app/algo.offchain.example'
import { algoTxWithPrivateKeyExample, algoTxWithSignatureIdExample } from './app/algo.tx.example'
import { algoWalletExample } from './app/algo.wallet.example'
import { algoWeb3Example } from './app/algo.web3.example'

console.log(`Running ${algoBlockchainExample()}`)
console.log(`Running ${algoWeb3Example()}`)
console.log(`Running ${algoKmsExample()}`)
console.log(`Running ${algoWalletExample()}`)
console.log(`Running ${algoLogRecordExample()}`)
console.log(`Running ${algoOffchainExample()}`)
console.log(`Runninf ${algoTxWithPrivateKeyExample()}`)
console.log(`Runninf ${algoTxWithSignatureIdExample()}`)
