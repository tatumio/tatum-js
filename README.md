<p align="center">
  <a href="https://getbootstrap.com/">
    <img src="https://tatum.io/images/Light.svg" alt="Logo" width="200" height="100">
  </a>
</p>

<h3 align="center">Tatum API Client v2</h3>

<p align="center">
  Tatum API client allows browsers and Node.js clients to interact with Tatum API. You can find API documentation at
  <br>
  <a href="https://tatum.io/apidoc"><strong>API docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/tatumio/tatum-js/issues/new?assignees=-&labels=bug&template=bug_report.yml">Report bug</a>
</p>

<div align="center">

<a href="">[![Build all packages](https://github.com/tatumio/tatum-js/actions/workflows/build.yaml/badge.svg?branch=master)](https://github.com/tatumio/tatum-js/actions/workflows/build.yaml)</a>
<a href="">[![GitHub license](https://img.shields.io/npm/dm/@tatumio/tatum)](https://img.shields.io/npm/dm/@tatumio/tatum)</a>
<a href="">[![npm version](https://img.shields.io/npm/v/@tatumio/sdk.svg?style=flat-square)](https://www.npmjs.com/package/@tatumio/sdk)</a>
<a href="">[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)</a>

</div>

<hr>

> **Are you looking for Tatum API client v1? It has been moved to long living branch [`Tatum SDK V1`](https://github.com/tatumio/tatum-js/tree/v1)**.

## Status

V2 is currently under active development and considered alpha version. (you can still use LTS version [`v1`](https://github.com/tatumio/tatum-js/tree/v1))

## Installation

This repository is a monorepo with multiple packages for each blockchain.

### Blockchain subpackage

You can select one or more blockchain packages that you want to use in your project and install them separately.

#### Install using [npm](https://www.npmjs.com/)

```console
npm install @tatumio/eth
```

#### Install using [yarn](https://yarnpkg.com/)

```console
yarn add @tatumio/eth
```

Currently supported blockchain sdks

<table>
<tr>
  <th align="center">
    <img width="294" height="1">
    <p> 
      <small>Blockchain</small>
    </p>
  </th>
  <th align="center">
    <img width="294" height="1">
    <p>
      <small>Package</small>
    </p>
  </th>
  <th align="center">
    <img width="294" height="1">
    <p>
      <small>Examples</small>
    </p>
  </th>
</tr>
<tr>
  <td align="center">Algo</td>
  <td align="center">@tatumio/algo</td>
  <td align="center">[xlm examples](https://github.com/tatumio/tatum-js/tree/master/examples/xlm-example)</td>
</tr>
<tr>
  <td align="center">Bitcoin cash</td>
  <td align="center">@tatumio/bch</td>
  <td align="center">[bcash examples](https://github.com/tatumio/tatum-js/tree/master/examples/bch-example)</td>
</tr>
<tr>
  <td align="center">Bitcoin</td>
  <td align="center">@tatumio/btc</td>
  <td align="center">[btc examples](https://github.com/tatumio/tatum-js/tree/master/examples/btc-example)</td>
</tr>
<tr>
  <td align="center">Binance smart chain</td>
  <td align="center">@tatumio/bsc</td>
  <td align="center">[bsc examples](https://github.com/tatumio/tatum-js/tree/master/examples/bsc-example)</td>
</tr>
<tr>
  <td align="center">Celo</td>
  <td align="center">@tatumio/celo</td>
  <td align="center">[celo examples](https://github.com/tatumio/tatum-js/tree/master/examples/celo-example)</td>
</tr>
<tr>
  <td align="center">Dogecoin</td>
  <td align="center">@tatumio/dog</td>
  <td align="center">[doge examples](https://github.com/tatumio/tatum-js/tree/master/examples/doge-example)</td>
</tr>
<tr>
  <td align="center">Ethereum</td>
  <td align="center">@tatumio/eth</td>
  <td align="center">[eth examples](https://github.com/tatumio/tatum-js/tree/master/examples/eth-example)</td>
</tr>
<tr>
  <td align="center">Flow</td>
  <td align="center">@tatumio/flow</td>
  <td align="center">[flow examples](https://github.com/tatumio/tatum-js/tree/master/examples/flow-example)</td>
</tr>
<tr>
  <td align="center">KuCoin</td>
  <td align="center">@tatumio/kcs</td>
  <td align="center">[kcs examples](https://github.com/tatumio/tatum-js/tree/master/examples/kcs-example)</td>
</tr>
<tr>
  <td align="center">Klaytn</td>
  <td align="center">@tatumio/klaytn</td>
  <td align="center">[klaytn examples](https://github.com/tatumio/tatum-js/tree/master/examples/klaytn-example)</td>
</tr>
<tr>
  <td align="center">Litecoin</td>
  <td align="center">@tatumio/ltc</td>
  <td align="center">[ltc examples](https://github.com/tatumio/tatum-js/tree/master/examples/ltc-example)</td>
</tr>
<tr>
  <td align="center">Polygon</td>
  <td align="center">@tatumio/polygon</td>
  <td align="center">[polygon examples](https://github.com/tatumio/tatum-js/tree/master/examples/polygon-example)</td>
</tr>
<tr>
  <td align="center">Solana</td>
  <td align="center">@tatumio/solana</td>
  <td align="center">[solana examples](https://github.com/tatumio/tatum-js/tree/master/examples/solana-example)</td>
</tr>
<tr>
  <td align="center">Tron</td>
  <td align="center">@tatumio/tron</td>
  <td align="center">[tron examples](https://github.com/tatumio/tatum-js/tree/master/examples/tron-example)</td>
</tr>
<tr>
  <td align="center">Stellar</td>
  <td align="center">@tatumio/xlm</td>
  <td align="center">[xlm examples](https://github.com/tatumio/tatum-js/tree/master/examples/xlm-example)</td>
</tr>
<tr>
  <td align="center">XRP</td>
  <td align="center">@tatumio/xrp</td>
  <td align="center">[xrp examples](https://github.com/tatumio/tatum-js/tree/master/examples/xrp-example)</td>
</tr>
</table>

### Full package

It is possible to install the full package with all supported blockchain modules, although this is not recommended for browser environments due to the size of the dependencies.

```console
npm install @tatumio/sdk
```

### Node.JS & Browser support

Installing package you also need to check if selected package is supported in your environment. Not all packages are supported both in node and browser environments.

Library is written in TypeScript with ES2017 as the target JS version. Library should work in Node.JS (current LTS) and in web.

## Configuration and setup

| Variable                  | Required | Default value    | Description                                                                                                                                                                                                                                   |
| ------------------------- | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TESTNET_TYPE              |          | ethereum-sepolia | For Ethereum, there are 2 testnet chains supported - Sepolia and Goerli. To enable Goerli, you need to use ethereum-goerli.                                                                                                                   |
| TATUM_GAS_STATION_API_KEY |          |                  | In the library, there are functions for estimating the Ethereum transaction fee. For the estimation of the transaction fee, we are using https://ethgasstation.info. If you have your API key from https://ethgasstation.info you can use it. |
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

<details>
  <summary style='font-size: 16px; font-weight: bold'>Usage with create-react-app (which uses Webpack 5)</summary>

Webpack v5 introduced breaking changes to Web3 library used in Tatum blockchain services. To enable Tatum SDK in React apps you need to follow workaround as per [stackoverflow discussion](https://stackoverflow.com/questions/66952972/cannot-add-web3-to-react-project)

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

</details>

## Contributing

Contributions to the Tatum API client are welcome. Please ensure
that you have tested your changes with a local client and have added unit test
coverage for your code.

### Bugs and feature requests

Have a bug or a feature request? Please first read the issue guidelines and search for existing and closed issues. If your problem or idea is not addressed yet, please open a [new issue]( [please open a new issue](https://github.com/tatumio/tatum-js/issues/new/choose)).
