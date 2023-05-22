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
