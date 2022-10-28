# How to use TatumSDK with XinFin XDC

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the XDC blockchain. You will be able to:

- generate XDC wallet
- send XDC to another wallet
- check the balance of your wallet
- How to send transaction using kms
- generate virtual account for XLM
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/xdc package from npm.

```bash
npm install @tatumio/xdc
```

or

```bash
yarn add @tatumio/xdc
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumXlmSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate XLM wallet

```typescript
import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = xdcSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/xdc.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/xdc.blockchain.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/xdc.tx.example.ts).

### How to send transaction using kms

You can find examples [here](./src/app/xdc.kms.example.ts).

### How to generate virtual account for XDC and transfer from it to a blockchain address

You can find examples [here](./src/app/xdc.virtualAccount.example.ts).

### How to send transaction using Gas pump

You can find examples [here](./src/app/xdc.gasPump.example.ts).
