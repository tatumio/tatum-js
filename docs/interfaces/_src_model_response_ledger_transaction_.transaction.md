**@tatumio/tatum - v1.3.1**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/ledger/Transaction"](../modules/_src_model_response_ledger_transaction_.md) / Transaction

# Interface: Transaction

## Hierarchy

* **Transaction**

## Index

### Properties

* [accountId](_src_model_response_ledger_transaction_.transaction.md#accountid)
* [address](_src_model_response_ledger_transaction_.transaction.md#address)
* [amount](_src_model_response_ledger_transaction_.transaction.md#amount)
* [anonymous](_src_model_response_ledger_transaction_.transaction.md#anonymous)
* [attr](_src_model_response_ledger_transaction_.transaction.md#attr)
* [counterAccountId](_src_model_response_ledger_transaction_.transaction.md#counteraccountid)
* [created](_src_model_response_ledger_transaction_.transaction.md#created)
* [currency](_src_model_response_ledger_transaction_.transaction.md#currency)
* [marketValue](_src_model_response_ledger_transaction_.transaction.md#marketvalue)
* [operationType](_src_model_response_ledger_transaction_.transaction.md#operationtype)
* [paymentId](_src_model_response_ledger_transaction_.transaction.md#paymentid)
* [recipientNote](_src_model_response_ledger_transaction_.transaction.md#recipientnote)
* [reference](_src_model_response_ledger_transaction_.transaction.md#reference)
* [senderNote](_src_model_response_ledger_transaction_.transaction.md#sendernote)
* [transactionCode](_src_model_response_ledger_transaction_.transaction.md#transactioncode)
* [transactionType](_src_model_response_ledger_transaction_.transaction.md#transactiontype)
* [txId](_src_model_response_ledger_transaction_.transaction.md#txid)

## Properties

### accountId

•  **accountId**: string

*Defined in [src/model/response/ledger/Transaction.ts:16](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L16)*

Source account - source of transaction(s)

**`memberof`** Transaction

___

### address

• `Optional` **address**: undefined \| string

*Defined in [src/model/response/ledger/Transaction.ts:76](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L76)*

For operationType DEPOSIT it represents address, on which was deposit credited for the account.

**`memberof`** Transaction

___

### amount

•  **amount**: string

*Defined in [src/model/response/ledger/Transaction.ts:22](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L22)*

Amount in account's currency

**`memberof`** Transaction

___

### anonymous

•  **anonymous**: boolean

*Defined in [src/model/response/ledger/Transaction.ts:28](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L28)*

Whether the transaction is anonymous. If true, counter account owner does not see source account.

**`memberof`** Transaction

___

### attr

• `Optional` **attr**: undefined \| string

*Defined in [src/model/response/ledger/Transaction.ts:70](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L70)*

Present only for operationType WITHDRAWAL and XLM / XRP based accounts it represents message or destinationTag of the recipient, if present.

**`memberof`** Transaction

___

### counterAccountId

• `Optional` **counterAccountId**: undefined \| string

*Defined in [src/model/response/ledger/Transaction.ts:34](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L34)*

Counter account - transaction(s) destination account. In case of blockchain recipient, this is addess of blockchain account.

**`memberof`** Transaction

___

### created

•  **created**: number

*Defined in [src/model/response/ledger/Transaction.ts:46](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L46)*

Time in UTC of transaction.

**`memberof`** Transaction

___

### currency

•  **currency**: string

*Defined in [src/model/response/ledger/Transaction.ts:40](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L40)*

Transaction currency

**`memberof`** Transaction

___

### marketValue

•  **marketValue**: [MarketValue](_src_model_response_ledger_marketvalue_.marketvalue.md)[]

*Defined in [src/model/response/ledger/Transaction.ts:52](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L52)*

List of market values of given transaction with all supported base pairs.

**`memberof`** Transaction

___

### operationType

•  **operationType**: [OperationType](../enums/_src_model_response_ledger_operationtype_.operationtype.md)

*Defined in [src/model/response/ledger/Transaction.ts:58](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L58)*

Type of operation.

**`memberof`** Transaction

___

### paymentId

• `Optional` **paymentId**: undefined \| string

*Defined in [src/model/response/ledger/Transaction.ts:64](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L64)*

Payment ID defined in payment order by sender.

**`memberof`** Transaction

___

### recipientNote

• `Optional` **recipientNote**: undefined \| string

*Defined in [src/model/response/ledger/Transaction.ts:82](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L82)*

Note visible for both sender and recipient.

**`memberof`** Transaction

___

### reference

•  **reference**: string

*Defined in [src/model/response/ledger/Transaction.ts:88](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L88)*

Transaction internal reference - unique identifier within Tatum ledger. In order of failure, use this value to search for problems.

**`memberof`** Transaction

___

### senderNote

• `Optional` **senderNote**: undefined \| string

*Defined in [src/model/response/ledger/Transaction.ts:100](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L100)*

Note visible for sender.

**`memberof`** Transaction

___

### transactionCode

• `Optional` **transactionCode**: undefined \| string

*Defined in [src/model/response/ledger/Transaction.ts:106](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L106)*

For bookkeeping to distinct transaction purpose.

**`memberof`** Transaction

___

### transactionType

•  **transactionType**: [TransactionType](../enums/_src_model_response_ledger_transactiontype_.transactiontype.md)

*Defined in [src/model/response/ledger/Transaction.ts:112](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L112)*

Type of payment.

**`memberof`** Transaction

___

### txId

• `Optional` **txId**: undefined \| string

*Defined in [src/model/response/ledger/Transaction.ts:94](https://github.com/tatumio/tatum-js/blob/8f0f126/src/model/response/ledger/Transaction.ts#L94)*

For operationType DEPOSIT, BLOCKCHAIN_TRANSACTION it represents transaction id, for which deposit occured.

**`memberof`** Transaction
