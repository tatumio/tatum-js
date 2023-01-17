# Tatum JavaScript SDK for Algorand (ALGO)

Welcome to the **Tatum JavaScript SDK** for **Algorand**!

We prepared a set of examples to help you complete some basic operations on Algorand using the SDK. Using these examples, you will be able to do the following:

- Generate an Algorand wallet.
- Send ALGO from your wallet to another Algorand wallet.
- Check the balance of the wallet.
- Generate a virtual account for ALGO.
- Assign a deposit address to the virtual account.
- Create subscriptions to be notified about transactions on the virtual account.
- Work with fungible tokens (ASA) and NFTs.
- Get information from the blockchain.

## Before you start

The examples follow the ECMAScript 6 (ES6) standard. Therefore, make sure that you have Node.js 10 or higher.

## Get the SDK ready

1. Get your API key from the Tatum Dashboard.

    [Log in with your Tatum account](https://dashboard.tatum.io) or [sign up for free](https://dashboard.tatum.io/sign-up).
1. Install the `@tatum/algo` package.

    ```bash
    npm install @tatumio/algo
    ```
    or
    ```bash
    yarn add @tatumio/algo
    ```
1. Initialize the newly installed SDK with your API key.
        
    ```typescript
    import { TatumAlgoSDK } from '@tatumio/algo'

    const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
    ```

## Review the examples

Start with generating an Algorand wallet:

```typescript
import { TatumAlgoSDK } from '@tatumio/algo'

const algoSDK = TatumAlgoSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { address, secret } = algoSDK.wallet.generateWallet()
console.log(`My public address is ${address}, with private key ${secret}.`)
```

Check out more examples to see what you want to do next:
- [Send ALGO from your wallet to another Algorand wallet.](./src/app/algo.tx.example.ts)
- [Check the balance of an Algorand wallet.](./src/app/algo.balance.example.ts)
- [Generate a virtual account for ALGO and transfer funds from this account to a blockchain address.](./src/app/algo.virtualAccount.example.ts)
- [Create a subscription to be notified about transactions on the virtual account.](./src/app/algo.subscriptions.example.ts)
- [Mint, transfer, and burn fungible tokens (ASA).](./src/app/algo.fungible.example.ts)
- [Mint, transfer, and burn an NFT.](./src/app/algo.nft.example.ts)
- [Mint, transfer, and burn a fractional NFT](./src/app/algo.nft.fractional.example.ts)
- [Get information from the blockchain.](./src/app/algo.blockchain.example.ts)
