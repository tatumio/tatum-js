/**
 * Importing all the functions from ledger,
 * Starting with accounts the following script will go step by step to test the complete functionality
 * of the ledger
 */
import {
  blockAmount,
  createAccount,
  createAccounts,
  deleteBlockedAmount,
  getAccountById,
  getBlockedAmountsByAccountId,
  updateAccount,
} from './index'

describe('LEDGER TESTS: Account test suite', () => {
  // declaring global variables which have larger scope
  let id = ''
  let blockID = ''
  const accountCode = '03_ACC_01' // random account code
  const accountNumber = '12345' // random account number

  it('should create a new account', async () => {
    await createAccount({ currency: 'BTC', accountNumber: accountNumber, accountCode: accountCode }).then((accountObj) => {
      id = accountObj.id // saving id for further functions
      expect(accountObj.active).toBe(true)
      expect(accountObj.currency).toBe('BTC')
      expect(accountObj.frozen).toBe(false)
    })
  })
  it('should get the account details via id', async () => {
    await getAccountById(id).then((fetchAccount) => {
      console.log(fetchAccount) // printing the results
      expect(fetchAccount.active).toBe(true)
      expect(fetchAccount.accountCode).toBe(accountCode)
    })
  })
  it('should update the account', async () => {
    await updateAccount(id, { accountCode: accountCode, accountNumber: accountNumber }).then((fetchAccount) => {
      console.log('updateObj', fetchAccount) // printing the results
    })
  })

  it('should create multiple new accounts', async () => {
    const accountsObj = await createAccounts({
      accounts: [
        { currency: 'BTC', accountNumber: '123', accountCode: accountCode },
        { currency: 'BTC', accountNumber: '456', accountCode: accountCode },
      ],
    })
    console.log(accountsObj)
    expect(accountsObj.length).toBe(2)
    accountsObj.forEach((o) => {
      expect(o.active).toBe(true) // checking a condition for a specific key in each element
    })
  })
  it('should get the blocked amounts via id', async () => {
    const fetchAccount = await getBlockedAmountsByAccountId(id)
    expect(fetchAccount.length).toBe(0) // block amounts should be zero in a new account
  })
  it('should block amount for an account', async () => {
    const fetchAccount = await blockAmount(id, { amount: '50000', type: 'DEBIT_CARD_OP', description: 'Card payment in the shop.' })
    blockID = fetchAccount.id
    expect(fetchAccount.id).not.toBe(null) // returns id of the block amt
  })
  it('should delete block amount for an account', async () => {
    const fetchedAccount = await deleteBlockedAmount(blockID)
    expect(fetchedAccount).toBeUndefined() // deletes the blocked amount
  })
  it('should return empty list again', async () => {
    const fetchAccount = await getBlockedAmountsByAccountId(id)
    expect(fetchAccount.length).toBe(0) // block amounts should be zero again as delete is called
  })
})
