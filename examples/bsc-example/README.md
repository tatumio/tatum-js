# How to use TatumSDK with BSC

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the BSC blockchain. You will be able to:

- generate BSC wallet
- send BSC to another wallet
- check the balance of your wallet

- generate virtual account for BSC
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatumio/bsc package from npm.

```bash
npm install @tatumio/bsc
```

or

```bash
yarn add @tatumio/bsc
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumBscSDK } from '@tatumio/bsc'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate BSC wallet

```typescript
import { TatumBscSDK } from '@tatumio/xlm'

const bscSDK = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await bscSDK.wallet.generateWallet()

console.log(`Created a wallet with ${mnemonic} and public key ${xpub}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/bsc.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/bsc.blockchain.example.ts).

### How to send native and token transactions to another wallet

You can find examples [here](./src/app/bsc.tx.example.ts).

### How to work with nfts (ERC721)

You can find examples [here](./src/app/bsc.nft.example.ts).

### How to work with multitokens (ERC1155)

You can find examples [here](./src/app/bsc.multitoken.example.ts).

### How to work with auctions

You can find examples [here](./src/app/bsc.auction.example.ts).

### How to setup webhooks

You can find examples [here](./src/app/bsc.subscriptions.example.ts).

# How to generate virtual account for BSC and transfer from it to a blockchain address

You can find examples [here](./src/app/bsc.offchain.example.ts).
