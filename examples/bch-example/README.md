# How to use TatumSDK with BCH

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the BCH blockchain. You will be able to:

- generate BCH wallet
- send BCH to another wallet
- check the balance of your wallet

- generate virtual account for BCH
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/bch package from npm.

```bash
npm install @tatumio/bch
```

or

```bash
yarn add @tatumio/bch
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumBchSDK } from '@tatumio/bch'

const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate BCH wallet

```typescript
import { TatumBchSDK } from '@tatumio/bch'

const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await bchSDK.wallet.generateWallet()
console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)
```

### How to read information from the blockchain

You can find examples [here](./src/app/bch.blockchain.example.ts).

### How to generate wallets, privatekeys, addresses for bch

You can find examples [here](./src/app/bch.wallet.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/bch.tx.example.ts).

### How to execute offchain methods for bch

You can find examples [here](./src/app/bch.offchain.example.ts).

### How to get exchange rates for bch

You can find examples [here](./src/app/bch.root.example.ts).

### How to get or delete pending transactions, sign or complete transactions from kms

You can find examples [here](./src/app/bch.kms.example.ts).
