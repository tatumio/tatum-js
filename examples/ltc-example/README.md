# How to use TatumSDK with LTC

These examples should guide you through some basic operations of the LTC blockchain. You will be able to:

- generate LTC wallet
- send LTC to another wallet
- check the balance of your wallet

- generate virtual account for LTC
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatumio/ltc package from npm.

```bash
npm install @tatumio/ltc
```

or

```bash
yarn add @tatumio/ltc
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumLtcSDK } from '@tatumio/ltc'

const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate LTC wallet

```typescript
import { TatumLtcSDK } from '@tatumio/ltc'

const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await ltcSDK.wallet.generateWallet()

console.log(`Created a wallet with ${mnemonic} and public key ${xpub}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/ltc.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/ltc.blockchain.example.ts).

### How to send native transactions to another wallet

You can find examples [here](./src/app/ltc.tx.example.ts).

### How to setup webhooks

You can find examples [here](./src/app/ltc.subscriptions.example.ts).

### How to generate virtual account for LTC and transfer from it to a blockchain address

You can find examples [here](./src/app/ltc.virtualAccount.example.ts).
