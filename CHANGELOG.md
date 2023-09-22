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
- Changed the underlying REST API call for metaMask deploy* contracts function

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
