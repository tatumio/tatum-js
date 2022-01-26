# [Tatum API client v2](http://tatum.io/) &middot; [![GitHub license](https://img.shields.io/npm/dm/@tatumio/tatum)](https://img.shields.io/npm/dm/@tatumio/tatum) [![Build all packages](https://github.com/tatumio/tatum-js/actions/workflows/build.yaml/badge.svg?branch=master)](https://github.com/tatumio/tatum-js/actions/workflows/build.yaml)
Tatum API client allows browsers and Node.js clients to interact with Tatum API. You can find API documentation at [API doc](https://tatum.io/apidoc).

> **Are you looking for Tatum API client v1? It has been moved to long living branch [`/tatumio/tatum-js/tree/v1`](https://github.com/tatumio/tatum-js/tree/v1)**.
> 
## Status

V2 is currently under active development and considered alpha version. (you can still use LTS version [`v1`](https://github.com/tatumio/tatum-js/tree/v1))


## Installation

This repository is a monorepo with multiple packages for each blockchain.

### Separate package
You can select one or more blockchain packages that you want to use in your project and install them separately.

```console
$ npm install @tatumio/eth
```

### Full package
You can install full package with all dependencies. But this will work only in node environment.

```console
$ npm install @tatumio/sdk
```

### Node.JS & Browser support
Installing package you also need to check if selected package is supported in your environment. Not all packages are supported both in node and browser environments.

TODO: supported environments table

Library is written in TypeScript with ES2017 as the target JS version. Library should work in Node.JS current LTS.

## Configuration and setup

| Variable                  | Required                 | Default value            | Description                                                                                                                                                                                                                                   |
|---------------------------|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TATUM_API_KEY             | <ul><li>- [ ] </li></ul> |                          | Provide the Tatum API key. There are modules and functions, that do not have to communicate with Tatum API, like wallet generation or signing of transactions locally. In those cases, there is no need to provide parameter.                 |
| TATUM_API_URL             | <ul><li>- [ ] </li></ul> | https://api-eu1.tatum.io | Provide URL of the Tatum API. There are modules and functions, that do not have to communicate with Tatum API, like wallet generation or signing of transactions locally. In those cases, there is no need to provide variable.               |
| TESTNET_TYPE              | <ul><li>- [ ] </li></ul> | ethereum-ropsten         | For Ethereum, there are 2 testnet chains supported - Ropsten and Rinkeby. To enable Rinkeby, you need to use ethereum-rinkeby.                                                                                                                |
| TATUM_RETRY_DELAY         | <ul><li>- [ ] </li></ul> | 1000                     | Specifies the number in milliseconds how long wait before the failed request is resent again.                                                                                                                                                 |
| TATUM_RETRIES             | <ul><li>- [ ] </li></ul> | 5                        | Specifies the maximum number of how many times failed request is resent again.                                                                                                                                                                |
| TATUM_GAS_STATION_API_KEY | <ul><li>- [ ] </li></ul> |                          | In the library, there are functions for estimating the Ethereum transaction fee. For the estimation of the transaction fee, we are using https://ethgasstation.info. If you have your API key from https://ethgasstation.info you can use it. |
| YOUR_TRON_PRO_API_KEY     | <ul><li>- [ ] </li></ul> |                          | If you want to work with TRON locally, you need to enter API Key for  [Trongrid] (https://trongrid.io).                                                                                                                                       |

## Development - Add a new chain (EVM)

### 1. Pull repository

```console
$ git clone https://github.com/tatumio/tatum-js.git && cd tatum-js
```

### 2. Install root dependencies

```console
$ yarn
```

### 3. Install dependencies & build in subpackages

```console
$ yarn bootstrap
```

### 4. Add chain to the core package
Add chain constant to the ```packages/tatum-core/src/model/request/Currency.ts```.

### 5. Create a subpackage
Following command will generate whole structure (files and directories), download dependencies and build subpackage.
```console
$ yarn add:chain
```
As a template is used ```templates``` directory.

### 6. Update rest - TODO
- Estimate gas fee - ```packages/tatum-{{slug}}/src/transaction/super.ts```.
- Derivation path - ```packages/tatum-{{slug}}/src/constants.ts```.
- Update all in ```packages/tatum, packages/tatum-defi, packages/tatum-ledger```.

### Clean all node_modules in subpackages - in case of problems with dependency

```console
$ yarn clean:all
```
### Publish alpha version

We are using Github actions for publishing to NPM registry. Github action is defined in .github/workflows. Use this command only if Github action dont work!

```console
$ yarn lerna publish prerelease --yes --no-verify-access
```

## Usage

```js
// In Node.js
const Tatum = require('@tatumio/tatum');
const btcWallet = await Tatum.generateWallet(Tatum.Currency.BTC, true);

console.log(btcWallet);
>
{
    mnemonic: ... ,
    xpub: ... 
}
```

### Usage with TypeScript

We support types within the repo itself. Please open an issue here if you find any wrong types.

You can use `@tatumio/tatum` as follows:

```typescript
import { generateWallet, Currency } from '@tatumio/tatum';
const btcWallet = await generateWallet(Currency.BTC, true);
```

If you are using the types in a `commonjs` module, like in a Node app, you just have to enable `esModuleInterop` and `allowSyntheticDefaultImports` in your `tsconfig` for typesystem compatibility:

```json
"compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    ....
```

### Usage with React Native
Tatum js use core node js modules or browser APIs that are not available in React Native, so in order to be able to run Tatum js in React Native we need to install and use some additional dependencies.

```
npm i rn-nodeify -g
npm i react-native-randombytes --save
npm i @tatumio/tatum --save
rn-nodeify --install http,https,path,crypto,fs,stream,os --hack
cd ios && pod install
```
rn-nodeify will create a `shim.js` file in your project root directory. The first line in `index.js` should be to import it (NOT require it!)

`import "./shim";`

Uncomment the last line from the shim.js file:
`require('crypto')`

`shim.js` file example:
```
if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
}

process.browser = false
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env['NODE_ENV'] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require('crypto')
```

Tatum js will look for the API_KEY using .env variables, for this you can simply write `process.env.TATUM_API_KEY = "YOUR_API_KEY_HERE";` before importing Tatum in you project.

Run your app:
```
npx react-native run-ios
npx react-native run-android
```

## Contributing

Contributions to the Tatum API client are welcome. Please ensure
that you have tested your changes with a local client and have added unit test
coverage for your code.
