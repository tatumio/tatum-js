# How to use TatumSDK with Ethereum eth

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the eth blockchain. You will be able to:

- generate eth wallet
- send eth to another wallet
- check the balance of your wallet

- generate virtual account for eth
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/eth package from npm.

```bash
npm install @tatumio/eth
```

or

```bash
yarn add @tatumio/eth
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumethSDK } from '@tatumio/eth'

const ethSDK = TatumethSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate eth wallet

```typescript
import { TatumethSDK } from '@tatumio/eth'

const ethSDK = TatumethSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = ethSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/eth.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/eth.blockchain.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/eth.tx.example.ts).

### How to generate virtual account for eth and transfer from it to a blockchain address

You can find examples [here](./src/app/eth.virtualAccount.example.ts).
