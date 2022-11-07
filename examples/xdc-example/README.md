# How to use TatumSDK with XinFin XDC

These examples should guide you through some basic operations of the XDC blockchain. You will be able to:

- generate XDC wallet
- send XDC to another wallet
- check the balance of your wallet
- How to send transaction using kms
- generate virtual account for XDC
- generate deposit address for virtual account

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
import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate XDC wallet

```typescript
import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = xdcSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

### How to use web3

```typescript
import { TatumXdcSDK } from '@tatumio/xdc'
const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const web3response = await xdcSDK.httpDriver({
  jsonrpc: '2.0',
  method: 'web3_clientVersion',
  params: [],
  id: 2,
})
const gasPriceInWei = await xdcSDK.getGasPriceInWei()
const web3 = xdcSDK.web3Client()
const blockNumber = web3.eth.getBlockNumber()
const { balance } = await xdcSDK.blockchain.getBlockchainAccountBalance('xdce73f05a8b3b28e1afec4ab759101e79b28542440')
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

# How to work with smart contracts

You can find examples [here](./src/app/xdc.smartContract.example.ts).
