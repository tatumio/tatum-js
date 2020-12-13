# Integration Guide

This guide will explain how to integrate new coins or project into Tatum API. First thing to know is the technology stack. API are built using [NestJS framework](https://nestjs.com/) and [TatumJS](https://github.com/tatumio/tatum-js) is built with pure Typescript.

The integration is made of few steps:

1. Integrate your project into [TatumJS](https://github.com/tatumio/tatum-js)
2. Integrate your project into [TatumConnector](https://github.com/tatumio/tatum-blockchain-connector
3. Create an OpenAPI `json` file to help the team integrate your endpoints
4. Create a Docker image with all wallet depedencies inside
4. Open 2 pull requests, one for each repository and wait for response

## Starting integration

To start the integration you've to [fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) [TatumJS](https://github.com/tatumio/tatum-js) and [TatumConnector](https://github.com/tatumio/tatum-blockchain-connector) prokects to make changes and create pull requests.

Then clone it into your local computer to start the integration
```
git clone https://github.com/awesomeblockchaindev/tatum-blockchain-connector
git clone https://github.com/awesomeblockchaindev/tatum-js
```

You're ready to start!

## Integrate your project into TatumJS

To integrate your project into TatumJS you've to create your own folders and files and add all the linked dependencies. Then you've to create tests to test if everything is working properly.

Actual files and methods depends on what kind of blockchain you want to integrate. Assuming is a Bitcoin-based one you've to create or change following files:

- `blockchain/coin.ts`: add your coin file, this will be used to interface TatumJS with your connector
- `blockchain/index.ts`: add your import file `export * from './coin';`
- `constants.ts`: add here your contstants like `COIN_DERIVATION_PATH`, `COIN_NETWORK`, `COIN_TEST_NETWORK`
- `model/request/Currency.ts`: add here your `Currency` ticker.
- `model/response/coin/`: add a folder containing `CoinBlock`, `CoinInfo`, `CoinTx` and `CoinUTXO` models
- `model/response/index.ts`: add links to above models (like `export * from './coin/CoinBlock'`...)
- `transaction/coin.ts`: add all dependencies on the top and add transactions functions
- `transaction/coin.spec.ts`: add your tests
- `wallet/address.spec.ts`: add your tests
- `wallet/address/address.ts`: add all dependencies on the top and add wallet functions (`generateCoinAddress`, `generateCoinPrivateKey`)
- `wallet/wallet.ts`: add all dependencies on the top and add wallet functions (`generateCoinWallet`)

That's it, by adding all those files you'll be able to open the PR and go ahead with the next section.

## Create a new connector module

As we said we need to create a new connector module, as for TatumJS it's better to copy/paste our boilerplate (still WIP) or build your own folder like `coin-connector`.

This folder must contain:

- `docker`: Folder to build the docker container with your node.
- `module`: This folder is the one that will be integrated inside TatumAPI and it's a basic NodeJS module
- `test`: Use this folder to create a NestJS project and test if all is working properly

### Module specifications

Module is a simple TypeScript module that will expor a `Class` and will contain all defined methods. Let's see how the `src` is done:

- `constants.ts`: like TatumJS you've to export your constants used by the project to connect to your specific blockchain parameters.
- `index.ts`: this file will import the other.
- `coin.ts`: this file will contain the class and the methods.

Insert all the required methods and test everything with `test` folder, if all is working properly go ahead and write your OpenAPI specifications.

## OpenAPI JSON file

WIP

## Open pull requests

If everything is done from your side please create your pull requests and send them. Add your coin and your ticker to both pull requests and join the conversation into GitHub for further requirements.

## Support

If you need support please enter [Telegram group](https://t.me/tatumio) and ask for support to Tatum Integration Team.