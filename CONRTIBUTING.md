# TBD

# Create library for new blockchain integration

## EVM Based

nx g @nrwl/js:library sdk-{BLOCKCHAIN_NAME} --directory=blockchain --simpleModuleName=true --buildable --publishable --importPath=@tatumio/{BLOCKCHAIN_NAME} --testEnvironment=node --tags=scope:sdk,scope:evm-based

## Btc Based

nx g @nrwl/js:library sdk-{BLOCKCHAIN_NAME} --directory=blockchain --simpleModuleName=true --buildable --publishable --importPath=@tatumio/{BLOCKCHAIN_NAME} --testEnvironment=node --tags=scope:sdk,scope:btc-based

## Other (not evm and not btc)

nx g @nrwl/js:library sdk-{BLOCKCHAIN_NAME} --directory=blockchain --simpleModuleName=true --buildable --publishable --importPath=@tatumio/{BLOCKCHAIN_NAME} --testEnvironment=node --tags=scope:sdk

# Check workspace.json file to make sure module has correct name

# Remove compilerOptions from packages/{BLOCKCHAIN_NAME}/tsconfig.json
