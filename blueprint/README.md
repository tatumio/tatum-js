## Blueprint Connector to Tatum API

This is an example connector, which can be used as a blueprint for your own integrations.

### Methods to implement

Every connector should have following methods implemented:

* **generate wallet** - mnemonic or private key based
* **generate address from wallet or private key**
* **get block**
* **get transaction**
* **sign transaction** - this method is present on the API only for easiness of use for devs to play around. Transactions should be signed locally using client libraries like [Tatum JS](https://github.com/tatumio/tatum-js) or [Tatum Java](https://github.com/tatumio/tatum-java), in [Tatum Middleware](https://github.com/tatumio/tatum-middleware) or using [Tatum KMS](https://github.com/tatumio/tatum-kms)
* **broadcast signed transaction** - this method is used for broadcasting singed transactions from the local libraries to the blockchain

Other methods are optional and it's up to every integrator to choose the correct methods from the blockchain, which are most likely to be demanded by the devs.
