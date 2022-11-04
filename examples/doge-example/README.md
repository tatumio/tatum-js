# How to use TatumSDK with DOGE

These examples should guide you through some basic operations of the DOGE blockchain. You will be able to:

- generate DOGE wallet
- send DOGE to another wallet
- check the balance of your wallet

- generate virtual account for DOGE
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/doge package from npm.

```bash
npm install @tatumio/doge
```

or

```bash
yarn add @tatumio/doge
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumDogeSDK } from '@tatumio/doge'
const dogeSDK = TatumDogeSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate DOGE wallet

```typescript
import { TatumDogeSDK } from '@tatumio/doge'
const dogeSDK = TatumDogeSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await dogeSDK.wallet.generateWallet()
console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)
```

### How to read information from the blockchain

You can find examples [here](./src/app/doge.blockchain.example.ts).

### How to generate wallets, privatekeys, addresses for DOGE

You can find examples [here](./src/app/doge.wallet.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/doge.tx.example.ts).

### How to execute virtual account methods for DOGE

You can find examples [here](./src/app/doge.virtualAccount.example.ts).

### How to subscribe for incoming transactions for DOGE

You can find examples [here](./src/app/doge.subscriptions.example.ts).
