# How to use TatumSDK with Stellar XLM

These examples should guide you through some basic operations of the XLM blockchain. You will be able to:

- generate XLM wallet
- send XLM to another wallet
- check the balance of your wallet

- generate virtual account for XLM
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/xlm package from npm.

```bash
npm install @tatumio/xlm
```

or

```bash
yarn add @tatumio/xlm
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate XLM wallet

```typescript
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = xlmSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/xlm.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/xlm.blockchain.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/xlm.tx.example.ts).

### How to send create/update/delete trustline transaction to another wallet

You can find examples [here](./src/app/xlm.tx.example.ts).

### How to generate virtual account for XLM and transfer from it to a blockchain address

You can find examples [here](./src/app/xlm.virtualAccount.example.ts).
