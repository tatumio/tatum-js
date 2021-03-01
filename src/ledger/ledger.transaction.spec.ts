import {
    getTransactionsByAccount,
    getTransactionsByCustomer,
    getTransactionsByLedger,
    getTransactionsByReference,
    storeTransaction,
} from './transaction';

describe('LEDGER TESTS: Transactions test suite', () => {
    let ref: string = ''; // using variable with global scope
    it('should be able to transfer balance', async () => {
        await storeTransaction({
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
        }).then(accountObj => {
            ref = accountObj.reference
            expect(accountObj.reference).not.toBe(null) // checking if value not null
        })
    });
    it('should fail to find recipient in case of wrong id', async () => {
        await storeTransaction({
            'senderAccountId': '603bddc9fbf47f7a279d76ca',
            'recipientAccountId': 'wrong5712b55823de7ea82id',
            'amount': '5',
            'anonymous': false,
            'compliant': false,
            'transactionCode': '1_01_EXTERNAL_CODE',
            'paymentId': '9625',
            'recipientNote': 'Private note',
            'baseRate': 1,
            'senderNote': 'Sender note'
        }).catch(e => {
            // checking negative test results
            expect(e.response.data.statusCode).toBe(403)
            expect(e.response.data.errorCode).toBe('recipientAccount.not.exists')
        })
    });
    it('should fail to send negative values', async () => {
        await storeTransaction({
            'senderAccountId': '603bddc9fbf47f7a279d76ca',
            'recipientAccountId': '603c04950476a57888bc4d02',
            'amount': '-5',
            'anonymous': false,
            'compliant': false,
            'transactionCode': '1_01_EXTERNAL_CODE',
            'paymentId': '9625',
            'recipientNote': 'Private note',
            'baseRate': 1,
            'senderNote': 'Sender note'
        }).catch(e => {
            // checking negative test results
            console.log(JSON.stringify(e.response.data))
            expect(e.response.data.statusCode).toBe(400)
            expect(e.response.data.errorCode).toBe('validation.failed')
        })
    });
    it('should be able to get txn by ref', async () => {
        await getTransactionsByReference(ref).then(accountObj => {
            console.log(accountObj)
            expect(accountObj.length).toBe(2)
            expect(accountObj[0].operationType).toBe('PAYMENT')
            if (accountObj[0].amount === '-6') {
                expect(accountObj[0].transactionType).toBe('DEBIT_PAYMENT')
            } else {
                expect(accountObj[0].transactionType).toBe('CREDIT_PAYMENT')
            }

        }).catch(e => {
            console.log(JSON.stringify(e.response.data))
        })
    });
    it('should be able to get txn by account', async () => {
        await getTransactionsByAccount({ id: '603bddc9fbf47f7a279d76ca' }).then(accountObj => {
            expect(accountObj).not.toBeUndefined()
            expect(accountObj.length).not.toBe(0)
        }).catch(e => {
            // return errors if any
            console.log(JSON.stringify(e.response.data))
        })
    });
    it('should be able to get txn by customer', async () => {
        await getTransactionsByCustomer({ id: '603ac80298706ca9c04994af' }).then(accountObj => {
            expect(accountObj).not.toBeUndefined()
            expect(accountObj.length).not.toBe(0)
        }).catch(e => {
            // return errors if any
            console.log(JSON.stringify(e.response.data))
        })
    });
    it('should fail to get txn by customer for non existant customer id', async () => {
        await getTransactionsByCustomer({ id: 'doesnotexistsca9c04994af' }).then(accountObj => {
            expect(accountObj.length).toBe(0)
        }).catch(e => {
            console.log(JSON.stringify(e.response.data))
        })
    });
    it('should be able to get txn by customers on whole ledger', async () => {
        await getTransactionsByLedger({}).then(accountObj => {
            expect(accountObj).not.toBeUndefined()
            expect(accountObj.length).not.toBe(0)
        })
    });

});
