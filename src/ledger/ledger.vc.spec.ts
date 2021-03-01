import { Currency } from '../model/request/Currency';
import { Fiat } from '../model/response/ledger/Fiat';
import {
    createVirtualCurrency,
    getVirtualCurrencyByName,
    mintVirtualCurrency,
    revokeVirtualCurrency,
    updateVirtualCurrency
} from './index';
// import { updateVirtualCurrency } from './vc';

describe('LEDGER TESTS: Virtual Currency test suite', () => {
    // declaring global variables which have larger scope
    let id: string = '';
    it('should create a virtual currency', async () => {
    /*
        always returns error currency already registered
        returning error
        reached error state { message: 'Virtual currency with given name already exists.',
        errorCode: 'virtual.duplicate',
        statusCode: 403 }
    */
        await createVirtualCurrency({
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

        }).then(accountObj => {
            id = accountObj.id // saving id for further functions
            // console.log(accountObj) //printing the results
            expect(accountObj.active).toBe(true)
            expect(accountObj.currency).toBe('VC_JHGFRG')
            expect(accountObj.frozen).toBe(false)
            expect(accountObj.balance.accountBalance).toBe('1000000')
        }).catch(error => {
            // checking if currency already exists and proceeding
            console.log('reached error state', error.response.data)
            expect(error.response.data.errorCode).toBe('virtual.duplicate')
        })
    });
    it('should update virtual currency BaseRate', async () => {
        await updateVirtualCurrency({
            'name': 'VC_demoVC',
            'basePair': Currency.BTC,
            'baseRate': 0.5
        }).then(accountObj => {
            expect(accountObj).toBeUndefined()
        })
    });
    it('should return error in case of wrong name', async () => {
        await updateVirtualCurrency({
            'name': 'VC____demoVC',
            'basePair': Currency.BTC,
            'baseRate': 0.5
        }).catch(e => {
            expect(e.response.data.statusCode).toBe(403)
            expect(e.response.data.errorCode).toBe('vc.not.found')
        })
    });
    it('should return error in case of missing validations', async () => {
        await updateVirtualCurrency({
            'name': 'demoVC',
            'basePair': Currency.BTC,
            'baseRate': 0.5
        }).catch(e => {
            // checking negative test results
            expect(e.response.data.statusCode).toBe(400)
            expect(e.response.data.errorCode).toBe('validation.failed')
        })
    });
    it('should return VC by name', async () => {
        await getVirtualCurrencyByName('VC_demoVC').then(accountObj => {
            id = accountObj.accountId
            expect(accountObj.name).toBe('VC_demoVC')
            expect(accountObj.basePair).toBe('BTC')
        })
    });
    it('should return error if currency does not exists', async () => {
        await getVirtualCurrencyByName('VC_emoVC').catch(e => {
            expect(e.response.data.statusCode).toBe(403)
            expect(e.response.data.errorCode).toBe('vc.not.found')
        })
    });
    it('should mint new currency', async () => {
        await mintVirtualCurrency({
            'accountId': id,
            'amount': '1.5'
        }).then(accountObj => {
            expect(accountObj.reference).not.toBe(null)
        }).catch(e => {
            console.log(JSON.stringify(e.response.data))
        })
    });
    // revokeVirtualCurrency
    it('should destroy new created currency', async () => {
        await revokeVirtualCurrency({
            'accountId': id,
            'amount': '1.5'
        }).then(accountObj => {
            expect(accountObj.reference).not.toBe(null)
        }).catch(e => {
            console.log(JSON.stringify(e.response.data))
        })
    });


});