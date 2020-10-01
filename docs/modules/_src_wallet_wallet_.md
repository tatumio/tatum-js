**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/wallet/wallet"

# Module: "src/wallet/wallet"

## Index

### Interfaces

* [Wallet](../interfaces/_src_wallet_wallet_.wallet.md)

### Functions

* [generateBchWallet](_src_wallet_wallet_.md#generatebchwallet)
* [generateBnbWallet](_src_wallet_wallet_.md#generatebnbwallet)
* [generateBtcWallet](_src_wallet_wallet_.md#generatebtcwallet)
* [generateEthWallet](_src_wallet_wallet_.md#generateethwallet)
* [generateLtcWallet](_src_wallet_wallet_.md#generateltcwallet)
* [generateNeoWallet](_src_wallet_wallet_.md#generateneowallet)
* [generateVetWallet](_src_wallet_wallet_.md#generatevetwallet)
* [generateWallet](_src_wallet_wallet_.md#generatewallet)
* [generateXlmWallet](_src_wallet_wallet_.md#generatexlmwallet)
* [generateXrpWallet](_src_wallet_wallet_.md#generatexrpwallet)

## Functions

### generateBchWallet

▸ `Const`**generateBchWallet**(`testnet`: boolean, `mnem`: string): [Wallet](../interfaces/_src_wallet_wallet_.wallet.md)

*Defined in [src/wallet/wallet.ts:98](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L98)*

Generate Bitcoin Cash wallet

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnem` | string | mnemonic seed to use |

**Returns:** [Wallet](../interfaces/_src_wallet_wallet_.wallet.md)

wallet

___

### generateBnbWallet

▸ `Const`**generateBnbWallet**(`testnet`: boolean, `mnem`: string): Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

*Defined in [src/wallet/wallet.ts:48](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L48)*

Generate BnB wallet

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnem` | string | mnemonic seed to use |

**Returns:** Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

wallet

___

### generateBtcWallet

▸ `Const`**generateBtcWallet**(`testnet`: boolean, `mnem`: string): Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

*Defined in [src/wallet/wallet.ts:117](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L117)*

Generate Bitcoin wallet

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnem` | string | mnemonic seed to use |

**Returns:** Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

wallet

___

### generateEthWallet

▸ `Const`**generateEthWallet**(`testnet`: boolean, `mnem`: string): Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

*Defined in [src/wallet/wallet.ts:81](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L81)*

Generate Ethereum or any other ERC20 wallet

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnem` | string | mnemonic seed to use |

**Returns:** Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

wallet

___

### generateLtcWallet

▸ `Const`**generateLtcWallet**(`testnet`: boolean, `mnem`: string): Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

*Defined in [src/wallet/wallet.ts:128](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L128)*

Generate Litecoin wallet

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnem` | string | mnemonic seed to use |

**Returns:** Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

wallet

___

### generateNeoWallet

▸ `Const`**generateNeoWallet**(): object

*Defined in [src/wallet/wallet.ts:136](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L136)*

Generate Neo address and private key.

**Returns:** object

Name | Type |
------ | ------ |
`address` | string |
`privateKey` | string |

___

### generateVetWallet

▸ `Const`**generateVetWallet**(`testnet`: boolean, `mnem`: string): Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

*Defined in [src/wallet/wallet.ts:64](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L64)*

Generate VeChain wallet

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnem` | string | mnemonic seed to use |

**Returns:** Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)>

wallet

___

### generateWallet

▸ `Const`**generateWallet**(`currency`: [Currency](../enums/_src_model_request_currency_.currency.md), `testnet`: boolean, `mnemonic?`: undefined \| string): [Wallet](../interfaces/_src_wallet_wallet_.wallet.md) \| Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)> \| { address: string = new wallet.Account(privateKey).address; privateKey: string  } \| { address: undefined \| string ; secret: string  }

*Defined in [src/wallet/wallet.ts:165](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L165)*

Generate wallet

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`currency` | [Currency](../enums/_src_model_request_currency_.currency.md) | blockchain to generate wallet for |
`testnet` | boolean | testnet or mainnet version of address |
`mnemonic?` | undefined \| string | mnemonic seed to use. If not present, new one will be generated |

**Returns:** [Wallet](../interfaces/_src_wallet_wallet_.wallet.md) \| Promise\<[Wallet](../interfaces/_src_wallet_wallet_.wallet.md)> \| { address: string = new wallet.Account(privateKey).address; privateKey: string  } \| { address: undefined \| string ; secret: string  }

wallet or a combination of address and private key

___

### generateXlmWallet

▸ `Const`**generateXlmWallet**(`secret?`: undefined \| string): object

*Defined in [src/wallet/wallet.ts:153](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L153)*

Generate Stellar address and secret.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`secret?` | undefined \| string | secret of the account to generate address  |

**Returns:** object

Name | Type |
------ | ------ |
`address` | string |
`secret` | string |

___

### generateXrpWallet

▸ `Const`**generateXrpWallet**(): object

*Defined in [src/wallet/wallet.ts:144](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/wallet/wallet.ts#L144)*

Generate Xrp address and secret.

**Returns:** object

Name | Type |
------ | ------ |
`address` | undefined \| string |
`secret` | string |
