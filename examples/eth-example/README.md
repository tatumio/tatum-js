# How to use TatumSDK with Ethereum ETH

These examples should guide you through some basic operations of the ETH blockchain. You will be able to:

- generate ETH wallet
- send ETH to another wallet
- check the balance of your wallet
- How to send transaction using kms
- generate virtual account for ETH
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
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate ETH wallet

```typescript
import { TatumEthSDK } from '@tatumio/eth'

const ethSDK = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = ethSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

### How to check balance of the address

You can find examples [here](./src/app/eth.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/eth.blockchain.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/eth.tx.example.ts).

### How to send transaction using kms

You can find examples [here](./src/app/eth.kms.example.ts).

### How to generate virtual account for ETH and transfer from it to a blockchain address

You can find examples [here](./src/app/eth.virtualAccount.example.ts).

### How to work with fungible tokens (ERC20)

You can find examples [here](./src/app/eth.erc20.example.ts).

### How to work with nfts (ERC721)

You can find examples [here](./src/app/eth.nft.example.ts) and [here](./src/app/eth.nft.express.mint.example.ts)

### How to work with multitokens (ERC1155)

You can find examples [here](./src/app/eth.multitoken.example.ts).

### How to work with auctions

You can find examples [here](./src/app/eth.auction.example.ts).
