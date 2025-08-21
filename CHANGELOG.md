## [4.2.57] - 2025.8.25

### Removed

- Removed support for cronos testnet subscriptions

## [4.2.56] - 2025.8.14

### Added

- Added support for monad testnet and unichain mainnet subscriptions

## [4.2.55] - 2025.8.1

### Added

- Added monad

## [4.2.54] - 2025.7.30

### Added

- Added unichain

## [4.2.53] - 2025.6.27

### Updated

- Updated SDK to call new version of data-api endpoints

## [4.2.52] - 2025.5.20

### Added

- Added support for Ethereum Hoodi

## [4.2.51] - 2025.3.17

### Added

- Added support for berachain mainnet subscriptions

## [4.2.50] - 2025.2.27

### Added

- Added berachain

## [4.2.49] - 2025.2.20

### Fix

- Update version to release

## [4.2.48] - 2025.2.20

### Fix

- Fixed tests failing

## [4.2.47] - 2025.2.19

### Added

- Added sonic & kaia

## [4.2.46] - 2025.2.5

### Removed

- Removed BNB support

## [4.2.45] - 2024.12.20

### Fixed

- Fixed Tatum Connector retry logic causing generic error

## [4.2.44] - 2024.12.5

### Added

- Support for Bitcoin Testnet 4

## [4.2.43] - 2024.10.11

### Fixed

- Fixed Tatum Connector issue with process is undefined on the pure browser
- Fixed and refactored some tests

## [4.2.42] - 2024.9.4

### Fixed

- Replaced Ton method `getTokenMetadata` with working `getTokenData`

## [4.2.41] - 2024.8.30

### Fixed

- EOS prefix slash missing

## [4.2.40] - 2024.8.25

### Fixed

- Relax SSRF checks and allow tatum gateway nodes

## [4.2.39] - 2024.8.14

### Updated

- Rename delegation methods

## [4.2.38] - 2024.7.23

### Added

- Support for Ton basic api

## [4.2.37] - 2024.7.23

### Added

- Support for zkSync mainnet & testnet

## [4.2.36] - 2024.7.18

### Added

- Support for Ton mainnet & testnet

## [4.2.35] - 2024.6.18

### Updated

- Disable auto-discovery of RPC nodes when there is only one node.
- Disable Cardano Rosetta testnet tests

## [4.2.34] - 2024.6.18

### Added

- Support for Casper mainnet

## [4.2.33] - 2024.6.17

### Added

- Support for Electrs & Rostrum testnet

## [4.2.32] - 2024.6.5

### Added

- Support for cosmos additional api

## [4.2.31] - 2024.6.3

### Fixed

- Fix Kadena rpc double slash

## [4.2.30] - 2024.5.31

### Added

- Support for Electrs calls and Iota testnet, renamed bch rostrum

## [4.2.29] - 2024.5.27

### Added

- Support for Data API on Polygon Amoy

## [4.2.28] - 2024.5.20

### Added

- Support for Avalanche Notifications

## [4.2.27] - 2024.5.6

### Added

- Support for Polygon Amoy

### Removed

- Polygon Mumbai

## [4.2.26] - 2024.5.6

### Added

- Rostrum server.banner method

## [4.2.24] - 2024.4.11

### Added

- Added support for Iota API calls

## [4.2.23] - 2024.4.10

### Updated

- Improved `getBalance` method in `address` module by introducing `tokenTypes` filter along with `native` option.

## [4.2.22] - 2024.4.10

### Fixed

- Fixed types for `getTransactions` method in `address` module.
- Updated undici dependency.

## [4.2.21] - 2024.4.4

### Added

- Added support for Cosmos API calls

## [4.2.20] - 2024.2.4

### Added

- Added support for Rostrum RPC calls

## [4.2.19] - 2024.3.27

### Added

- Added support for Kadena RPC calls

## [4.2.18] - 2024.3.22

### Added

- Added support for Base and Base Sepolia testnet subscriptions.

## [4.2.17] - 2024.3.19

### Fixed

- Fixed Solana RPC call for `getFeeForMessage` method. The result is now properly parsed and returns context information with value.

## [4.2.16] - 2024.2.15

### Added

- Added support for Cronos and Cronos testnet subscriptions.

## [4.2.15] - 2024.3.11

### Added

