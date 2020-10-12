# Tatum API client
Tatum API client allows browsers and Node.js clients to interact with Tatum API. It includes the following core components.

- **wallet** - cryptographic functions like generation of wallets, private keys or addresses.
- **kms** - set of API calls to communicate with <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a>.
- **blockchain** - set of API calls to communicate with different blockchains via <a href="https://tatum.io" target="_blank">Tatum API</a>.
- **ledger** - set of API calls to communicate with Tatum Private Ledger via <a href="https://tatum.io" target="_blank">Tatum API</a>.
- **transaction** - set of functions to generate and sign blockchain transactions locally.
- **offchain** - set of functions to generate and sign Tatum off-chain transactions locally.

You can find more detailed documentation and examples in Tatum API documentation
[Documentation](https://tatum.io) pages or read the documentation for the [client](./docs/globals.md).

## Installation

### Node.js
1. Install module:

   `npm install @tatumio/tatum`

### Browser

1. Install module:

   `npm install @tatumio/tatum`

### Node.JS & Browser support
Library is written in TypeScript with ES2017 as the target JS version. Library should work in all modern browsers with ES2017 support and Node.JS current LTS. 

## Testing

All new code changes should be covered with unit tests. You can run the tests
with the following command:

```bash
$ npm run test
```

## Configuration and setup
Provide Tatum API key to process.env.TATUM_API_KEY variable. You can use dotenv or any other way.
There are modules and functions, that do not have to comunicate with Tatum API, like wallet generation or signing of transactions locally.
In those cases, there is no need to provide TATUM_API_KEY parameter.

```process.env.TATUM_API_KEY=${YOUR_API_KEY}```

## Usage

```js
// In Node.js
const Tatum = require('@tatumio/tatum');
const btcWallet = Tatum.generateWallet(Tatum.Currency.BTC, true);

console.log(btcWallet);
> {
    mnemonic: ... ,
    xpub: ... 
}
```

### Usage with TypeScript

We support types within the repo itself. Please open an issue here if you find any wrong types.

You can use `@tatumio/tatum` as follows:

```typescript
import {generateWallet, Currency} from '@tatumio/tatum';
const btcWallet = generateWallet(Currency.BTC, true);
```

If you are using the types in a `commonjs` module, like in a Node app, you just have to enable `esModuleInterop` and `allowSyntheticDefaultImports` in your `tsconfig` for typesystem compatibility:

```json
"compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    ....
```

## Contributing

Contributions to the Tatum API client are welcome. Please ensure
that you have tested the changes with a local client and have added unit test
coverage for your code.
