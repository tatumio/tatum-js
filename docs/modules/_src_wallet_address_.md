**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/wallet/address"

# Module: "src/wallet/address"

## Index

### Functions

* [generateAddressFromXPub](_src_wallet_address_.md#generateaddressfromxpub)
* [generateBchAddress](_src_wallet_address_.md#generatebchaddress)
* [generateBchPrivateKey](_src_wallet_address_.md#generatebchprivatekey)
* [generateBnbAddress](_src_wallet_address_.md#generatebnbaddress)
* [generateBnbPrivateKey](_src_wallet_address_.md#generatebnbprivatekey)
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

*Defined in [src/wallet/address.ts:188](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L188)*

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

*Defined in [src/wallet/address.ts:53](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L53)*

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

*Defined in [src/wallet/address.ts:134](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L134)*

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

### generateBnbAddress

▸ `Const`**generateBnbAddress**(`testnet`: boolean, `xpub`: string, `i`: number): string

*Defined in [src/wallet/address.ts:92](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L92)*

Generate BnB address

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`xpub` | string | extended public key to generate address from |
`i` | number | derivation index of address to generate. Up to 2^32 addresses can be generated. |

**Returns:** string

blockchain address

___

### generateBnbPrivateKey

▸ `Const`**generateBnbPrivateKey**(`mnemonic`: string, `i`: number): Promise\<string>

*Defined in [src/wallet/address.ts:176](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L176)*

Generate BnbB private key from mnemonic seed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`mnemonic` | string | mnemonic to generate private key from |
`i` | number | derivation index of private key to generate. |

**Returns:** Promise\<string>

blockchain private key to the address

___

### generateBtcAddress

▸ `Const`**generateBtcAddress**(`testnet`: boolean, `xpub`: string, `i`: number): string

*Defined in [src/wallet/address.ts:27](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L27)*

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

*Defined in [src/wallet/address.ts:104](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L104)*

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

*Defined in [src/wallet/address.ts:66](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L66)*

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

*Defined in [src/wallet/address.ts:149](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L149)*

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

*Defined in [src/wallet/address.ts:40](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L40)*

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

*Defined in [src/wallet/address.ts:119](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L119)*

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

*Defined in [src/wallet/address.ts:229](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L229)*

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

*Defined in [src/wallet/address.ts:79](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L79)*

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

*Defined in [src/wallet/address.ts:163](https://github.com/tatumio/tatum-js/blob/8f0f126/src/wallet/address.ts#L163)*

Generate VeChain private key from mnemonic seed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`testnet` | boolean | testnet or mainnet version of address |
`mnemonic` | string | mnemonic to generate private key from |
`i` | number | derivation index of private key to generate. |

**Returns:** Promise\<string>

blockchain private key to the address