- Added RPC support for the BASE network. Users can now make Base RPC calls using the `Network.BASE` network.

## [4.2.14] - 2024.3.11

### Changed

- Added support for simplified way of configuring api key without specifying version.
- Marked old way of configuring api key through object specifying version as `deprecated`.
- Fixed some tests, namely those related to `arb-testnet` `eth_chainId` RPC EVM method.

## [4.2.13] - 2024.2.29

### Removed

- Removed support for the Goerli network.

## [4.2.12] - 2024.2.28

### Added

- Added support for Cronos and Fantom rpc loadbalancer.

## [4.2.11] - 2024.2.22

### Fixed

- Fixed the `getBlock` method for Doge, addressing an issue with the second boolean parameter.

## [4.2.10] - 2024.2.22

### Fixed

- Fixed tests. Temporarily disabled `data-api` related tests and `eos` tests.

## [4.2.9] - 2024.2.15

### Added

- Added support for Flare, Flare Coston, Flare Coston 2 and Flare Songbird subscriptions.

## [4.2.8] - 2024.2.15

### Updated

- Updated `address` module for EVM chains. Users can add parameter `tokenAddress` to `getTransactions` method to filter transactions by token address.

## [4.2.7] - 2024.2.12

### Updated

- Updated archive condition for evm rpc calls

## [4.2.6] - 2024.2.12

### Added

- Added support for Solana load balancer based on the method name.

## [4.2.5] - 2024.1.31

### Added

- Added support for Holesky Ethereum testnet for subscriptions.

## [4.2.4] - 2024.1.25

### Fixed

- Fix import of LoadBalancer to keep it working in browser

## [4.2.3] - 2024.1.23

### Updated

- Drop support for faucet claims via SDK

## [4.2.2] - 2024.1.12

### Added

- Added RPC support for the STELLAR_TESTNET network. Users can now make Stellar RPC calls using the `Network.STELLAR_TESTNET` network.

## [4.2.1] - 2024.1.9

### Updated

- Assert development environment if `NODE_ENV` is not set

### Fixed

- Use globalThis instead of `process.env` for setting `TatumDevelopmentLogger`'s `isWelcomeDisabled` flag

## [4.2.0] - 2024.1.8

### Added

- Added logging support

### Updated

- Updated dependencies

## [4.1.37] - 2024.1.5

### Fixed

- Fix get strict methods params for STELLAR network.

## [4.1.36] - 2024.1.3

### Fixed

- Fix optional params for STELLAR network.

## [4.1.35] - 2024.1.3

### Added

- Added RPC support for the STELLAR network. Users can now make Stellar RPC calls using the `Network.STELLAR` network.

## [4.1.34] - 2023.12.14

### Fixed

- Fix potential memory issues with `LoadBalancer`.

## [4.1.33] - 2023.12.1

### Added

- Added RPC support for the XINFIN network. Users can now make RPC calls to these network using the `Network.XINFIN` network.

## [4.1.32] - 2023.11.29

### Fixed

- Fixed logic of IPFS upload, now upload passes request using client's version

## [4.1.31] - 2023.11.22

### Changed

- Adjust logic redirecting for getBlockByNumber to call normal nodes for latest block

## [4.1.30] - 2023.11.17

### Changed

- Improved `LoadBalancer` stability

## [4.1.29] - 2023.11.15

### Added

- Added RPC support for the CARDANO_ROSETTA network. Users can now make RPC calls to these network using the `Network.CARDANO_ROSETTA` network.

## [4.1.28] - 2023.11.13

### Fixed

- Fixed lb archive fallback

## [4.1.27] - 2023.11.13

### Fixed

- Fixed Algorand `ApplicationSearchParams` to camelCase.

## [4.1.26] - 2023.11.12

### Fixed

- Fixed `LoadBalancer` throwing from setTimeout, it should now throw from actual method calls.

## [4.1.25] - 2023.11.10

### Added

- Added RPC support for the ALGORAND network. Users can now make RPC calls to these network using the `Network.ALGORAND_ALGOD`, `Network.ALGORAND_ALGOD_TESTNET`, `Network.ALGORAND_INDEXER`, `Network.ALGORAND_INDEXER_TESTNET` network.

## [4.1.24] - 2023.11.9

### Added

- Tezos methods to support local signing and injection of operations.

## [4.1.23] - 2023.11.6

