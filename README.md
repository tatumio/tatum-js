<p align="center">
  <a href="https://tatum.io/">
    <img src="https://tatum.io/images/Light.svg" alt="Logo" width="200" height="100">
  </a>
</p>

<h3 align="center">Tatum SDK v2</h3>

<p align="center">
  Tatum SDK allows browsers and Node.js clients to interact with Tatum API. You can find API documentation at
  <br>
  <a href="https://tatum.io/apidoc"><strong>API docs »</strong></a>
  <br>
  <br>
  <a href="https://github.com/tatumio/tatum-js/issues/new?assignees=-&labels=bug&template=bug_report.yml">Report bug</a>
</p>

<div align="center">

<a href="">[![Build all packages](https://github.com/tatumio/tatum-js/actions/workflows/build.yaml/badge.svg?branch=v2)](https://github.com/tatumio/tatum-js/actions/workflows/build.yaml)</a>
<a href="">[![GitHub license](https://img.shields.io/npm/dm/@tatumio/tatum)](https://img.shields.io/npm/dm/@tatumio/tatum)</a>
<a href="">[![npm version](https://img.shields.io/npm/v/@tatumio/sdk.svg?style=flat-square)](https://www.npmjs.com/package/@tatumio/sdk)</a>
<a href="">[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)</a>

</div>

<hr>

> **Are you looking for Tatum SDK v1? It has been moved to long living branch [`Tatum SDK V1`](https://github.com/tatumio/tatum-js/tree/v1)**.

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
  <!-- Header -->
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
  <!-- Rows -->
  <tr>
    <td align="center">Algo</td>
    <td align="center">@tatumio/algo</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/algo-example'>algo examples</a></td>
  </tr>
  <tr>
    <td align="center">Bitcoin cash</td>
    <td align="center">@tatumio/bch</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/bch-example'>bcash examples</a></td>
  </tr>
  <tr>
    <td align="center">Bitcoin</td>
    <td align="center">@tatumio/btc</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/btc-example'>btc examples</a></td>
  </tr>
  <tr>
    <td align="center">Binance smart chain</td>
    <td align="center">@tatumio/bsc</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/bsc-example'>bsc examples</a></td>
  </tr>
  <tr>
    <td align="center">Celo</td>
    <td align="center">@tatumio/celo</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/celo-example'>celo examples</a></td>
  </tr>
  <tr>
    <td align="center">Dogecoin</td>
    <td align="center">@tatumio/dog</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/doge-example'>doge examples</a></td>
  </tr>
  <tr>
    <td align="center">Ethereum</td>
    <td align="center">@tatumio/eth</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/eth-example'>eth examples</a></td>
  </tr>
  <tr>
    <td align="center">Flow</td>
    <td align="center">@tatumio/flow</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/flow-example'>flow examples</a></td>
  </tr>
  <tr>
    <td align="center">KuCoin</td>
    <td align="center">@tatumio/kcs</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/kcs-example'>kcs examples</a></td>
  </tr>
  <tr>
    <td align="center">Klaytn</td>
    <td align="center">@tatumio/klaytn</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/klaytn-example'>klaytn examples</a></td>
  </tr>
  <tr>
    <td align="center">Litecoin</td>
    <td align="center">@tatumio/ltc</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example'>ltc examples</a></td>
  </tr>
  <tr>
    <td align="center">Polygon</td>
    <td align="center">@tatumio/polygon</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/polygon-example'>polygon examples</a></td>
  </tr>
  <tr>
    <td align="center">Solana</td>
    <td align="center">@tatumio/solana</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/solana-example'>solana examples</a></td>
  </tr>
  <tr>
    <td align="center">Tron</td>
    <td align="center">@tatumio/tron</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/tron-example'>tron examples</a></td>
  </tr>
  <tr>
    <td align="center">Stellar</td>
    <td align="center">@tatumio/xlm</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/xlm-example'>xlm examples</a></td>
  </tr>
  <tr>
    <td align="center">XRP</td>
    <td align="center">@tatumio/xrp</td>
    <td align="center"><a href='https://github.com/tatumio/tatum-js/tree/v2/examples/xrp-example'>xrp examples</a></td>
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

| Variable              | Required | Default value    | Description                                                                                                                 |
| --------------------- | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| TESTNET_TYPE          | -        | ethereum-sepolia | For Ethereum, there are 2 testnet chains supported - Sepolia and Goerli. To enable Goerli, you need to use ethereum-goerli. |
| YOUR_TRON_PRO_API_KEY | -        | -                | If you want to work with TRON locally, you need to enter API Key for [Trongrid] (https://trongrid.io).                      |

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
| Virtual accounts | ethSDK.virtualAccount.storeTokenAddress | Tatum Virtual Account services
| Record | ethSDK.record.storeLog | Blockchain log
| Security | ethSDK.security.checkMaliciousAddress | Security utilities
| Subscriptions | ethSDK.subscriptions.createSubscription | Notification services
| Tatum | ethSDK.tatum.freezeApiKey | Tatum Ledger custody services
| Transaction | ethSDK.transaction.prepare.transferSignedTransaction | Blockchain native transfer
| Wallet | ethSDK.wallet.generateWallet | Create blockchain wallet and address

All examples of SDK usage will be found after completion at https://github.com/tatumio/tatum-js/tree/v2/examples

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
<details>
  <summary style='font-size: 16px; font-weight: bold'>Usage with Vite and browser extension support</summary>

To allow usage of Tatum SDK in browser extensions, you need to add additional esbuild plugins to your `vite.config.js` file.

#### 1. Install additional dependencies

```console
yarn add -D @esbuild-plugins/node-globals-polyfill
yarn add -D @esbuild-plugins/node-modules-polyfill
```

#### 2. Copy [vite.config.js](https://github.com/tatumio/tatum-js/tree/v2/documentation/vite.config.ts) to your project

🎉 You are ready to use Tatum SDK in your browser extension.
</details>

## Contributing

Contributions to the Tatum SDK are welcome. Please ensure
that you have tested your changes with a local client and have added unit test
coverage for your code.

### Bugs and feature requests

Have a bug or a feature request? Please first read the issue guidelines and search for existing and closed issues. If your problem or idea is not addressed yet, please open a [new issue]( [please open a new issue](https://github.com/tatumio/tatum-js/issues/new/choose)).
