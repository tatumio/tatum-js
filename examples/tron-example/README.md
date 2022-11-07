# How to use TatumSDK with TRON

These examples should guide you through some basic operations of the TRON blockchain. You will be able to:

- generate TRON wallet
- send TRON to another wallet
- check the balance of your wallet

- generate virtual account for TRON
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatumio/tron package from npm.

```bash
npm install @tatumio/tron
```

or

```bash
yarn add @tatumio/tron
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate TRON wallet

```typescript
import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await tronSDK.wallet.generateWallet()

console.log(`Created a wallet with ${mnemonic} and public key ${xpub}.`)
```

### How to use web3

```typescript
import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

const web = await tronSDK.tronWeb.getClient()
const balance = await web.trx.getBalance('TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ')
```

### How to check balance of the address

You can find examples [here](./src/app/tron.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/tron.blockchain.example.ts).

### How to send native transactions to another wallet

You can find examples [here](./src/app/tron.tx.example.ts).

### How to work with TRC20 tokens

You can find examples [here](./src/app/tron.trc20.example.ts).

### How to work with TRC10 tokens

You can find examples [here](./src/app/tron.trc10.example.ts).

### How to work with nfts (ERC721)

You can find examples [here](./src/app/tron.nft.example.ts)

### How to setup webhooks

You can find examples [here](./src/app/tron.subscriptions.example.ts).

### How to generate virtual account for TRON and transfer from it to a blockchain address

You can find examples [here](./src/app/tron.virtualAccount.example.ts).