### Changed

- Tezos address balances fixes. Call to `address.getBalance` returns balances of all tokens for a given address. This call accepts only one `address` as a parameter, not an array of addresses.

## [4.1.22] - 2023.11.2

### Updated

- Naming of the Tezos RPC methods

## [4.1.21] - 2023.11.2

### Added

- Added RPC support for the TEZOS network. Users can now make RPC calls to these network using the `Network.TEZOS` network.

## [4.1.20] - 2023.10.31

### Fixed

- Fixed usage of `fromBlock` and `toBlock` params for UTXO-based blockchains in `Address.getTransactions`

## [4.1.19] - 2023.10.31

### Fixed

- Configurable extension usage typing

## [4.1.18] - 2023.10.30

### Fixed

- Fixed LoadBalancer class import which cause to fail import in the browser/codepen

## [4.1.17] - 2023.10.26

### Added

- Added RPC support for the BNB network. Users can now make RPC calls to these network using the `Network.BNB` network.

## [4.1.16] - 2023.10.24

### Added

- Added Beacon chain v1 support for the Ethereum

## [4.1.15] - 2023.10.24

### Added

- Added estimatefee rpc method to the Bitcoin Cash network

## [4.1.14] - 2023.10.23

### Added

- Added IPFS get file data method

## [4.1.13] - 2023.10.20

### Changed

- Fixed CONTRACT_ADDRESS_LOG_EVENT data in getAll() Notification method

## [4.1.12] - 2023.10.19

### Added

- Fixed response parsing for calls where the body is not defined e.g. DELETE endpoints

## [4.1.11] - 2023.10.19

### Added

- Added RPC support for the CELO network. Users can now make RPC calls to these network using the `Network.CELO` network.

## [4.1.10] - 2023.10.18

### Changed

- Chiliz notification access

## [4.1.9] - 2023.10.18

### Added

- Chiliz notification support

## [4.1.8] - 2023.10.18

### Changed

- Make Blockchain Classes type safe

## [4.1.7] - 2023.10.15

### Changed

- `TatumUtils` chainId <-> `Network` mappings always return usable value or throw error for ease of use.

## [4.1.6] - 2023.10.15

### Added

- `TatumUtils` added with access to chainId <-> `Network` mapping

## [4.1.5] - 2023.10.13

### Changed

- Loosen types for extension usage to better support optional configs.

## [4.1.4] - 2023.10.13

### Added

- Addition of `getRpc<T>(): T` to `ITatumSdkContainer` for best RPC support in extensions.

## [4.1.3] - 2023.10.12

### Added

- Added IPFS upload and NFT mint in one action. Metadata will be prepared and uploaded automatically

## [4.1.2] - 2023.10.12

### Added

- Added `walletProvider` to TatumSdkChain class so any chain can support wallet extensions.

## [4.1.1] - 2023.10.11

### Added

- Added RPC support for the SOLANA network. Users can now make RPC calls to these network using the `Network.SOLANA` network.

## [4.1.0] - 2023.10.11

### Added

- Added `faucet` submodule with `fund` method for requesting testnet native tokens from available `Tatum` faucets.

## [4.0.19] - 2023.10.11

### Added

- Updated loadbalancer logging with detailed logs

## [4.0.18] - 2023.10.11

### Fixed

- Update debug storage range parameters. The `debugStorageRangeAt` function in the EvmRpc now takes a number instead of a string for the `maxResults` parameter.

## [4.0.17] - 2023.10.11

### Added

- Added RPC support for the AVALANCHE_C network. Users can now make RPC calls to these network using the `Network.AVALANCHE_C` network.

## [4.0.16] - 2023.10.10

### Changed

- Fixed `tatumSdk.walletProvider.use()` method to return properly typed extension instance is case of custom typed configurations.

## [4.0.15] - 2023.10.10

### Changed

- Loosen types for extension registration purposes to better support optional config.

## [4.0.14] - 2023.10.10

### Added

- Nft express minting over created collection for EVM chains.

## [4.0.13] - 2023.10.09

### Added

- Added RPC support for the BITCOIN_CASH network. Users can now make RPC calls to these network using the `Network.BITCOIN_CASH` network.

## [4.0.12] - 2023.10.09

### Added

- Added RPC support for the KLAYTN network. Users can now make RPC calls to these network using the `Network.KLAYTN` network.

