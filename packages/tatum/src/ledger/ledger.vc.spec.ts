import { Currency, Fiat } from '@tatumio/tatum-core'
import { createVirtualCurrency, getVirtualCurrencyByName, mintVirtualCurrency, revokeVirtualCurrency, updateVirtualCurrency } from './index'
// import { updateVirtualCurrency } from './vc';

describe('LEDGER TESTS: Virtual Currency test suite', () => {
  // declaring global variables which have larger scope
  let id = ''
  it('should create a virtual currency', async () => {
    /*
        always returns error currency already registered
        returning error
        reached error state { message: 'Virtual currency with given name already exists.',
        errorCode: 'virtual.duplicate',
        statusCode: 403 }
    */
    try {
      const accountObj = await createVirtualCurrency({
        name: 'VC_demoVC',
        supply: '1000000',
        basePair: Currency.BTC,
        baseRate: 1,
        customer: {
          accountingCurrency: Fiat.USD,
          externalId: '12',
        },
        description: 'My Virtual Token description.',
        accountCode: 'AC_102131_B',
      })
      id = accountObj.id // saving id for further functions
      // console.log(accountObj) //printing the results
      expect(accountObj.active).toBe(true)
      expect(accountObj.currency).toBe('VC_JHGFRG')
      expect(accountObj.frozen).toBe(false)
      expect(accountObj.balance.accountBalance).toBe('1000000')
    } catch (error: any) {
      // checking if currency already exists and proceeding
      console.log('reached error state', error.response.data)
      expect(error.response.data.errorCode).toBe('virtual.duplicate')
    }
  })
  it('should update virtual currency BaseRate', async () => {
    const accountObj = await updateVirtualCurrency({
      name: 'VC_demoVC',
      basePair: Currency.BTC,
      baseRate: 0.5,
    })
    expect(accountObj).toBeUndefined()
  })
  it('should return error in case of wrong name', async () => {
    try {
      const accountObj = await updateVirtualCurrency({
        name: 'VC____demoVC',
        basePair: Currency.BTC,
        baseRate: 0.5,
      })
      console.log(accountObj)
    } catch (e: any) {
      expect(e.response.data.statusCode).toBe(403)
      expect(e.response.data.errorCode).toBe('vc.not.found')
    }
  })
  it('should return error in case of missing validations', async () => {
    try {
      const accountObj = await updateVirtualCurrency({
        name: 'demoVC',
        basePair: Currency.BTC,
        baseRate: 0.5,
      })
      console.log(accountObj)
    } catch (e: any) {
      // checking negative test results
      expect(e.response.data.statusCode).toBe(400)
      expect(e.response.data.errorCode).toBe('validation.failed')
    }
  })
  it('should return VC by name', async () => {
    const accountObj = await getVirtualCurrencyByName('VC_demoVC')
    id = accountObj.accountId
    expect(accountObj.name).toBe('VC_demoVC')
    expect(accountObj.basePair).toBe('BTC')
  })
  it('should return error if currency does not exists', async () => {
    try {
      await getVirtualCurrencyByName('VC_emoVC')
    } catch (e: any) {
      expect(e.response.data.statusCode).toBe(403)
      expect(e.response.data.errorCode).toBe('vc.not.found')
    }
  })
  it('should mint new currency', async () => {
    try {
      const accountObj = await mintVirtualCurrency({
        accountId: id,
        amount: '1.5',
      })
      expect(accountObj.reference).not.toBe(null)
    } catch (e: any) {
      console.log(JSON.stringify(e.response.data))
    }
  })
  // revokeVirtualCurrency
  it('should destroy new created currency', async () => {
    try {
      const accountObj = await revokeVirtualCurrency({
        accountId: id,
        amount: '1.5',
      })
      expect(accountObj.reference).not.toBe(null)
    } catch (e: any) {
      console.log(JSON.stringify(e.response.data))
    }
  })
})
