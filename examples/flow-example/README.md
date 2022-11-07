# How to use TatumSDK with FLOW

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the FLOW blockchain. You will be able to:

- generate FLOW wallet
- read information from blockchain
- send FLOW to another wallet
- send custom FLOW transaction
- generate virtual account for FLOW
- assign deposit address to virtual account
- deploy/mint/transfer/burn NFT

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/flow package from npm.

```bash
npm install @tatumio/flow
```

or

```bash
yarn add @tatumio/flow
```

At the end, you need to initialize new SDK with your API Key and network flag (it's required).

```typescript
import { TatumFlowSDK } from '@tatumio/flow'

const flowSDK = TatumFlowSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab', testnet: true })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate FLOW wallet

You can find examples [here](./src/app/flow.wallet.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/flow.blockchain.example.ts).

### How to send native transactions to another wallet or execute custom transactions

You can find examples [here](./src/app/flow.tx.example.ts).

### How to work with NFTs (ERC721)

You can find examples [here](./src/app/flow.nft.example.ts)

### How to setup webhooks

You can find examples [here](./src/app/flow.subscriptions.example.ts).

### How to generate virtual account for FLOW and transfer from it to a blockchain address

You can find examples [here](./src/app/flow.virtualAccount.example.ts).