## [4.0.11] - 2023.10.07

### Added

- Added RPC support for the Holesky network. Users can now make RPC calls to these network using the `Network.ETHEREUM_HOLESKY` network.

## [4.0.10] - 2023.10.06

### Added

- Added RPC support for the XRP network. Users can now make RPC calls to these network using the `Network.XRP` network.

## [4.0.9] - 2023.10.05

### Added

- Added RPC support for the ZCash network. Users can now make RPC calls to these network using the `Network.ZCASH` network.

## [4.0.8] - 2023.10.05

### Added

- Added RPC support for the Ethereum Classic network. Users can now make RPC calls to these network using the `Network.ETHEREUM_CLASSIC` network.

## [4.0.7] - 2023.10.04

### Changed

- Fixed signed raw transaction body conversion for Tron.

## [4.0.6] - 2023.10.04

### Changed

- Exposed tatum connector types from the root of the package.

## [4.0.5] - 2023.10.04

### Changed

- Wallet provider `use()` method now returns properly typed extension instance.
- Exposed wallet provider types from the root of the package.

## [4.0.4] - 2023.09.28

### Added

- Extension now has to implement list of supported `Network`.

### Changed

- **[BREAKING CHANGE]** `TatumSdkExtension` now contains `abstract supportedNetworks: Network[]`.

## [4.0.3] - 2023.09.27

### Added

- Added RPC support for the Eos network. Users can now make RPC calls to these network using the `Network.EOS` network.

## [4.0.2] - 2023.09.26

### Added

- Added RPC support for the Horizen Eon Gobi and Chiliz networks. Users can now make RPC calls to these networks using the `Network.HORIZEN_EON_GOBI` and `Network.CHILIZ` network.

## [4.0.1] - 2023.09.27

### Added

- Extension lifetime management methods made optional to implement.
- Extension lifetime management method destroy() made async and awaited.

### Changed

- **[BREAKING CHANGE]** `tatumSdk.destroy(): void` was replaced with `tatumSdk.destroy(): Promise<void>`.

## [4.0.0] - 2023.09.25

### Added

- Leveraging Extension Ecosystem a specialised Wallet Provider type of extensions was added.
- `tatumSdk.walletProvider.use(type: TatumSdkWalletProvider)` method was added.

### Changed

- **[BREAKING CHANGE]** `tatumSdk.walletProvider.metaMask` was replaced with `tatumSdk.walletProvider.use(MetaMask)`.
- **[BREAKING CHANGE]** `tatumSdk.walletProvider.metaMask.connect()` was replaced with `tatumSdk.walletProvider.use(MetaMask).getWallet()`.
- **[BREAKING CHANGE]** `tatumSdk.walletProvider.metaMask.customPayload()` was replaced with `tatumSdk.walletProvider.use(MetaMask).signAndBroadcast()`.

## [3.1.8] - 2023.09.22

### Added

- Capability to initialize `TatumSDK` with various extensions from Extension Ecosystem using the init() method and `TatumConfig.configureExtensions`.
- Encapsulation of `typedi` functionalities within `TatumSdkContainer`, ensuring that there are no enforced dependencies on the extensions.
- `TatumSdkExtension` abstract class that allows extension creators to utilize services or other extensions from withing the `TatumSdkContainer`.
- `async init()` method call for each registered extension
- `destroy()` method call for each registered extension

## [3.1.7] - 2023.09.22

### Fixed

- Fixed 'tokenType' field to 'type' in Non-Fungible Token (NFT) Data Transfer Object (DTO) to match the API response.

## [3.1.6] - 2023.09.22

### Fixed

- Fix eth_getLogs method when no fromBlock or toBlock was provided

## [3.1.5] - 2023.09.21

### Added

- Add support for deploying NFT contract on Tezos chain https://docs.tatum.io/docs/nfts/create-nft-collection.

## [3.1.4] - 2023.09.20

### Added

- Expose active RPC node url in the `Rpc` module

## [3.1.3] - 2023.09.18

### Fixed

- Update horizen class

## [3.1.2] - 2023.09.15

### Fixed

- Horizen EON notifications
- Typos

## [3.1.1] - 2023.09.15

### Updated

- Updated links to the status and list.json pages for new and changed chains

## [3.1.0] - 2023.09.14

### Updated

