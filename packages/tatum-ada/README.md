# Tatum ADA API client
Tatum ADA API client allows browsers and Node.js clients to interact with Tatum API. It includes the following core components.

- **wallet** - cryptographic functions like generation of wallets, private keys or addresses.
- **kms** - set of API calls to communicate with <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a>.
- **blockchain** - set of API calls to communicate with different blockchains via <a href="https://tatum.io" target="_blank">Tatum API</a>.
- **ledger** - set of API calls to communicate with Tatum Private Ledger via <a href="https://tatum.io" target="_blank">Tatum API</a>.
- **transaction** - set of functions to generate and sign blockchain transactions locally.
- **offchain** - set of functions to generate and sign Tatum off-chain transactions locally.

You can find API documentation at [Github Pages](https://tatumio.github.io/tatum-ada/) or at [API doc](https://tatum.io/apidoc).

## Installation

### Node.js
1. Install module:

   `npm install @tatumio/tatum-ada`

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
