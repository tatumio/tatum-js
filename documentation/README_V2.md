# [Tatum API client v2](http://tatum.io/) &middot; [![GitHub license](https://img.shields.io/npm/dm/@tatumio/tatum)](https://img.shields.io/npm/dm/@tatumio/tatum) [![Build all packages](https://github.com/tatumio/tatum-js/actions/workflows/build.yaml/badge.svg?branch=master)](https://github.com/tatumio/tatum-js/actions/workflows/build.yaml)

Tatum API client allows browsers and Node.js clients to interact with Tatum API. You can find API documentation at [API doc](https://tatum.io/apidoc).

> **Are you looking for Tatum API client v1? It has been moved to long living branch [`/tatumio/tatum-js/tree/v1`](https://github.com/tatumio/tatum-js/tree/v1)**.

## Status

V2 is currently under active development and considered alpha version. (you can still use LTS version [`v1`](https://github.com/tatumio/tatum-js/tree/v1))

## Installation

This repository is a monorepo with multiple packages for each blockchain.

### Blockchain subpackage

You can select one or more blockchain packages that you want to use in your project and install them separately.

```console
npm install @tatumio/eth
```

Currently supported blockchains
| Syntax | Description |
| ----------- | ----------- |
| Algo | @tatumio/algo |
| Bitcoin cash | @tatumio/bch |
| Bitcoin | @tatumio/btc |
| Binance smart chain | @tatumio/bsc |
| Celo | @tatumio/celo |
| Dogecoin | @tatumio/doge |
| Ethereum | @tatumio/eth |
| Flow | @tatumio/flow |
| KuCoin | @tatumio/kcs |
| Klaytn | @tatumio/klaytn |
| Litecoin | @tatumio/ltc |
| Polygon | @tatumio/polygon |
| Solana | @tatumio/solana |
| Tron | @tatumio/tron |
| Stellar | @tatumio/xlm |
| XRP | @tatumio/xrp |

### Full package

It is possible to install the full package with all supported blockchain modules, although this is not recommended for browser environments due to the size of the dependencies.

```console
npm install @tatumio/sdk
```

### Node.JS & Browser support

Installing package you also need to check if selected package is supported in your environment. Not all packages are supported both in node and browser environments.

Library is written in TypeScript with ES2017 as the target JS version. Library should work in Node.JS current LTS.

## Configuration and setup

| Variable                  | Required | Default value    | Description                                                                                                                                                                                                                                   |
| ------------------------- | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TESTNET_TYPE              |          | ethereum-ropsten | For Ethereum, there are 2 testnet chains supported - Ropsten and Rinkeby. To enable Rinkeby, you need to use ethereum-rinkeby.                                                                                                                |
| YOUR_TRON_PRO_API_KEY     |          |                  | If you want to work with TRON locally, you need to enter API Key for [Trongrid] (https://trongrid.io).                                                                                                                                        |

## Usage

```js
// es6
// import blockchain subpackage or full sdk package
import { TatumEthSDK } from '@tatumio/eth'

// pass API key from Tatum account available for free at https://dashboard.tatum.io/
const ethSDK = TatumEthSDK({ apiKey: '<Your API Key>' })

// pick Tatum service available from API docs
const generatedWallet = await ethSDK.api.ethGenerateWallet('<mnemonic phrase>')
console.log(generatedWallet)
```

Examples
| Service type | Path example | Description
| ----------- | ----------- |-----------
| Api | ethSDK.api.ethGenerateAddress | Blockchain native services
| Custodial | ethSDK.custodial.prepare.generateCustodialWalletSignedTransaction | Custodial wallet services
| Fungible tokens | ethSDK.fungible.deployToken | ERC20, TRC20, etc.
| NFT | ethSDK.nft.deployToken | ERC721, TRC721, etc.
| NFT Marketplace | ethSDK.auction.bid | NFT Marketplaces services
| NFT Auctions | ethSDK.marketplace.getMarketplaceListing | NFT Auctions services
| Multi tokens | ethSDK.multiToken.deployToken | ERC-1155 services
| httpDriver | ethSDK.httpDriver | Connect directly to Node
| KMS | ethSDK.kms.getAllPending | Tatum KMS
| Ledger | ethSDK.ledger.orderBook.newTrade | Tatum private Ledger
| Offchain | ethSDK.offchain.storeTokenAddress | Tatum Offchain
| Record | ethSDK.record.storeLog | Blockchain log
| Security | ethSDK.security.checkMaliciousAddress | Security utilities
| Subscriptions | ethSDK.subscriptions.createSubscription | Notification services
| Tatum | ethSDK.tatum.freezeApiKey | Tatum Ledger custody services
| Transaction | ethSDK.transaction.prepare.transferSignedTransaction | Blockchain native transfer
| Wallet | ethSDK.wallet.generateWallet | Create blockchain wallet and address

All examples of SDK usage will be found after completion at https://github.com/tatumio/tatum-js/tree/master/examples

### Usage with React - Webpack 5

Webpack v5 introduced breaking changes to Web3 library used in Tatum blockchain services. To enable Tatum SDK in React apps you need to follow workaround as per https://stackoverflow.com/questions/66952972/cannot-add-web3-to-react-project

#### 1. Install additional dependencies

```console
yarn add -D node-polyfill-webpack-plugin
yarn add -D react-app-rewired
```

#### 2. Copy [config-overrides.js](https://github.com/npwork/create-react-app-with-webpack5/blob/main/config-overrides.js) to your project (next to package.json)

#### 3. Add browserify dependencies to `package.json`

```json
"assert": "npm:assert",
"crypto": "npm:crypto-browserify",
"http": "npm:http-browserify",
"https": "npm:https-browserify",
"os": "npm:os-browserify",
"stream": "npm:stream-browserify",
"url": "npm:url",
...

```

#### 4. Replace `scripts` block in your `package.json`

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
```

#### 5. Start your app as usual

```console
npm start
```

## Contributing

Contributions to the Tatum API client are welcome. Please ensure
that you have tested your changes with a local client and have added unit test
coverage for your code.