- Updated correctly V1 -> V3 and V2 -> V4 config options
- Integrated Tron, BSC Arbitrum One to new infra

## [3.0.23] - 2023.09.14

### Update

- Minor version update to fix npm package issue

## [3.0.22] - 2023.09.13

### Fixed

- Fix loadbalancer logic to work without api key

## [3.0.21] - 2023.09.11

### Fixed

- The 'estimateSmartFee' method in AbstractUtxoRpc.ts has been updated to include the 'estimateMode' parameter as optional. Previously, if estimate mode was not provided, it would default to 'CONSERVATIVE'.

## [3.0.20] - 2023.09.08

### Fixed

- fix batched raw RPC call return type to also include method level error

## [3.0.19] - 2023.09.07

### Added

- Users can access data from the Horizen EON chain by using the `address` submodule. - `address.getTransactions({...})`, `address.getBalance({...})`

## [3.0.18] - 2023.09.06

### Fixed

- improve URL parsing for SSRF check

## [3.0.17] - 2023.09.06

### Added

- Add functions to EVM rpc interface: getTokenTotalSupply, getTokenCap, supportsInterfaceERC1155

## [3.0.16] - 2023.09.05

### Updated

- Extend allowed list of urls for SSRF check

## [3.0.15] - 2023.08.30

### Updated

- This commit introduces a Server Side Request Forgery (SSRF) check to the `initRemoteHosts` method within `LoadBalancerRpc.ts`. This check ensures that URLs end with 'rpc.tatum.io' before loading them to avoid potential SSRF attacks. To accommodate this change, `initRemoteHosts` has also been refactored to accept an `InitRemoteHostsParams` object. In addition, an optional parameter `noSSRFCheck` has been added to bypass the SSRF check when necessary.

## [3.0.14] - 2023.08.24

### Updated

- Update Tatum API URL to v4 from v1

## [3.0.12] - 2023.08.22

### Fixed

- Fixed Load Balancer issue with process is undefined on the pure browser

## [3.0.12] - 2023.08.21

### Fixed

- Removed undici dependency as it was causing issues

## [3.0.11] - 2023.08.18

### Added

- Added support for Eon - RPC calls

## [3.0.10] - 2023.08.16

### Added

- Add support for Tezos - Address and Notification modules

### Changed

- Refactored Tron Address module. getBalance now accepts only one string parameter `address` as it wasn't working with multiple addresses

## [3.0.9] - 2023.08.10

### Updated

- Add better logging message
- Updated contributing guide
- Removed old example folder

## [3.0.7] - 2023.08.10

### Fixed

- Fix retry requests
- Do not pass retry number in header

## [3.0.6] - 2023.08.08

### Changed

- Forced EVM debug_traceBlock and eth_getBlockReceipts methods to work with archive nodes
- Updated readme.md to look better

## [3.0.5] - 2023.08.07

### Changed

- In all error responses expects for RPC, error object returns also `dashboardLog` which points to the dashboard error log

## [3.0.4] - 2023.08.07

### Changed

- Added EVM debug_traceBlock and eth_getBlockReceipts methods
- Pass Api key to the archive load balancer liveness check
- Fix createrawtransaction method

## [3.0.3] - 2023.08.02

### Changed

- Changed error message for RPC calls from 'No active server found for ${nodeType} node.' to 'No active server found for node type ${NODE_TYPE_LABEL[nodeType]}.'

## [3.0.2] - 2023.08.01

### Changed

- Added destroy method to the global Tatum SDK instance

## [3.0.1] - 2023.08.01

### Changed

- Renamed RPC list domain from com to io
- Added Optimism and Polygon RPC calls archice
-

## [3.0.0] - 2023.07.19

### Changed

- Updated npm package name from @tatumcom/js to @tatumio/tatum.
- Updated npm token to ensure correct package retrieval.
- Made changes to the readme page for improved documentation.

## [1.5.11] - 2023.07.13

### Changed

- Fix rpc calls without api key & Added haqq archive/non-archive calls

## [1.5.10] - 2023.07.10

### Changed

- Selected Archive/Non-Archive node for Ethereum RPC calls based on method

## [1.5.9] - 2023.07.12

### Changed

- Several Tron RPC calls fixed

## [1.5.8] - 2023.07.10

### Changed

- Update all RPC calls to return unmodified data

