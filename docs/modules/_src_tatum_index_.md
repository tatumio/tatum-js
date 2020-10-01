**@tatumio/tatum - v1.3.2**

> [README](../README.md) / [Globals](../globals.md) / "src/tatum/index"

# Module: "src/tatum/index"

## Index

### Functions

* [getExchangeRate](_src_tatum_index_.md#getexchangerate)

## Functions

### getExchangeRate

▸ `Const`**getExchangeRate**(`currency`: [Fiat](../enums/_src_model_response_ledger_fiat_.fiat.md) \| [Currency](../enums/_src_model_request_currency_.currency.md), `basePair`: [Fiat](../enums/_src_model_response_ledger_fiat_.fiat.md)): Promise\<[Rate](../classes/_src_model_response_common_rate_.rate.md)>

*Defined in [src/tatum/index.ts:10](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/tatum/index.ts#L10)*

For more details, see <a href="https://tatum.io/apidoc.html#operation/getExchangeRate" target="_blank">Tatum API documentation</a>

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`currency` | [Fiat](../enums/_src_model_response_ledger_fiat_.fiat.md) \| [Currency](../enums/_src_model_request_currency_.currency.md) | - |
`basePair` | [Fiat](../enums/_src_model_response_ledger_fiat_.fiat.md) | Fiat.EUR |

**Returns:** Promise\<[Rate](../classes/_src_model_response_common_rate_.rate.md)>
