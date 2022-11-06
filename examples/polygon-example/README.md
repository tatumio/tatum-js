# How to use TatumSDK with Polygon

These examples should guide you through some basic operations of the Polygon blockchain. You will be able to:

- generate wallet
- send MATIC to another wallet
- check the balance of your wallet
- generate virtual account
- create deposit address to virtual account
- create subscription for wallet address to be notified about transactions
- mint, transfer and burn NFT and ERC20 tokens
- auction operations

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/algo package from npm.

```bash
npm install @tatumio/polygon
```

or

```bash
yarn add @tatumio/polygon
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate Polygon wallet

```typescript
import { TatumPolygonSDK } from '@tatumio/polygon'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet()
console.log(`Wallet mnemonic is ${mnemonic}, extended public key is ${xpub}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/polygon.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/polygon.blockchain.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/polygon.tx.example.ts).

### How to generate virtual account for Polygon and transfer from it to a blockchain address

You can find examples [here](./src/app/polygon.virtualAccount.example.ts).

### How to create notification subscription for your wallet address

You can find examples [here](./src/app/polygon.subscriptions.example.ts).

### How to create, transfer and burn NFT token

You can find examples [here](./src/app/polygon.nft.example.ts).

### How to create NFT token with express

You can find examples [here](./src/app/polygon.nft.mint.express.example.ts).

### How to create, transfer and burn fungible (ERC20) token

You can find examples [here](./src/app/polygon.erc20.example.ts).

### How to create, transfer and burn multi token (1155)

You can find examples [here](./src/app/polygon.multitoken.example.ts).

### How to work with auctions

You can find examples [here](./src/app/polygon.auction.example.ts).
