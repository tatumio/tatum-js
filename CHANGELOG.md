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
