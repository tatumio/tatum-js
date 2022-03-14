# TBD

# Create library for new blockchain integration

## EVM Based

nx g @nrwl/node:library sdk-{BLOCKCHAIN_NAME} --directory=blockchain --simpleModuleName=true --buildable --publishable --importPath=@tatumio/{BLOCKCHAIN_NAME} --testEnvironment=node --tags=type:sdk,scope:evm-based

## Btc Based

nx g @nrwl/node:library sdk-{BLOCKCHAIN_NAME} --directory=blockchain --simpleModuleName=true --buildable --publishable --importPath=@tatumio/{BLOCKCHAIN_NAME} --testEnvironment=node --tags=type:sdk,scope:btc-based

## Other (not evm and not btc)

nx g @nrwl/node:library sdk-{BLOCKCHAIN_NAME} --directory=blockchain --simpleModuleName=true --buildable --publishable --importPath=@tatumio/{BLOCKCHAIN_NAME} --testEnvironment=node --tags=type:sdk

# Check workspace.json file to make sure module has correct name

# Remove compilerOptions from packages/{BLOCKCHAIN_NAME}/tsconfig.json

### Utils

Create library

nx g @nrwl/node:library xrp-based --directory=shared/testing --buildable --publishable --importPath=@tatumio/shared-testing-xrp-based --testEnvironment=node --tags=scope:xrp-based

# Development - Add a new chain (EVM)

## 1. Pull repository

```console
$ git clone https://github.com/tatumio/tatum-js.git && cd tatum-js
```

## 2. Install root dependencies

```console
$ yarn
```

## 3. Install dependencies & build in subpackages

```console
$ yarn bootstrap
```

## 4. Add chain to the core package

Add chain constant to the `packages/tatum-core/src/model/request/Currency.ts`.

## 5. Create a subpackage

Following command will generate whole structure (files and directories), download dependencies and build subpackage.

```console
$ yarn add:chain
```

As a template is used `templates` directory.

## 6. Update rest - TODO

- Estimate gas fee - `packages/tatum-{{slug}}/src/transaction/super.ts`.
- Derivation path - `packages/tatum-{{slug}}/src/constants.ts`.
- Update all in `packages/tatum, packages/tatum-defi, packages/tatum-ledger`.

## Clean all node_modules in subpackages - in case of problems with dependency

```console
$ yarn clean:all
```
