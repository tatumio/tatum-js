**@tatumio/tatum - v1.3.0**

> [README](../README.md) / [Globals](../globals.md) / "src/offchain/common"

# Module: "src/offchain/common"

## Index

### Functions

* [assignDepositAddress](_src_offchain_common_.md#assigndepositaddress)
* [checkAddressExists](_src_offchain_common_.md#checkaddressexists)
* [generateDepositAddress](_src_offchain_common_.md#generatedepositaddress)
* [getDepositAddressesForAccount](_src_offchain_common_.md#getdepositaddressesforaccount)
* [offchainBroadcast](_src_offchain_common_.md#offchainbroadcast)
* [offchainCancelWithdrawal](_src_offchain_common_.md#offchaincancelwithdrawal)
* [offchainCompleteWithdrawal](_src_offchain_common_.md#offchaincompletewithdrawal)
* [offchainStoreWithdrawal](_src_offchain_common_.md#offchainstorewithdrawal)
* [removeDepositAddress](_src_offchain_common_.md#removedepositaddress)

## Functions

### assignDepositAddress

▸ `Const`**assignDepositAddress**(`id`: string, `address`: string): Promise\<[Address](../interfaces/_src_model_response_offchain_address_.address.md)>

*Defined in [src/offchain/common.ts:27](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/common.ts#L27)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/assignAddress" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`address` | string |

**Returns:** Promise\<[Address](../interfaces/_src_model_response_offchain_address_.address.md)>

___

### checkAddressExists

▸ `Const`**checkAddressExists**(`address`: string, `currency`: string, `index?`: undefined \| number): Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)>

*Defined in [src/offchain/common.ts:18](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/common.ts#L18)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/addressExists" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |
`currency` | string |
`index?` | undefined \| number |

**Returns:** Promise\<[Account](../interfaces/_src_model_response_ledger_account_.account.md)>

___

### generateDepositAddress

▸ `Const`**generateDepositAddress**(`id`: string, `index?`: undefined \| number): Promise\<[Address](../interfaces/_src_model_response_offchain_address_.address.md)>

*Defined in [src/offchain/common.ts:8](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/common.ts#L8)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/generateDepositAddress" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`index?` | undefined \| number |

**Returns:** Promise\<[Address](../interfaces/_src_model_response_offchain_address_.address.md)>

___

### getDepositAddressesForAccount

▸ `Const`**getDepositAddressesForAccount**(`id`: string): Promise\<[Address](../interfaces/_src_model_response_offchain_address_.address.md)[]>

*Defined in [src/offchain/common.ts:44](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/common.ts#L44)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getAllDepositAddresses" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Address](../interfaces/_src_model_response_offchain_address_.address.md)[]>

___

### offchainBroadcast

▸ `Const`**offchainBroadcast**(`data`: [BroadcastWithdrawal](../interfaces/_src_model_request_broadcastwithdrawal_.broadcastwithdrawal.md)): Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

*Defined in [src/offchain/common.ts:52](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/common.ts#L52)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/broadcastBlockchainTransaction" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`data` | [BroadcastWithdrawal](../interfaces/_src_model_request_broadcastwithdrawal_.broadcastwithdrawal.md) |

**Returns:** Promise\<[TxHash](../interfaces/_src_model_response_common_txhash_.txhash.md)>

___

### offchainCancelWithdrawal

▸ `Const`**offchainCancelWithdrawal**(`id`: string, `revert`: boolean): Promise\<void>

*Defined in [src/offchain/common.ts:70](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/common.ts#L70)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/cancelInProgressWithdrawal" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`id` | string | - |
`revert` | boolean | true |

**Returns:** Promise\<void>

___

### offchainCompleteWithdrawal

▸ `Const`**offchainCompleteWithdrawal**(`id`: string, `txId`: string): Promise\<void>

*Defined in [src/offchain/common.ts:78](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/common.ts#L78)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/completeWithdrawal" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`txId` | string |

**Returns:** Promise\<void>

___

### offchainStoreWithdrawal

▸ `Const`**offchainStoreWithdrawal**(`data`: any): Promise\<[WithdrawalResponse](../interfaces/_src_model_response_offchain_withdrawalresponse_.withdrawalresponse.md)>

*Defined in [src/offchain/common.ts:61](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/common.ts#L61)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/storeWithdrawal" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`data` | any |

**Returns:** Promise\<[WithdrawalResponse](../interfaces/_src_model_response_offchain_withdrawalresponse_.withdrawalresponse.md)>

___

### removeDepositAddress

▸ `Const`**removeDepositAddress**(`id`: string, `address`: string): Promise\<void>

*Defined in [src/offchain/common.ts:36](https://github.com/tatumio/tatum-js/blob/31bb1b4/src/offchain/common.ts#L36)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/assignAddress" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |
`address` | string |

**Returns:** Promise\<void>
