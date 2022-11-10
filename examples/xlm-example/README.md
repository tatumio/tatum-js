# Tatum JavaScript SDK for Stellar (XLM)

Welcome to the **Tatum JavaScript SDK** for **Stellar**!

We prepared a set of examples to help you complete some basic operations on Stellar. Using these examples, you will be able to do the following:

- Generate a Stellar wallet.
- Send XLM from your wallet to another Stellar wallet.
- Check the balance of the wallet.
- Generate a virtual account for XLM.
- Generate a deposit address for the virtual account.
- Get information from the blockchain.

The examples are written in TypeScript, but you can use them in JavaScript too.

## Before you start

The examples follow the ECMAScript 6 (ES6) standard. Therefore, make sure that you have Node.js 10 or higher.

## Get the SDK ready

1. Get your API key from the Tatum Dashboard.

    [Log in with your Tatum account](https://dashboard.tatum.io) or [sign up for free](https://dashboard.tatum.io/sign-up).
1. Install the `@tatum/xlm` package.

    ```bash
    npm install @tatumio/xlm
    ```
    or
    ```bash
    yarn add @tatumio/xlm
    ```
1. Initialize the newly installed SDK with your API key.
        
    ```typescript
    import { TatumXlmSDK } from '@tatumio/xlm'

    const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
    ```

## Review the examples

Start with generating a Stellar wallet:

```typescript
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = xlmSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

Check out more examples to see what you want to do next:
- [Send XLM from your wallet to another Stellar wallet.](./src/app/xlm.tx.example.ts)
- [Check the balance of a Stellar wallet.](./src/app/xlm.balance.example.ts)
- [Send a create/update/delete trustline transaction to a Stellar wallet.](./src/app/xlm.tx.trustline.example.ts)
- [Generate a virtual account for XLM and transfer funds from this account to a blockchain address.](./src/app/xlm.virtualAccount.example.ts)
- [Get information from the blockchain.](./src/app/xlm.blockchain.example.ts)
