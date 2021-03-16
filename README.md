# Tatum Blockchain Connector
This repository is used as a place to find all connectors to the blockchains, which are integrated inside Tatum API.

## Structure
There is a `blueprint` folder, where there is an example connector prepared for you. You should extend `*Controller.ts` and `*Service.ts` files and implement the required methods, you would like to expose via Tatum API to the developers.
On top of that, there are `<blockchain>-connector` directories, where custom integrations are being created. Feel free to fork the repo, create your connector and open a PR.

## Integration to Tatum API
Before the integration itself, please read [Integration guide](./INTEGRATION_GUIDE.md).
As soon as you finish and test your connector, please reach out to the Tatum team on [Telegram](https://t.me/tatumio). They will then integrate your blockchain inside the Tatum API.

## Support
If you need support please enter [Telegram group](https://t.me/tatumio) and ask for support to Tatum Integration Team.

## Existing connectors
* Scrypta connector - connector to the [Scrypta Blockchain](https://scrypta.foundation/) maintained by [turinglabs](https://github.com/turinglabsorg)
* NFT connector - abstraction for working with NFTs on different blockchains maintained by [Tatum Team](https://github.com/tatumio)
* Tron connector - connector to the [TRON Network](https://tron.network/) maintained by [Tatum Team](https://github.com/tatumio)
* Quorum connector - connector to the [Quorum](https://consensys.net/quorum/) maintained by [Tatum Team](https://github.com/tatumio)
* Hyperledger Fabric connector - connector to the [Hyperledger Fabric v2](https://www.hyperledger.org/use/fabric) maintained by [Tatum Team](https://github.com/tatumio)
* Celo connector - connector to the [Celo](https://celo.org/) maintained by [Tatum Team](https://github.com/tatumio)
