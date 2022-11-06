# How to use TatumSDK with Stellar Solana

These examples should guide you through some basic operations of the Solana blockchain. You will be able to:

- use Solana Web3 RPC API
- generate Solana wallet
- send Solana to another wallet
- check the balance of your wallet

- mint NFT
- transfer NFT
- deploy SPL

- generate virtual account for Solana
- assign deposit address to virtual account
- subscribe to webhook notifications

- build transaction
  for [custodial managed wallet](https://apidoc.tatum.io/tag/Custodial-managed-wallets#operation/CustodialTransferManagedAddress)

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/solana package from npm.

```bash
npm install @tatumio/solana
```

or

```bash
yarn add @tatumio/solana
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to use Web3 RPC API

```typescript
import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const web3response = await solanaSDK.httpDriver({
  jsonrpc: '2.0',
  method: 'getHealth',
  params: [],
  id: 2,
})
console.log(`Response is ${web3response}`)
```

### How to generate Solana wallet

```typescript
import { TatumSolanaSDK } from '@tatumio/solana'

const solanaSDK = TatumSolanaSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, privateKey, address } = solanaSDK.wallet.wallet()
console.log(
  `My public address is ${address}, with private key ${privateKey} of index 0 for mnemonic ${mnemonic}.`,
)
```

### How to check balance of the address

You can find examples [here](./src/app/solana.balance.example.ts).

### How to read information from the blockchain

You can find examples [here](./src/app/solana.blockchain.example.ts).

### How to send transaction to another wallet

You can find examples [here](./src/app/solana.tx.example.ts).

### How to work with NFTs on Solana

You can find examples [here](./src/app/solana.nft.example.ts).

### How to work with SPL tokens on Solana

You can find examples [here](./src/app/solana.spl.example.ts).

### How to work with webhook subscriptions on Solana

You can find examples [here](./src/app/solana.subscriptions.example.ts).

### How to generate virtual account for Solana and transfer from it to a blockchain address

You can find examples [here](./src/app/solana.virtualAccount.example.ts).

### How to generate payload for transfer from custodial [managed wallets for Solana](https://apidoc.tatum.io/tag/Custodial-managed-wallets)

You can find examples [here](./src/app/solana.custodial.managed.wallet.example.ts).
