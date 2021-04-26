# Ledger function examples

## Import functions that will be used further 
```javascript
import {
    blockAmount,
    createAccount,
    createAccounts,
    deleteBlockedAmount,
    getAccountById,
    getBlockedAmountsByAccountId,
    updateAccount
} from './index';
```
## Declare constants and variables 
```javascript
    let id: string = '';
    let blockID: string = '';
    const accountCode: string = '03_ACC_01'; // random account code
    const accountNumber: string = '12345' // random account number
```
## To create a new account
```javascript

    const accountObj=await createAccount({ 'currency': 'BTC', 'accountNumber': accountNumber, 'accountCode': accountCode, })
    id = accountObj.id // saving id for further functions
```
## To get details for new account
```javascript
    const fetchAccount=await getAccountById(id)
```

## To update the account details
```javascript
    const account=await updateAccount(id, ({ 'accountCode': accountCode, 'accountNumber': accountNumber }))
```

## If you want to create multiple new accounts
```javascript
    const accounts= await createAccounts({
            'accounts': [{ 'currency': 'BTC', 'accountNumber': '123', 'accountCode': accountCode }, { 'currency': 'BTC', 'accountNumber': '456', 'accountCode': accountCode }]
        }
```
## To block amount for an account
```javascript
    const account=await blockAmount(id, { 'amount': '50000', 'type': 'DEBIT_CARD_OP', 'description': 'Card payment in the shop.' })
```

## To delete blocked amount 
```javascript
    const account= await deleteBlockedAmount(blockID)
```

## To create a virtual currency
```javascript
    const vc= await createVirtualCurrency({
                'name': 'VC_demoVC',
                'supply': '1000000',
                'basePair': Currency.BTC,
                'baseRate': 1,
                'customer': {
                    'accountingCurrency': Fiat.USD,
                    'externalId': '12'
                },
                'description': 'My Virtual Token description.',
                'accountCode': 'AC_102131_B'

            })
```
## To update the details of virtual currency created
```javascript
    const vc= await updateVirtualCurrency({
                'name': 'VC_demoVC',
                'basePair': Currency.BTC,
                'baseRate': 0.5
            })
```
## To fetch Virtual Currency details by name
```javascript
    const vc= await getVirtualCurrencyByName('VC_demoVC')
```

## To mint new currency
```javascript
    const vc= await mintVirtualCurrency({
                'accountId': id,
                'amount': '1.5'
            })
```

## To delete new created Virtual Currency
```javascript
    const vc= await revokeVirtualCurrency({
                'accountId': id,
                'amount': '1.5'
            })
```

## To trade between pairs
```javascript
    const trade= await storeTrade({
            'type': TradeType.BUY,
            'price': '8',
            'amount': '15',
            'pair': 'VC_demoVC/EUR',
            'currency1AccountId': '603bddc9fbf47f7a279d76ca',
            'currency2AccountId': '603c04950476a57888bc4d02',
            'feeAccountId': '603c04950476a57888bc4d02',
            'fee': 1.5
        })
```
## To transfer balance
```javascript
    const trade= await storeTransaction({
            'senderAccountId': '603bddc9fbf47f7a279d76ca',
            'recipientAccountId': '603c04950476a57888bc4d02',
            'amount': '6',
            'anonymous': false,
            'compliant': false,
            'transactionCode': '1_01_EXTERNAL_CODE',
            'paymentId': '9625',
            'recipientNote': 'Private note',
            'baseRate': 1,
            'senderNote': 'Sender note'
        })
```
## To get transaction
### To get by reference
```javascript
    const txn= await getTransactionsByReference('ref')
```
### To get by account
```javascript
    const txn= await getTransactionsByAccount({ id: '603bddc9fbf47f7a279d76ca' })
```
### To get txn by customerID
```javascript
    const txn= await getTransactionsByCustomer({ id: '603ac80298706ca9c04994af' })
```
### To get txn by whole ledger
```javascript
await getTransactionsByLedger({})
```
