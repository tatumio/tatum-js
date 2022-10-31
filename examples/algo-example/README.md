# How to use TatumSDK with Algorand

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the Algorand blockchain. You will be able to:

- generate wallet
- send ALGO to another wallet
- check the balance of your wallet
- generate virtual account
- assign deposit address to virtual account
- create subscription for virtual account to be notified about transactions
- mint, transfer and burn NFT and ASA (ERC20) tokens

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/algo package from npm.

```bash
npm install @tatumio/algo
```

or

```bash
yarn add @tatumio/algo
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate ALGO wallet

```typescript
import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { address, secret } = algoSDK.wallet.generateWallet()
console.log(`My public address is ${address}, with private key ${secret}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/algo.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/algo.blockchain.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/algo.tx.example.ts).

### How to generate virtual account for ALGO and transfer from it to a blockchain address

You can find examples [here](./src/app/algo.virtualAccount.example.ts).

### How to create notification subscription for your virtual account
You can find examples [here](./src/app/algo.subscriptions.example.ts).

### How to create, transfer and burn NFT token
You can find examples [here](./src/app/algo.nft.example.ts).

### How to create NFT token with express
You can find examples [here](./src/app/algo.nft.express.mint.example.ts).

### How to create, transfer and burn ASA (ERC20) token
You can find examples [here](./src/app/algo.asa.example.ts).
