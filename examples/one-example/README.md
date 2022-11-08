# How to use TatumSDK with ONE

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the ONE blockchain. You will be able to:

- generate ONE wallet
- send ONE to another wallet
- check the balance of your wallet

- generate virtual account for ONE
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatumio/one package from npm.

```bash
npm install @tatumio/one
```

or

```bash
yarn add @tatumio/one
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate ONE wallet

```typescript
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
const { mnemonic, xpub } = await oneSDK.wallet.generateWallet()

console.log(`Created a wallet with ${mnemonic} and public key ${xpub}.`)
```

### How to use web3

```typescript
import { TatumOneSDK } from '@tatumio/one'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

const web3response = await oneSDK.httpDriver({
  jsonrpc: '2.0',
  method: 'web3_clientVersion',
  params: [],
  id: 2,
})

const gasPriceInWei = await oneSDK.getGasPriceInWei()
const web3 = oneSDK.web3Client()

const blockNumber = web3.eth.getBlockNumber()
const balance = web3.eth.getTransactionFromBlock(blockNumber)
```

### How to check balance of the address

You can find examples [here](./src/app/one.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/one.blockchain.example.ts).

### How to send native transactions to another wallet

You can find examples [here](./src/app/one.tx.example.ts).

### How to work with fungible tokens (ERC20)

You can find examples [here](./src/app/one.erc20.example.ts).

### How to work with nfts (ERC721)

You can find examples [here](./src/app/one.nft.example.ts) and [here](./src/app/one.nft.express.mint.example.ts)

### How to work with multitokens (ERC1155)

You can find examples [here](./src/app/one.multitoken.example.ts).

### How to setup webhooks

You can find examples [here](./src/app/one.subscriptions.example.ts).

### How to generate virtual account for ONE and transfer from it to a blockchain address

You can find examples [here](./src/app/one.virtualAccount.example.ts).

### How to work with smart contracts

You can find examples [here](./src/app/one.smartContract.example.ts).
