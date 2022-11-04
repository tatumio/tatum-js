# How to use TatumSDK with CELO

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the CELO blockchain. You will be able to:

- generate CELO wallet
- send CELO to another wallet
- check the balance of your wallet

- generate virtual account for CELO
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatumio/celo package from npm.

```bash
npm install @tatumio/celo
```

or

```bash
yarn add @tatumio/celo
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate CELO wallet

```typescript
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()

console.log(`Created a wallet with ${mnemonic} and public key ${xpub}.`)
```

### How to use web3

```typescript
import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

const web3response = await celoSDK.httpDriver({
  jsonrpc: '2.0',
  method: 'web3_clientVersion',
  params: [],
  id: 2,
})

const gasPriceInWei = await celoSDK.getGasPriceInWei()
const web3 = celoSDK.web3Client()

const blockNumber = web3.eth.getBlockNumber()
const balance = web3.eth.getTransactionFromBlock(blockNumber)
```

### How to check balance of the address

You can find examples [here](./src/app/celo.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/celo.blockchain.example.ts).

### How to send native transactions to another wallet

You can find examples [here](./src/app/celo.tx.example.ts).

### How to work with fungible tokens (ERC20)

You can find examples [here](./src/app/celo.erc20.example.ts).

### How to work with nfts (ERC721)

You can find examples [here](./src/app/celo.nft.example.ts) and [here](./src/app/celo.nft.express.mint.example.ts)

### How to work with multitokens (ERC1155)

You can find examples [here](./src/app/celo.multitoken.example.ts).

### How to work with auctions

You can find examples [here](./src/app/celo.auction.example.ts).

### How to setup webhooks

You can find examples [here](./src/app/celo.subscriptions.example.ts).

### How to generate virtual account for CELO and transfer from it to a blockchain address

You can find examples [here](./src/app/celo.virtualAccount.example.ts).

### How to work with smart contracts

You can find examples [here](./src/app/celo.smartContract.example.ts).
