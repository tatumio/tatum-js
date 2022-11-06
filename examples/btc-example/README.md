# How to use TatumSDK with BTC

These examples should guide you through some basic operations of the BTC blockchain. You will be able to:

- generate BTC wallet
- send BTC to another wallet
- check the balance of your wallet
- subscribe for events
- generate virtual account for BTC
- generate deposit addresses for virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatumio/btc package from npm.

```bash
npm install @tatumio/btc
```

or

```bash
yarn add @tatumio/btc
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumBtcSDK } from '@tatumio/btc'

const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate BTC wallet

```typescript
import { TatumBtcSDK } from '@tatumio/btc'

const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await btcSDK.wallet.generateWallet()

console.log(`Created a wallet with ${mnemonic} and public key ${xpub}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/btc.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/btc.blockchain.example.ts).

### How to send native transactions using address to another wallet

You can find examples [here](./src/app/btc.tx.fromAddress.example.ts).

### How to send native transactions using utxo to another wallet

You can find examples [here](./src/app/btc.tx.fromUtxo.example.ts).

### How to setup subscriptions for events

You can find examples [here](./src/app/btc.subscriptions.example.ts).

### How to generate virtual account for BTC and transfer from it to a blockchain address

You can find examples [here](./src/app/btc.virtualAccount.example.ts).
