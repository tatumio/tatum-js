# How to use TatumSDK with Binance beacon chain

These examples should guide you through some basic operations of the BNB blockchain. You will be able to:

- generate BNB wallet
- check the balance of the wallet
- send BNB to another wallet
- perform blockchain queries such as getting specific block or transaction information

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/bnb package from npm.

```bash
npm install @tatumio/bnb
```

or

```bash
yarn add @tatumio/bnb
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumBnbSDK } from '@tatumio/bnb'

const bnbSDK = TatumBnbSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate a BNB wallet

```typescript
const bnbSDK = TatumBnbSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const wallet = bnbSDK.wallet

const { address, privateKey } = await wallet().generateWallet(true)
console.log(` My public address is ${address}, with private key ${privateKey}.`)
```

### How to send transaction to another wallet

You can find examples [here](./src/app/bnb.tx.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/bnb.blockchain.example.ts).
