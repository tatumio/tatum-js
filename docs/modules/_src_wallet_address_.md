**@tatumio/tatum - v1.4.4**

> [README](../README.md) / [Globals](../globals.md) / "src/wallet/address"

# Module: "src/wallet/address"

## Index

### Functions

* [generateAddressFromXPub](_src_wallet_address_.md#generateaddressfromxpub)
* [generateBchAddress](_src_wallet_address_.md#generatebchaddress)
* [generateBchPrivateKey](_src_wallet_address_.md#generatebchprivatekey)
* [generateBtcAddress](_src_wallet_address_.md#generatebtcaddress)
* [generateBtcPrivateKey](_src_wallet_address_.md#generatebtcprivatekey)
* [generateEthAddress](_src_wallet_address_.md#generateethaddress)
* [generateEthPrivateKey](_src_wallet_address_.md#generateethprivatekey)
* [generateLtcAddress](_src_wallet_address_.md#generateltcaddress)
* [generateLtcPrivateKey](_src_wallet_address_.md#generateltcprivatekey)
* [generatePrivateKeyFromMnemonic](_src_wallet_address_.md#generateprivatekeyfrommnemonic)
* [generateVetAddress](_src_wallet_address_.md#generatevetaddress)
* [generateVetPrivateKey](_src_wallet_address_.md#generatevetprivatekey)

## Functions

### generateAddressFromXPub

▸ `Const`**generateAddressFromXPub**(`currency`: [Currency](../enums/_src_model_request_currency_.currency.md), `testnet`: boolean, `xpub`: string, `i`: number): string

*Defined in [src/wallet/address.ts:165](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L165)*

Generate address

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`currency` | [Currency](../enums/_src_model_request_currency_.currency.md) | type of blockchain |
`testnet` | boolean | testnet or mainnet version of address |
`xpub` | string | extended public key to generate address from |
`i` | number | derivation index of address to generate. Up to 2^32 addresses can be generated. |

**Returns:** string

blockchain address

___

### generateBchAddress

▸ `Const`**generateBchAddress**(`testnet`: boolean, `xpub`: string, `i`: number): string

*Defined in [src/wallet/address.ts:52](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L52)*

Generate Bitcoin Cash address

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`xpub` | string | extended public key to generate address from |
`i` | number | derivation index of address to generate. Up to 2^32 addresses can be generated. |

**Returns:** string

blockchain address

___

### generateBchPrivateKey

▸ `Const`**generateBchPrivateKey**(`testnet`: boolean, `mnemonic`: string, `i`: number): Promise\<string>

*Defined in [src/wallet/address.ts:121](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L121)*

Generate Bitcoin Cash private key from mnemonic seed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnemonic` | string | mnemonic to generate private key from |
`i` | number | derivation index of private key to generate. |

**Returns:** Promise\<string>

blockchain private key to the address

___

### generateBtcAddress

▸ `Const`**generateBtcAddress**(`testnet`: boolean, `xpub`: string, `i`: number): string

*Defined in [src/wallet/address.ts:26](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L26)*

Generate Bitcoin address

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`xpub` | string | extended public key to generate address from |
`i` | number | derivation index of address to generate. Up to 2^32 addresses can be generated. |

**Returns:** string

blockchain address

___

### generateBtcPrivateKey

▸ `Const`**generateBtcPrivateKey**(`testnet`: boolean, `mnemonic`: string, `i`: number): Promise\<string>

*Defined in [src/wallet/address.ts:91](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L91)*

Generate Bitcoin private key from mnemonic seed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnemonic` | string | mnemonic to generate private key from |
`i` | number | derivation index of private key to generate. |

**Returns:** Promise\<string>

blockchain private key to the address

___

### generateEthAddress

▸ `Const`**generateEthAddress**(`testnet`: boolean, `xpub`: string, `i`: number): string

*Defined in [src/wallet/address.ts:65](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L65)*

Generate Ethereum or any other ERC20 address

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`xpub` | string | extended public key to generate address from |
`i` | number | derivation index of address to generate. Up to 2^32 addresses can be generated. |

**Returns:** string

blockchain address

___

### generateEthPrivateKey

▸ `Const`**generateEthPrivateKey**(`testnet`: boolean, `mnemonic`: string, `i`: number): Promise\<string>

*Defined in [src/wallet/address.ts:136](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L136)*

Generate Ethereum or any other ERC20 private key from mnemonic seed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnemonic` | string | mnemonic to generate private key from |
`i` | number | derivation index of private key to generate. |

**Returns:** Promise\<string>

blockchain private key to the address

___

### generateLtcAddress

▸ `Const`**generateLtcAddress**(`testnet`: boolean, `xpub`: string, `i`: number): string

*Defined in [src/wallet/address.ts:39](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L39)*

Generate Litecoin address

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`xpub` | string | extended public key to generate address from |
`i` | number | derivation index of address to generate. Up to 2^32 addresses can be generated. |

**Returns:** string

blockchain address

___

### generateLtcPrivateKey

▸ `Const`**generateLtcPrivateKey**(`testnet`: boolean, `mnemonic`: string, `i`: number): Promise\<string>

*Defined in [src/wallet/address.ts:106](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L106)*

Generate Litecoin private key from mnemonic seed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnemonic` | string | mnemonic to generate private key from |
`i` | number | derivation index of private key to generate. |

**Returns:** Promise\<string>

blockchain private key to the address

___

### generatePrivateKeyFromMnemonic

▸ `Const`**generatePrivateKeyFromMnemonic**(`currency`: [Currency](../enums/_src_model_request_currency_.currency.md), `testnet`: boolean, `mnemonic`: string, `i`: number): Promise\<string>

*Defined in [src/wallet/address.ts:204](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L204)*

Generate private key from mnemonic seed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`currency` | [Currency](../enums/_src_model_request_currency_.currency.md) | type of blockchain |
`testnet` | boolean | testnet or mainnet version of address |
`mnemonic` | string | mnemonic to generate private key from |
`i` | number | derivation index of private key to generate. |

**Returns:** Promise\<string>

blockchain private key to the address

___

### generateVetAddress

▸ `Const`**generateVetAddress**(`testnet`: boolean, `xpub`: string, `i`: number): string

*Defined in [src/wallet/address.ts:78](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L78)*

Generate VeChain address

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`xpub` | string | extended public key to generate address from |
`i` | number | derivation index of address to generate. Up to 2^32 addresses can be generated. |

**Returns:** string

blockchain address

___

### generateVetPrivateKey

▸ `Const`**generateVetPrivateKey**(`testnet`: boolean, `mnemonic`: string, `i`: number): Promise\<string>

*Defined in [src/wallet/address.ts:150](https://github.com/tatumio/tatum-js/blob/c5d1e16/src/wallet/address.ts#L150)*

Generate VeChain private key from mnemonic seed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnemonic` | string | mnemonic to generate private key from |
`i` | number | derivation index of private key to generate. |

**Returns:** Promise\<string>

blockchain private key to the address
