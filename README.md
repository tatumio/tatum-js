

# Create app (for examples)

nx g @nrwl/js:app sdk-example
nx g @nrwl/node:app ltc-example

---------

# Create library
nx g @nrwl/node:lib shared/abstract-sdk --publishable=true --buildable=true --importPath=@tatumio/abstract-sdk
nx g @nrwl/js:lib sdk --publishable=true --buildable=true --importPath=@tatumio/sdk

# Move library
nx g move --project shared-sdk-evm-based shared/blockchain/evm-based

# Remove library
nx g remove booking-some-library
