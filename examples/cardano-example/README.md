# How to use TatumSDK with Cardano

These examples should guide you through some basic operations of the Cardano blockchain. You will be able to:

- generate Cardano wallet
- send Cardano to another wallet
- check the balance of your wallet

- generate virtual account for Cardano
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/cardano package from npm.

```bash
npm install @tatumio/cardano
```

or

```bash
yarn add @tatumio/cardano
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumCardanoSDK } from '@tatumio/cardano'

const cardanoSDK = TatumCardanoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate Cardano wallet

```typescript
import { TatumCardanoSDK } from '@tatumio/cardano'

const cardanoSDK = TatumCardanoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await cardanoSDK.wallet.generateWallet()
console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)
```

### How to read information from the blockchain

You can find examples [here](./src/app/cardano.blockchain.example.ts).

### How to generate wallets, privatekeys, addresses for Cardano

You can find examples [here](./src/app/cardano.wallet.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/cardano.tx.example.ts).

### How to broadcast transaction

You can find examples [here](./src/app/cardano.tx.broadcast.example.ts).

### How to execute virtual account methods for Cardano

You can find examples [here](./src/app/cardano.virtualAccount.example.ts).

### How to subscribe for incoming transactions for Cardano

You can find examples [here](./src/app/cardano.subscriptions.example.ts).
