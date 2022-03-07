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
