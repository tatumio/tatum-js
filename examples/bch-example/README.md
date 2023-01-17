# Tatum JavaScript SDK for Bitcoin Cash (BCH)

We prepared a set of examples to help you complete some basic operations on Bitcoin Cash using the SDK. Using these examples, you will be able to do the following:

- Generate a Bitcoin Cash wallet.
- Send BCH from your wallet to another Bitcoin Cash wallet.
- Broadcast a transaction to the blockchain.
- Get the current exchange rates.
- Generate a virtual account for BCH.
- Generate a deposit address to the virtual account.
- Get information from the blockchain.

The examples are written in TypeScript, but you can use them in JavaScript too.

## Before you start

The examples follow the ECMAScript 6 (ES6) standard. Therefore, make sure that you have Node.js 10 or higher.

## Get the SDK ready

1. Get your API key from the Tatum Dashboard.

   [Log in with your Tatum account](https://dashboard.tatum.io) or [sign up for free](https://dashboard.tatum.io/sign-up).

1. Install the `@tatum/bch` package.

   ```bash
   npm install @tatumio/bch
   ```

   or

   ```bash
   yarn add @tatumio/bch
   ```

1. Initialize the newly installed SDK with your API key.

   ```typescript
   import { TatumBchSDK } from '@tatumio/bch'

   const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
   ```

## Review the examples

Start with generating a Bitcoin Cash wallet:

```typescript
import { TatumBchSDK } from '@tatumio/bch'
const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { mnemonic, xpub } = await bchSDK.wallet.generateWallet()
console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)
```

Check out more examples to see what you want to do next:

- [Generate an address and private key for a Bitcoin Cash wallet.](./src/app/bch.wallet.example.ts)
- [Send BCH from your wallet to another Bitcoin Cash wallet.](./src/app/bch.tx.example.ts)
- [Broadcast a transaction to the blockchain.](./src/app/bch.tx.broadcast.example.ts)
- [Get the current exchange rates](./src/app/bch.root.example.ts)
- [Generate a virtual account for BCH and transfer funds from this account to a blockchain address.](./src/app/bch.virtualAccount.example.ts)
- [Get information from the blockchain.](./src/app/bch.blockchain.example.ts)
