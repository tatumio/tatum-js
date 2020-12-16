# Integration Guide

This guide will explain how to integrate new blockchains or project into Tatum API. First thing to know is the technology stack. API are built using [NestJS framework](https://nestjs.com/) and [TatumJS](https://github.com/tatumio/tatum-js) is built with pure Typescript.

The integration is made of few steps:

1. Integrate your project into [TatumJS](https://github.com/tatumio/tatum-js)
2. Integrate your project into [TatumConnector](https://github.com/tatumio/tatum-blockchain-connector
3. Create an OpenAPI `yaml` file to help the team integrate your endpoints
4. Create / provide a Docker image with your blockchain node
4. Open 2 pull requests, one for each repository and wait for response

## Starting integration

To start the integration you've to [fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) [TatumJS](https://github.com/tatumio/tatum-js) and [TatumConnector](https://github.com/tatumio/tatum-blockchain-connector) projects to make changes and create pull requests.

Then clone it into your local computer to start the integration
```
git clone https://github.com/awesomeblockchaindev/tatum-blockchain-connector
git clone https://github.com/awesomeblockchaindev/tatum-js
```

You're ready to start!

## Integrate your project into TatumJS

To integrate your project into TatumJS you've to create your own folders and files and add all the linked dependencies. Then you've to create tests to test if everything is working properly.

Actual files and methods depends on what kind of blockchain you want to integrate. Assuming is a Bitcoin-based one you've to create or change following files:

- `blockchain/<your_blockchain>.ts`: add your blockchain file with the methods, you would like to integrate inside Tatum API. These methods will be implemented inside your own Tatum Blockchain Connector.
- `blockchain/index.ts`: add your import file `export * from './<your_blockchain>';`
- `constants.ts`: add here your contstants like `COIN_DERIVATION_PATH`, `COIN_NETWORK`, `COIN_TEST_NETWORK`
- `model/request/Currency.ts`: add here your `Currency` ticker.
- `model/response/<your_blockchain>/`: add a folder containing `CoinBlock`, `CoinInfo`, `CoinTx`, `CoinUTXO` or any other models applicable to your blockchain
- `model/response/index.ts`: add links to above models (like `export * from './<your_blockchain>/CoinBlock'`...)
- `transaction/<your_blockchain>.ts`: add all dependencies on the top and add transactions functions
- `transaction/<your_blockchain>.spec.ts`: add your tests
- `wallet/address.spec.ts`: add your tests
- `wallet/address/address.ts`:  in this file, you are implementing methods connected to creating addresses and private keys from the mnemonic or xpub, based on your blockchain. Add all dependencies on the top and add wallet functions (`generateAddress`, `generatePrivateKey`)
- `wallet/wallet.ts`: in this file, you are generating wallets. It can be either mnemonic based HD wallet, or simple account / private key based on the blockchain. Add all dependencies on the top and add wallet functions (`generateCoinWallet`)

That's it, by adding all those files you'll be able to open the PR and go ahead with the next section.

## Create a new connector module

As we said we need to create a new connector module, as for TatumJS it's better to copy/paste our boilerplate or build your own folder like `<your_blockchain>-connector`.

This folder must contain:

- `module`: This folder is the one that will be integrated inside Tatum API and it's a basic NodeJS module with two files. You need to create class for NestJS Controller and Service, which will handle the communication with your blockchain node. 
- `example`: Use this folder to create a NestJS project and test if all is working properly

### Module specifications

Module is a simple TypeScript module that will export a `Class` and will contain all defined methods. Let's see how the `src` is done:

- `constants.ts`: like TatumJS you've to export your constants used by the project to connect to your specific blockchain parameters.
- `index.ts`: this file will import the other.
- `<your_blockchain>Service.ts`: this file will contain the class and the methods, which are responsible for communication with the node itself.
- `<your_blockchain>Controller.ts`: this file will contain the class and the methods, which will be used as a NestJS Controller. These are all your GET/POST/PUT operations on the blockchain.

Insert all the required methods and test everything with `example` or `test` folder, if all is working properly go ahead and write your OpenAPI specifications.

## OpenAPI YAML file

This file describes your endpoints, parameters and request / response objects for youw connector. It will be automatically imported into [Tatum API OpenAPI](blob:https://tatum.io/bec661f6-69e1-426b-a70c-65ddf32f3b85).
Some of the Schemas do not have to be integrated, but might be reused from the parent Tatum API OpenAPI file.

## Open pull requests

If everything is done from your side please create your pull requests and send them. Add your coin and your ticker to both pull requests and join the conversation into GitHub for further requirements.

##
Publish your connector to NPM registry, so it's available for use. Tatum Integration team will then be able to use it.

## Support

If you need support please enter [Telegram group](https://t.me/tatumio) and ask for support to Tatum Integration Team.
