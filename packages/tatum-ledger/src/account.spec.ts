import { createAccount, freezeAccount, getAccountById, updateAccount } from './account'
import { Currency } from '@tatumio/tatum-core'

describe('Ledger accounts tests', () => {
  it('should test create of ledger account', async () => {
    const account = await createAccount({
      currency: Currency.BTC,
    })
    console.log(account)
    expect(account).not.toBeNull()
  })

  it('should test update of ledger account', async () => {
    const account = await updateAccount('603fa11157e40033fd59c715', {
      accountCode: '132',
    })
    console.log(account)
    expect(account).not.toBeNull()
  })

  it('should test freeze of ledger account', async () => {
    const account = await freezeAccount('603fa11157e40033fd59c715')
    console.log(account)
    expect(account).not.toBeNull()
  })

  it('should test get of ledger account', async () => {
    const account = await getAccountById('603fa11157e40033fd59c715')
    console.log(account)
    expect(account).not.toBeNull()
  })
})
