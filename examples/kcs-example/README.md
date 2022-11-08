# How to use TatumSDK with KCS

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the KCS blockchain. You will be able to:

- generate KCS wallet
- send KCS to another wallet
- check the balance of your wallet
- How to send transaction using kms
- generate virtual account for KCS
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/kcs package from npm.

```bash
npm install @tatumio/kcs
```

or

```bash
yarn add @tatumio/kcs
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate XLM wallet

```typescript
import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSDK = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = kcsSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/kcs.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/kcs.blockchain.example.ts).

### How to send native transactions to another wallet

You can find examples [here](./src/app/kcs.tx.example.ts).

### How to work with fungible tokens (ERC20)

You can find examples [here](./src/app/kcs.erc20.example.ts).

### How to work with nfts (ERC721)

You can find examples [here](./src/app/kcs.nft.example.ts)

### How to work with multitokens (ERC1155)

You can find examples [here](./src/app/kcs.multitoken.example.ts).

### How to setup webhooks

You can find examples [here](./src/app/kcs.subscriptions.example.ts).

### How to generate virtual account for KCS and transfer from it to a blockchain address

You can find examples [here](./src/app/kcs.virtualAccount.example.ts).

### How to work with smart contracts

You can find examples [here](./src/app/kcs.smartContract.example.ts).
