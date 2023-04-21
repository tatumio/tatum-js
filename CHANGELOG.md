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
