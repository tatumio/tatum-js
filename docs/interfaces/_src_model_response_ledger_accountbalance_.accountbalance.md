**@tatumio/tatum - v1.3.2**

> [README](../README.md) / [Globals](../globals.md) / ["src/model/response/ledger/AccountBalance"](../modules/_src_model_response_ledger_accountbalance_.md) / AccountBalance

# Interface: AccountBalance

**`export`** 

**`interface`** AccountBalance

## Hierarchy

* **AccountBalance**

## Index

### Properties

* [accountBalance](_src_model_response_ledger_accountbalance_.accountbalance.md#accountbalance)
* [availableBalance](_src_model_response_ledger_accountbalance_.accountbalance.md#availablebalance)

## Properties

### accountBalance

•  **accountBalance**: string

*Defined in [src/model/response/ledger/AccountBalance.ts:12](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/AccountBalance.ts#L12)*

Account balance represents all assets on the account, available and blocked.

**`memberof`** AccountBalance

___

### availableBalance

•  **availableBalance**: string

*Defined in [src/model/response/ledger/AccountBalance.ts:20](https://github.com/tatumio/tatum-js/blob/b9ab1e4/src/model/response/ledger/AccountBalance.ts#L20)*

Available balance on the account represents account balance minus blocked amount on the account.
If the account is frozen or customer is disabled, the available balance will be 0.
Available balance should be user do determine how much can customer send or withdraw from the account.

**`memberof`** AccountBalance
