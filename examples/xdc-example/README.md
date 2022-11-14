# Tatum JavaScript SDK for XinFin (XDC)

Welcome to the **Tatum JavaScript SDK** for **XinFin**!

We prepared a set of examples to help you complete some basic operations on XinFin using the SDK. Using these examples, you will be able to do the following:

- Generate a XinFin wallet.
- Send XDC from your wallet to another XinFin wallet.
- Check the balance of the wallet.
- Generate a virtual account for XDC.
- Generate a deposit address for the virtual account.
- Create subscriptions to be notified about transactions on the virtual account.
- Invoke a method in a smart contract.
- Transfer assets from gas pump addresses.
- Work with fungible tokens.
- Get information from the blockchain.

The examples are written in TypeScript, but you can use them in JavaScript too.

## Before you start

The examples follow the ECMAScript 6 (ES6) standard. Therefore, make sure that you have Node.js 10 or higher.

## Get the SDK ready

1. Get your API key from the Tatum Dashboard.

    [Log in with your Tatum account](https://dashboard.tatum.io) or [sign up for free](https://dashboard.tatum.io/sign-up).
1. Install the `@tatum/xdc` package.

    ```bash
    npm install @tatumio/xdc
    ```
    or
    ```bash
    yarn add @tatumio/xdc
    ```
1. Initialize the newly installed SDK with your API key.
        
    ```typescript
    import { TatumXdcSDK } from '@tatumio/xdc'

    const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
    ```

## Review the examples

Start with generating a XinFin wallet:

```typescript
import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = xdcSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

Here is how you can use web3:

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
const blockNumber = await web3.eth.getBlockNumber()
```

Check out more examples to see what you want to do next:
- [Send XDC from your wallet to another XinFin wallet.](./src/app/xdc.tx.example.ts)
- [Check the balance of a XinFin wallet.](./src/app/xdc.balance.example.ts)
- [Generate a virtual account for XDC and transfer funds from this account to a blockchain address.](./src/app/xdc.virtualAccount.example.ts)
- [Create a subscription to be notified about transactions on the virtual account.](./src/app/xdc.subscriptions.example.ts)
- [Invoke a method in a smart contract.](./src/app/xdc.smartContract.example.ts)
- [Transfer assets from gas pump addresses.](./src/app/xdc.gasPump.example.ts)
- [Work with fungible tokens.](./src/app/xdc.erc20.example.ts)
- [Get information from the blockchain.](./src/app/xdc.blockchain.example.ts)