## [1.5.7] - 2023.07.10

### Changed

- Extended JSON stringify to see error message in case of error to Loadbalancer

## [1.5.6] - 2023.07.10

### Changed

- Added JSON stringify to see error message in case of error to Loadbalancer

## [1.5.5] - 2023.07.05

### Changed

- Fixed not working Solana RPC calls

## [1.5.4] - 2023.07.05

### Changed

- Change Tron RPC calls error handling (to accommodate Tron RPC returning 200 status code even on error)

## [1.5.3] - 2023.07.05

### Changed

- Fixed not working Tron RPC calls

## [1.5.2] - 2023.07.04

### Changed

- All RPC methods are returning `ResponseDto` object with fields: `data`, `error`, `status`.

## [1.5.1] - 2023.06.28

### Updated

- Fixed custom nodes configuration
- renamed index.md to readme.md

## [1.5.0] - 2023.06.19

### Added

- Load balancer feature for Btc, Ltc, Doge, Eth, Flare, Haqq.
- Load balancer is used managing RPC calls to nodes in a blockchain network. It maintains a list of available nodes and their status, and it automatically selects the most responsive node for subsequent RPC calls.

## [1.4.25] - 2023.06.19

### Added

- Added new module for getting current fee for Evm and Utxo chains.

### Changed

- Refactoring TatumSdk class to return specific blockchain class on `init` instead of one generic class.

## [1.4.24] - 2023.06.12

### Added

- Added new module for fungible tokens with methods `getBalance`, `createNewFungibleToken`, `getTokenMetadata` and `getAllFungibleTransactions`.

## [1.4.23] - 2023.06.01

### Added

- Added `rates` submodule including `getCurrentRate` and `getCurrentRateBatch` methods for obtaining current fiat/crypto exchange rates.

## [1.4.22] - 2023.05.25

### Added

- Changed internal api calls for creation of NFT (`nft.createNftCollection`) / MultiToken (`nft.createMultiTokenNftCollection`) collections inside `nft` submodule and MetaMask integration in `walletProvider` submodule.

## [1.4.21] - 2023.05.23

### Changed

- Fixed TRON RPC params
- Added docs to TRON RPC

## [1.4.20] - 2023.05.22

### Changed

- getAllNftTransactionsByAddress required params number reduced

## [1.4.19] - 2023.05.22

### Added

- Added support for creation of NFT (`nft.createNftCollection`) / MultiToken (`nft.createMultiTokenNftCollection`) collections on EVM chains like Ethereum, Polygon, Celo and Binance Smart Chain inside `nft` submodule.

## [1.4.18] - 2023.05.22

### Added

- Added docs for Solana and XRP RPC

## [1.4.17] - 2023.05.22

### Changed

- Changed the underlying REST API call for metaMask deploy\* contracts function

## [1.4.16] - 2023.05.18

### Changed

- XRP naming convention on the SDK side

## [1.4.15] - 2023.05.17

### Changed

- Expanded type exports

## [1.4.14] - 2023.05.15

### Changed

- Added support for native public RPC calls to TRON blockchain

## [1.4.13] - 2023.05.15

### Changed

- Change params of `createFungibleToken`, `createErc1155NftCollection` and `createNftCollection` methods

## [1.4.12] - 2023.05.13

### Fixed

- Fixed `createFungibleToken` method - wrong initial supply calculation

## [1.4.11] - 2023.05.12

### Fixed

- Fixed `createErc1155NftCollection` and `createFungibleToken` methods - wrong API endpoint was used

## [1.4.10] - 2023.05.12

### Added

- Added support for reading deployed smart contract address via EVM-based helper function `getContractAddress(txHash: string): Promise<string | null>`

### Added

- Added support for Deploying contracts using MetaMask. It's possible to deploy NFT Collections (ERC-721/1155) or Fungible Tokens (ERC-20) directly from the browser.

## [1.4.8] - 2023.05.11

### Added

- Add comments to input parameters for Solana RPC

## [1.4.7] - 2023.05.11

### Added

- Added support for native public RPC calls to Solana blockchain

## [1.4.6] - 2023.05.10

### Added

- Added support for native public RPC calls to XRP blockchain

## [1.4.5] - 2023.05.10

### Added

- Support for `Contract Address Log Event` notification type
- TRON chain notifications
- SOLANA chain notifications

