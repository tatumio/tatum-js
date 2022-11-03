# How to use TatumSDK with BTC

These examples should guide you through some basic operations of the BTC blockchain. You will be able to:

- generate BTC wallet
- send BTC to another wallet
- check the balance of your wallet

- generate virtual account for BTC
- generate deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/btc package from npm.

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

### How to generate BTC wallet, privateKey and address

```typescript
import { TatumBtcSDK } from '@tatumio/btc'

const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = btcSDK.wallet.wallet()
console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)
const privateKey = await btcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
console.log('PrivateKey', privateKey)
const address = btcSDK.wallet.generateAddressFromXPub(xpub, 1)
console.log('Address', address)
```

### How to read information from the blockchain

You can find examples [here](./src/app/btc.blockchain.example.ts).

### How to generate wallets, privatekeys, addresses for btc

You can find examples [here](./src/app/btc.wallet.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/btc.tx.example.ts).

### How to generate virtual account for BTC and transfer from it to a blockchain address

You can find examples [here](./src/app/btc.virtualAccount.example.ts).

### How to get exchange rates for btc

You can find examples [here](./src/app/btc.root.example.ts).

### How to get or delete pending transactions, sign or complete transactions from kms

You can find examples [here](./src/app/btc.kms.example.ts).
