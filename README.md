<p align="center">
  <a href="https://tatum.io/">
    <img src="https://assets-global.website-files.com/62624e283b503f3e68275638/62624e283b503fde012757c1_Light.svg" alt="Logo" width="200" height="100">
  </a>
</p>

<h3 align="center">
Tatum
SDK</h3>

<p align="center">
  Welcome to Tatum SDK - TypeScript/JavaScript Library for Simplifying Blockchain Development.<br>
  <a href="https://docs.tatum.io/"><strong>Documentation</strong></a>
  <br>
  <br>
  <a href="https://github.com/tatumio/tatum-js/issues/new?assignees=-&labels=bug&template=bug_report.yml">Report bug</a>
</p>

<div align="center">

<a href="">[![GitHub license](https://img.shields.io/npm/dm/@tatumio/tatum)](https://img.shields.io/npm/dm/@tatumio/tatum)</a>
<a href="">[![npm version](https://img.shields.io/npm/v/@tatumio/tatum.svg?style=flat-square)](https://www.npmjs.com/package/@tatumio/tatum)</a>
<a href="">[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tatumio/tatum-js/blob/master/LICENSE.txt)</a>
<a href="">[![Build](https://img.shields.io/github/actions/workflow/status/tatumio/tatum-js/build.yml?branch=master)](https://img.shields.io/github/actions/workflow/status/tatumio/tatum-js/build.yml?branch=master)</a>

</div>
<hr>

## 🚀 Tatum SDK
A powerful, feature-rich TypeScript/JavaScript library that streamlines the development of blockchain applications.

🔍 Designed For Developers
If you're looking to integrate blockchain functionalities into your projects, Tatum SDK is for you. We simplify the integration process by offering:

A user-friendly interface 🤝
Consistent interaction with a broad range of blockchains, including Ethereum 🔷, Polygon 🟣, Bitcoin ₿, and more.

With Tatum SDK, you can:

### 🔌 Perform Native RPC Calls

Interact seamlessly with various blockchains through native RPC calls. Say goodbye to the hassle of juggling separate RPC clients for each blockchain.

### 🔔 Create Notifications

Effortlessly monitor wallet activities. Set up real-time notifications for events like:

- Incoming and outgoing transactions
- Balance updates
- Contract interactions


### 👛 Access Wallet Information

Through a single interface, obtain crucial wallet details such as:

- Balances
- Transaction history
- Other pertinent information

### 🌱 Always Evolving
Our library is on a continuous journey of growth. We regularly add new features and extend support for more blockchains. It's the go-to choice for developers aiming to craft robust, scalable, and efficient blockchain apps without the overwhelming intricacies of diverse blockchain protocols.

### 📘 Getting Started with TatumSDK
This guide will lead you step by step, from basic setup and installation to harnessing the immense capabilities of our library.

## Prerequisites

Before diving into TatumSDK, ensure that you have the following prerequisites installed:

- **Node.js**: Ensure you have the latest LTS version installed.
- **npm**: npm is bundled with Node.js, so installing Node.js should automatically install npm.

## Installation

To install TatumSDK, simply run the following command in your terminal or command prompt:

### Install using [npm](https://www.npmjs.com/)

```console
npm install @tatumio/tatum
```

### Install using [yarn](https://yarnpkg.com/)

```console
yarn add @tatumio/tatum
```

### Install using [pnpm](https://pnpm.io/)

```console
pnpm install @tatumio/tatum
```

## Getting started

### Basic Usage

Here's a brief overview of how to utilize TatumSDK for RPC calls and subscribing to notifications.

### Initialization

Start by importing the TatumSDK library and initializing Ethereum client as follows:

```ts
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })
```

### RPC Calls

To make RPC calls, use the available methods to interact with Ethereum blockchain. For example, to fetch the balance of a specific Ethereum address:

```ts
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })

const { result } = await tatum.rpc.getBalance('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')
console.log(`Balance: ${data}`)
```

### Subscribing to Notifications

To subscribe to notifications for events related to a specified Ethereum address, choose a type of event you want to be notified about.
We are going to use `addressEvent` as an example, which sends you notification about any transfer on the address - native ones, ERC20 tokens or NFTs. To subscribe to this event, use the following code:

```ts
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })

const response = await tatum.notification.subscribe.addressEvent({
  url: 'https://<YOUR_WEBHOOK_URL>',
  address: '0x690B9A9E9aa1C9dB991C7721a92d351Db4FaC990',
})

console.log(response)
// 🎉  Now your address is subscribed for any events!
```

### Get NFT balance of a wallet

Using TatumSDK, obtain the NFT balance of an address by calling the getNFTBalance method within the NFT submodule and passing the target address as an argument. This streamlined process efficiently retrieves the total number of NFTs owned by the specified address. To achieve this, use the following code:

```ts
import { TatumSDK, Network, Ethereum, NftAddressBalance } from '@tatumio/tatum'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })

const balances: NftAddressBalance[] = await tatum.nft.getBalance({
  addresses: ['0x53e8577c4347c365e4e0da5b57a589cb6f2ab849'],
})

console.log(balances)
```

### Connect to MetaMask and send transaction

Using TatumSDK, it's possible to connect your browser application to MetaMask and perform transactions using it. To achieve this, use the following code:

```ts
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })

const account: string = await tatum.walletProvider.metaMask.connect()
const txId: string = await tatum.walletProvider.metaMask.transferNative(
  '0x53e8577C4347C365E4e0DA5B57A589cB6f2AB848',
  '1',
)

console.log(txId)
```

### Get exchange rates

Using TatumSDK, obtain current fiat/crypto exchange rates To achieve this, use the following code:

```ts
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })

const res = await tatum.rates.getCurrentRate('BTC', 'EUR')

console.log(res.data)
```

### Get current fees

Using TatumSDK, you can obtain recommended fee/gas price for a blockchain. Supported blockchains are:

- `Bitcoin`
- `Litecoin`
- `Dogecoin`
- `Ethereum`

```ts
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum'

const tatum = await TatumSDK.init<Ethereum>({
  network: Network.ETHEREUM_SEPOLIA,
  verbose: true,
  retryDelay: 1000,
  retryCount: 2,
  version: ApiVersion.V1,
})

const result = await tatum.fee.getCurrentFee()

console.log(result.data)
```

### Get token balance

Using TatumSDK, obtain all fungible token balances of an address by calling the getBalance method within the `token` submodule and passing the target address as an argument. This streamlined process efficiently retrieves all balances for fungible tokens that specified address holds. To achieve this, use the following code:

```ts
import { TatumSDK, Network, Ethereum } from '@tatumio/tatum'

const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM_SEPOLIA })

const { data: balances } = await tatum.token.getBalance({
  addresses: ['0x2cbaf358c0af93096bd820ce57c26f0b7c6ec7ab'],
})

console.log(balances)
```

## Documentation

- [Documentation and Guides](https://docs.tatum.io) to get started with Tatum SDK
- [Documentation section](https://github.com/tatumio/tatum-js/tree/master/docs) for more details.

## Examples

- [Browser Example](https://github.com/tatumio/tatum-js/tree/master/examples/browser)
- [Get Balance ETH Example](https://github.com/tatumio/tatum-js/tree/master/examples/docs/get-balance-eth)
- [NextJS Example](https://github.com/tatumio/tatum-js/tree/master/examples/nextjs)
- [TypeScript Example](https://github.com/tatumio/tatum-js/tree/master/examples/typescript)

## Legacy versions

Older versions of the Tatum SDK has been moved to long living branches [`Tatum SDK V1`](https://github.com/tatumio/tatum-js/tree/v1) and [`Tatum SDK V2`](https://github.com/tatumio/tatum-js/tree/v2).

## Contributing

Contributions to the Tatum SDK are welcome. Please ensure that you have tested your changes with a local client and have added unit test coverage for your code.

### Bugs and feature requests

Have a bug or a feature request? Please first read the issue guidelines and search for existing and closed issues. If your problem or idea is not addressed yet, please open a [new issue](https://github.com/tatumio/tatum-js/issues/new/choose).
