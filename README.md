<p align="center">
  <a href="https://tatum.com/">
    <img src="https://tatum.io/images/Light.svg" alt="Logo" width="200" height="100">
  </a>
</p>

<h3 align="center">
Tatum
SDK</h3>

<p align="center">
  Tatum SDK allows browsers and Node.js clients to interact with Blockchain.
  <br>
  <a href="https://docs.tatum.com/"><strong>Documentation</strong></a>
  <br>
  <br>
  <a href="https://github.com/tatumio/tatum-js/issues/new?assignees=-&labels=bug&template=bug_report.yml">Report bug</a>
</p>

<div align="center">

<a href="">[![GitHub license](https://img.shields.io/npm/dm/@tatumcom/js)](https://img.shields.io/npm/dm/@tatumcom/js)</a>
<a href="">[![npm version](https://img.shields.io/npm/v/@tatumcom/js.svg?style=flat-square)](https://www.npmjs.com/package/@tatumcom/js)</a>
<a href="">[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tatumio/tatum-js/blob/master/LICENSE.txt)</a>
<a href="">[![Build](https://img.shields.io/github/actions/workflow/status/tatumio/tatum-js/build.yml?branch=master)](https://img.shields.io/github/actions/workflow/status/tatumio/tatum-js/build.yml?branch=master)</a>

</div>
<hr>

## Welcome

Welcome to TatumSDK, a powerful library designed to facilitate direct Remote Procedure Call (RPC) calls to the Ethereum, Polygon, Bitcoin and many more blockchains and provide real-time notifications for a wide range of events related to specified addresses. With TatumSDK, you can easily track incoming and outgoing transactions, NFT transfers, and much more, without the need for a third-party intermediary.

This guide will walk you through the basic setup, installation, and usage of TatumSDK to help you harness the full potential of this library.

## Prerequisites
Before diving into TatumSDK, ensure that you have the following prerequisites installed:

**Node.js**: Ensure you have the latest LTS version installed.
**npm**: npm is bundled with Node.js, so installing Node.js should automatically install npm.

## Installation
To install TatumSDK, simply run the following command in your terminal or command prompt:

### Install using [npm](https://www.npmjs.com/)

```console
npm install @tatumcom/js
```

### Install using [yarn](https://yarnpkg.com/)

```console
yarn add @tatumcom/js
```

### Install using [pnpm](https://pnpm.io/)

```console
pnpm install @tatumcom/js
```

## Getting started

### Basic Usage
Here's a brief overview of how to utilize TatumSDK for RPC calls and subscribing to notifications.

### Initialization
Start by importing the TatumSDK library and initializing the Ethereum client as follows:
Subscribe for any transaction on Ethereum address.

```js
import {
  TatumSDK,
  Chain,
  Network,
  Ethereum,
} from '@tatumcom/js'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })
```

### RPC Calls
To make RPC calls, use the available methods to interact with the Ethereum blockchain. For example, to fetch the balance of a specific Ethereum address:

```js
import {
  TatumSDK,
  Chain,
  Network,
  Ethereum,
} from '@tatumcom/js'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })

const balance = await tatum.rpc.getBalance('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
console.log(`Balance: ${balance}`);
```
### Subscribing to Notifications
To subscribe to notifications for events related to a specified Ethereum address, choose a type of event you want to be notified about.
We are going to use `addressEvent` as an example, which sends you notification about any transfer on the address - native ones, ERC20 tokens or NFTs. To subscribe to this event, use the following code:

```js
import {
  TatumSDK,
  Chain,
  Network,
  Ethereum,
} from '@tatumcom/js'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })

const { data } = await tatum.notification.subscribe.addressEvent({
  url: 'https://<YOUR_WEBHOOK_URL>',
  address: '0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990',
})

// 🎉  Now your address is subscribed for any events!
```

## Structure of the SDK
TatumSDK is thoughtfully designed and organized into two primary submodules to provide a clean and efficient way of interacting with the Ethereum blockchain:

* **RPC submodule - `tatum.rpc.*`**: This submodule enables you to make direct Remote Procedure Call (RPC) calls to multiple blockchains, providing seamless access to various on-chain data and functionalities. With the RPC submodule, you can fetch account balances, send transactions, interact with smart contracts, and more.

* **Notification submodule - `tatum.notification.*`**: This submodule allows you to subscribe to real-time notifications for a wide range of events related to specified blockchain addresses. By leveraging the notification submodule, you can effortlessly track incoming and outgoing transactions, NFT transfers, and other events without constantly polling the blockchain.

By dividing the library into these submodules, TatumSDK offers an organized, easy-to-use interface that makes interacting with the Ethereum and other blockchains a breeze. Both beginners and advanced developers can benefit from the streamlined architecture, enabling them to focus on building powerful blockchain applications.


## Documentation

Visit [Documentation](https://docs.tatum.com) to get started with Tatum SDK.

## Examples

We have several examples in the [examples](https://github.com/tatumio/tatum-js/tree/master/examples) directory.

## Legacy versions

Older versions of the Tatum SDK has been moved to long living branches [`Tatum SDK V1`](https://github.com/tatumio/tatum-js/tree/v1) and [`Tatum SDK V2`](https://github.com/tatumio/tatum-js/tree/v2).

## Contributing

Contributions to the Tatum SDK are welcome. Please ensure that you have tested your changes with a local client and have added unit test coverage for your code.
### Bugs and feature requests

Have a bug or a feature request? Please first read the issue guidelines and search for existing and closed issues. If your problem or idea is not addressed yet, please open a [new issue](https://github.com/tatumio/tatum-js/issues/new/choose).
