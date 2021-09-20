# [Tatum API client](http://tatum.io/) &middot; [![GitHub license](https://img.shields.io/npm/dm/@tatumio/tatum)](https://img.shields.io/npm/dm/@tatumio/tatum) [![GitHub license](https://img.shields.io/npm/v/@tatumio/tatum)](https://img.shields.io/npm/v/@tatumio/tatum) [![CI](https://github.com/tatumio/tatum-js/actions/workflows/main.yml/badge.svg)](https://github.com/tatumio/tatum-js/actions/workflows/main.yml)
Tatum API client allows browsers and Node.js clients to interact with Tatum API. It includes the following core components.

- **wallet** - cryptographic functions like generation of wallets, private keys or addresses.
- **kms** - set of API calls to communicate with <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a>.
- **blockchain** - set of API calls to communicate with different blockchains via <a href="https://tatum.io" target="_blank">Tatum API</a>.
- **ledger** - set of API calls to communicate with Tatum Private Ledger via <a href="https://tatum.io" target="_blank">Tatum API</a>.
- **transaction** - set of functions to generate and sign blockchain transactions locally.
- **offchain** - set of functions to generate and sign Tatum off-chain transactions locally.

You can find API documentation at [Github Pages](https://tatumio.github.io/tatum-js/) or at [API doc](https://tatum.io/apidoc).

## Installation

### Node.js
1. Install module:

   `npm install @tatumio/tatum`

### Node.JS & Browser support
Library is written in TypeScript with ES2017 as the target JS version. Library should work in Node.JS current LTS. 

## Testing

All new code changes should be covered with unit tests. You can run the tests
with the following command:

```bash
$ npm run test
```

## Configuration and setup

### Tatum API URL

Provide URL to the Tatum API to process.env.TATUM_API_URL variable. Default URL is *https://api-eu1.tatum.io* You can
use dotenv or any other way. There are modules and functions, that do not have to communicate with Tatum API, like
wallet generation or signing of transactions locally. In those cases, there is no need to provide TATUM_API_URL
parameter.

```process.env.TATUM_API_URL=${YOUR_API_URL}```

### Tatum API KEY

Provide Tatum API key to process.env.TATUM_API_KEY variable. You can use dotenv or any other way. There are modules and
functions, that do not have to communicate with Tatum API, like wallet generation or signing of transactions locally. In
those cases, there is no need to provide TATUM_API_KEY parameter.

```process.env.TATUM_API_KEY=${YOUR_API_KEY}```

### Testnet type

For Ethereum, there are 2 testnet chains supported - Ropsten (default one) and Rinkeby. To enable Rinkeby, you need to
set up TESTNET_TYPE parameter to rinkeby.

```process.env.TESTNET_TYPE=ethereum-rinkeby```

### Retry Delay

There are some cases when requests fail to complete successfully. For instance, when you exceed request rate
limitations. To configure behavior when requests fails we provide env variables process.env.TATUM_RETRY_DELAY and
process.env.TATUM_RETRIES.

Variable process.env.TATUM_RETRY_DELAY specifies the number in milliseconds how long wait before the failed request is
resent again. Default value is 1000 milliseconds.

```process.env.TATUM_RETRY_DELAY=1000```

Variable process.env.TATUM_RETRIES specifies the maximum number of how many times failed request is resent again.
Default value is 5.

```process.env.TATUM_RETRIES=5```

In the library, there are functions for estimating the Ethereum transaction fee. For the estimation of the transaction
fee, we are using https://ethgasstation.info. If you have your API key from https://ethgasstation.info you can use it
via env variable process.env.TATUM_GAS_STATION_API_KEY.

```process.env.TATUM_GAS_STATION_API_KEY=${YOUR_GAS_STATION_API_KEY}```

If you want to work with TRON locally, you need to enter API Key for [Trongrid](https://trongrid.io).
```process.env.TRON_PRO_API_KEY=${YOUR_TRON_PRO_API_KEY}```

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

More examples are available here:
- [blockchain](https://github.com/tatumio/tatum-js/tree/master/src/blockchain)
- [ledger](https://github.com/tatumio/tatum-js/tree/master/src/ledger)
- [nft](https://github.com/tatumio/tatum-js/tree/master/src/nft)
- [offchain](https://github.com/tatumio/tatum-js/tree/master/src/offchain)
- [security](https://github.com/tatumio/tatum-js/tree/master/src/security)
- [transaction](https://github.com/tatumio/tatum-js/tree/master/src/transaction)
- [wallet](https://github.com/tatumio/tatum-js/tree/master/src/wallet)

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

## Directory structure
```bash
└── src
│   ├── blockchain          // Blockchain API methods without private key
│   ├── connector           // Wrapper around all HTTP methods
│   ├── contracts           // Abi and byte code smart contracts
│   │   ├── custodial
│   │   ├── erc20
│   │   ├── erc721
│   │   ├── erc1155
│   │   ├── marketplace
│   │   ├── trc20
│   │   ├── trc721
│   ├── ledger              // Ledger API methods
│   ├── model               // Validation, interfaces and DTO classes
│   │   ├── request
│   │   ├── response
│   │   ├── validation
│   ├── multiToken          // Multi Token API methods
│   ├── nft                 // NFT API methods
│   │   ├── marketplace     // Marketplace API methods
│   ├── offchain            // Offchain API methods
│   ├── record              // Logging API methods
│   ├── security            // Security and KMS methods
│   ├── tatum               // Service API methods
│   ├── transaction         // Transaction API methods
│   ├── wallet              // Wallet, private key and address API methods
│   └── constants.ts        // Constants
├── README.md
├── package.json
├── tslint.js
├── tsconfig.json
└── .gitignore
```

## Contributing

Contributions to the Tatum API client are welcome. Please ensure
that you have tested the changes with a local client and have added unit test
coverage for your code.