## [1.4.4] - 2023.04.28

### Fixed

- Fixed wrong decimals in WalletProvider MetaMask signing

[1.4.3] - 2023.04.27

### Fixed

- Fixed wrong BigNumber import

## [1.4.2] - 2023.04.26

### Added

- Added missing `getchainstats` method to UTXO RPC calls

## [1.4.1] - 2023.04.26

### Fixed

- Fixed optional `to` parameter in custom transaction payload for MetaMask signing

## [1.4.0] - 2023.04.26

### Added

- Added support for transferNft using MetaMask WalletProvider.
- Added support for multiple API Keys in the configuration (V1 and V2).

## [1.3.4] - 2023.04.25

### Added

- Added support for **WalletProvider** submodule. This submodule enables seamless interaction with external wallets like Metamask or Phantom within the browser. The Wallet Provider submodule allows the SDK to communicate with various wallet providers, streamlining the process of signing transactions, querying account balances, and interacting with smart contracts directly through popular browser wallets.

## [1.3.3] - 2023.04.24

### Added

- Added possibility to use custom RPC provider for any of the blockchain. Configuration parameter for this option is `rpcUrl`. If this parameter is set, then the SDK will use this URL for all RPC calls. If this parameter is not set, then the SDK will RPC provisioned by Tatum. List of supported blockchains is available [here](https://docs.tatum.io/introduction/supported-blockchains).

## [1.3.2] - 2023.04.21

### Changed

- Fixed parameter names of nft.getNFTsInCollection

## [1.3.1] - 2023.04.21

### Added

- Added parameter `address` to address.getBalance response to precisely identify the address for which the balance is returned.

## [1.3.0] - 2023.04.21

### Added

- Added support for **Address** submodule. This submodule simplifies wallet management across multiple blockchains by allowing you to fetch wallet balances and retrieve transactions for a given address. With the Address submodule, you can easily manage your wallets and monitor transactions, making your blockchain application development more efficient and user-friendly.

## [1.2.6] - 2023.04.19

### Changed

- Minor changes in the code - documentation, types moving between files etc.

## [1.2.5] - 2023.04.18

### Added

- Added missing ETH RPC calls `eth_getProof`

### Fixed

- Fixed RPC call `trace_callMany` - wrong order of arguments were passed
- Fixed all RPC calls `trace_*` - wrong naming of the method was used

## [1.2.4] - 2023.04.17

### Added

- Added missing ETH RPC calls `maxPriorityFeePerGas` and add txPoolStatus `include` parameter

## [1.2.3] - 2023.04.17

### Added

- Added support for **NFT** submodule. This submodule offers a comprehensive suite of tools for working with Non-Fungible Tokens (NFTs). With the NFT submodule, you can query the balance of NFTs on an address, retrieve NFT transactions associated with a specific address, explore NFTs within a collection or identify the owners of a particular NFT.

## [1.2.2] - 2023.04.16

### Changed

- Fixed exports

## [1.2.1] - 2023.04.16

### Changed

- Fixed exports

## [1.2.0] - 2023.04.16

### Added

- Added support for native RPC calls to UTXO and EVM based blockchains

### Changed

- Changed the way how the SDK is initialized. Now it is required to choose the blockchain and then initialize the SDK with the blockchain specific configuration.

### Removed

- Removed support for Open Network

## [1.1.3] - 2023.04.06

### Added

- Added get fastest URL method for a specific blockchain from Open Network

## [1.1.2] - 2023.04.05

### Added

- Added graceful shutdown of the SDK

## [1.1.1] - 2023.04.04

### Added

- Added support for block difference to Open Network
- Added support for multiple static URLs with load balancing to Open Network

## [1.1.0] - 2023.04.03

### Added

- Added support for [OpenNetwork network](https://openrpc.io)

### Removed

- Removed dependency on Axios - replaced with Fetch API
- Due to above, minimum Node version is now >= 18

### Changed

- `debug` config field was renamed to `verbose`
- renamed `TatumSdk` to `TatumSDK` as a main entry point

## [1.0.1] - 2023.03.16

### Added

- 13 new notification types to subscribe to

## [1.0.0] - 2023.03.06

### Added

- Added basic notification functionality like subscribe to address event, subscribe and unsubscribe to address event, list all subscriptions and webhooks.
