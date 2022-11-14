# How to use TatumSDK with KLAYTN

These examples should guide you through some basic operations of the KLAYTN blockchain. You will be able to:

- generate KLAYTN wallet
- send KLAYTN to another wallet
- check the balance of your wallet

- generate virtual account for KLAYTN
- generate deposit address for virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatumio/klaytn package from npm.

```bash
npm install @tatumio/klaytn
```

or

```bash
yarn add @tatumio/klaytn
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate KLAYTN wallet

```typescript
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet()

console.log(`Created a wallet with ${mnemonic} and public key ${xpub}.`)
```

### How to use web3

```typescript
import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

const web3response = await klaytnSDK.httpDriver({
  jsonrpc: '2.0',
  method: 'web3_clientVersion',
  params: [],
  id: 2,
})

const gasPriceInWei = await klaytnSDK.getGasPriceInWei()
const web3 = klaytnSDK.web3Client()

const blockNumber = await web3.eth.getBlockNumber()
```

### How to check balance of the address

You can find examples [here](./src/app/klaytn.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/klaytn.blockchain.example.ts).

### How to send native transactions to another wallet

You can find examples [here](./src/app/klaytn.tx.example.ts).

### How to work with fungible tokens (ERC20)

You can find examples [here](./src/app/klaytn.erc20.example.ts).

### How to work with nfts (ERC721)

You can find examples [here](./src/app/klaytn.nft.example.ts) and [here](./src/app/klaytn.nft.express.mint.example.ts)

### How to work with multitokens (ERC1155)

You can find examples [here](./src/app/klaytn.multitoken.example.ts).

### How to setup webhooks

You can find examples [here](./src/app/klaytn.subscriptions.example.ts).

### How to generate virtual account for KLAYTN and transfer from it to a blockchain address

You can find examples [here](./src/app/klaytn.virtualAccount.example.ts).

### How to work with smart contracts

You can find examples [here](./src/app/klaytn.smartContract.example.ts).
