**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / "src/blockchain/vet"

# Module: "src/blockchain/vet"

## Index

### Functions

* [vetBroadcast](_src_blockchain_vet_.md#vetbroadcast)
* [vetEstimateGas](_src_blockchain_vet_.md#vetestimategas)
* [vetGetAccountBalance](_src_blockchain_vet_.md#vetgetaccountbalance)
* [vetGetAccountEnergy](_src_blockchain_vet_.md#vetgetaccountenergy)
* [vetGetBlock](_src_blockchain_vet_.md#vetgetblock)
* [vetGetCurrentBlock](_src_blockchain_vet_.md#vetgetcurrentblock)
* [vetGetTransaction](_src_blockchain_vet_.md#vetgettransaction)
* [vetGetTransactionReceipt](_src_blockchain_vet_.md#vetgettransactionreceipt)

## Functions

### vetBroadcast

▸ `Const`**vetBroadcast**(`txData`: string, `signatureId?`: undefined \| string): Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

*Defined in [src/blockchain/vet.ts:9](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/vet.ts#L9)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/VetBroadcast" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`txData` | string |
`signatureId?` | undefined \| string |

**Returns:** Promise\<[TransactionHash](../interfaces/_src_model_response_common_transactionhash_.transactionhash.md)>

___

### vetEstimateGas

▸ `Const`**vetEstimateGas**(`body`: [EstimateGasVet](../classes/_src_model_request_estimategasvet_.estimategasvet.md)): Promise\<[VetEstimateGas](../interfaces/_src_model_response_vet_vetestimategas_.vetestimategas.md)>

*Defined in [src/blockchain/vet.ts:18](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/vet.ts#L18)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/VetEstimateGas" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`body` | [EstimateGasVet](../classes/_src_model_request_estimategasvet_.estimategasvet.md) |

**Returns:** Promise\<[VetEstimateGas](../interfaces/_src_model_response_vet_vetestimategas_.vetestimategas.md)>

___

### vetGetAccountBalance

▸ `Const`**vetGetAccountBalance**(`address`: string): Promise\<number>

*Defined in [src/blockchain/vet.ts:42](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/vet.ts#L42)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/VetGetBalance" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |

**Returns:** Promise\<number>

___

### vetGetAccountEnergy

▸ `Const`**vetGetAccountEnergy**(`address`: string): Promise\<number>

*Defined in [src/blockchain/vet.ts:49](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/vet.ts#L49)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/VetGetEnergy" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`address` | string |

**Returns:** Promise\<number>

___

### vetGetBlock

▸ `Const`**vetGetBlock**(`hash`: string): Promise\<[VetBlock](../interfaces/_src_model_response_vet_vetblock_.vetblock.md)>

*Defined in [src/blockchain/vet.ts:35](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/vet.ts#L35)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/VetGetBlock" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[VetBlock](../interfaces/_src_model_response_vet_vetblock_.vetblock.md)>

___

### vetGetCurrentBlock

▸ `Const`**vetGetCurrentBlock**(): Promise\<number>

*Defined in [src/blockchain/vet.ts:28](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/vet.ts#L28)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/VetGetCurrentBlock" target="_blank">Tatum API documentation</a>

**Returns:** Promise\<number>

___

### vetGetTransaction

▸ `Const`**vetGetTransaction**(`hash`: string): Promise\<[VetTx](../interfaces/_src_model_response_vet_vettx_.vettx.md)>

*Defined in [src/blockchain/vet.ts:56](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/vet.ts#L56)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/VetGetTransaction" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[VetTx](../interfaces/_src_model_response_vet_vettx_.vettx.md)>

___

### vetGetTransactionReceipt

▸ `Const`**vetGetTransactionReceipt**(`hash`: string): Promise\<[VetTxReceipt](../interfaces/_src_model_response_vet_vettxreceipt_.vettxreceipt.md)>

*Defined in [src/blockchain/vet.ts:63](https://github.com/tatumio/tatum-js/blob/8f0f126/src/blockchain/vet.ts#L63)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/VetGetTransactionReceipt" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type |
------ | ------ |
`hash` | string |

**Returns:** Promise\<[VetTxReceipt](../interfaces/_src_model_response_vet_vettxreceipt_.vettxreceipt.md)>
