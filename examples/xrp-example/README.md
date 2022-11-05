# How to use TatumSDK with Ripple

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the XRP blockchain. You will be able to:

- generate XRP wallet
- send XRP to another wallet
- check the balance of your wallet

- generate virtual account for XRP
- generate deposit address for virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/xrp package from npm.

```bash
npm install @tatumio/xrp
```

or

```bash
yarn add @tatumio/xrp
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumXrpSDK } from '@tatumio/xrp'

const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate XRP wallet

```typescript
import { TatumXrpSDK } from '@tatumio/xrp'

const xrpSDK = TatumXrpSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = xrpSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

### How to check balance of the address

Check example [here](./src/app/xrp.acount.balance.example.ts).

### How to read information from the blockchain

Check example [here](./src/app/xrp.blockchain.example.ts).

### How to send transaction to another wallet

Check example [here](./src/app/xrp.tx.example.ts).

### How to generate virtual account for XRP and transfer from it to a blockchain address

Check example [here](./src/app/xrp.virtualAccount.example.ts).
