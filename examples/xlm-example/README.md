# How to use TatumSDK with Stellar XLM

This is an example of a README.md file for a project.

These examples should guide you through some basic operations of the XLM blockchain. You will be able to:

- generate XLM wallet
- send XLM to another wallet
- check the balance of your wallet

- generate virtual account for XLM
- assign deposit address to virtual account

## How to start

In order to start, you need to create an API Key at [Tatum Dashboard](https://dashboard.tatum.io).

You need to install the @tatum/xlm package from npm.

```bash
npm install @tatumio/xlm
```

or

```bash
yarn add @tatumio/xlm
```

At the end, you need to initialize new SDK with your API Key.

```typescript
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
```

Examples are written in TypeScript, but you can use them in JavaScript as well. We are following ES6 standard, so you
need to have Node.js version 10 or higher.

### How to generate XLM wallet

```typescript
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = xlmSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)
```

### How to check balance of the address

```typescript
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = xlmSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)

// FUND YOUR ACCOUNT WITH XLM FROM https://laboratory.stellar.org/#account-creator?network=testnet

// https://apidoc.tatum.io/tag/Stellar#operation/XlmGetAccountInfo
const accountDetails = await xlmSDK.blockchain.xlmGetAccountInfo(account)
// We need to divide the balance by 1_000_000, because the balance is in stroops.
console.log(`My account has ${Number(accountDetails.balances[0].balance) / 1000000} XLM.`)
```

### How to read information from the blockchain

```typescript
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

// Get current latest ledger number
const currentLedger = await xlmSDK.blockchain.info()

// Get current fee applied to transactions
const fee = await xlmSDK.blockchain.getFee()

// Get details of a specific ledger
const ledger = await xlmSDK.blockchain.getLedger('123456')

// Get list of all transctions in the specific ledger
const ledgerTxs = await xlmSDK.blockchain.getLedgerTx('123456')

// Get details of a specific transaction
const transaction = await xlmSDK.blockchain.getTransaction(
  '749e4f8933221b9942ef38a02856803f379789ec8d971f1f60535db70135673e',
)
```

### How to send transaction to another wallet

```typescript
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
const { account, secret } = xlmSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)

const { account: to } = xlmSDK.wallet.wallet()
// FUND YOUR ACCOUNT WITH XLM FROM https://laboratory.stellar.org/#account-creator?network=testnet

const accountDetails = await xlmSDK.blockchain.getAccountInfo(account)
console.log(`My account has ${accountDetails.balances[0].balance} XLM.`)

// https://apidoc.tatum.io/tag/Stellar#operation/XlmTransferBlockchain
const { txId } = await xlmSDK.transaction.sendTransaction(
  {
    fromAccount: account,
    fromSecret: secret,
    amount: '1',
    to: to,
    initialize: true,
  },
  { testnet: true },
)
console.log(`Transaction with ID ${txId} was sent.`)
```

# How to generate virtual account for XLM and transfer from it to a blockchain address

```typescript
import { TatumXlmSDK } from '@tatumio/xlm'
import { Currency } from './Currency'

const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

const { account, secret } = xlmSDK.wallet.wallet()
console.log(`My public address is ${account}, with private key ${secret}.`)

// Generate new virtual account for XLM with specific blockchain address
// Each XLM virtual account must have MEMO field generated - take a look here for more details - https://docs.tatum.io/guides/ledger-and-off-chain/how-to-set-up-virtual-accounts-with-xrp-bnb-and-xlm
// No MEMO is created with this operation, only virtual account
// https://apidoc.tatum.io/tag/Account#operation/createAccount
const virtualAccount = await xlmSDK.ledger.account.create({
  currency: Currency.XLM,
  xpub: account,
})
console.log(JSON.stringify(virtualAccount))

// we need to generate MEMO - which is a deposit address - for this virtual account
// https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
const depositAddress = await xlmSdk.virtualAccount.depositAddress.create(virtualAccount.id)

console.log(JSON.stringify(depositAddress))
// Result of the operation is combination of deposit address and MEMO
console.log(`Deposit address is ${depositAddress.address} with MEMO ${depositAddress.derivationKey}`)

// FUND YOUR ACCOUNT WITH XLM FROM https://laboratory.stellar.org/#account-creator?network=testnet

// I wanna send assets from virtualAccount to blockchain address
// https://apidoc.tatum.io/tag/Blockchain-operations#operation/XlmTransfer
const result = await xlmSDK.virtualAcount.sendTransactionFromVirtualAccountToBlockchain({
  senderAccountId: virtualAccount.id,
  amount: '1',
  to: account,
  memo: 'OPTIONAL_RECIPIENT_MEMO',
  secret: secret,
})

console.log(JSON.stringify(result))
```
