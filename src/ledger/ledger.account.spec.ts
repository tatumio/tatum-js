/**
 * Importing all the functions from ledger,
 * Starting with accounts the following script will go step by step to test the complete functionality
 * of the ledger
 */
import {
    getAccountById,
    createAccount,
    updateAccount,
    createAccounts,
    getBlockedAmountsByAccountId,
    blockAmount,
    deleteBlockedAmount
} from './index';

describe('Ledger tests', () => {
    // declaring global variables which have larger scope 
    var id: string = "";
    var blockID: string = "";
    var accountCode:string="03_ACC_01"; //random account code
    var accountNumber:string="12345" // random account number
    
    it('should create a new account', async () => {
        const accountObj = await createAccount({"currency": "BTC","accountNumber": accountNumber,"accountCode": accountCode,})
        id=accountObj.id // saving id for further functions
        console.log(accountObj) //printing the results
        expect(accountObj.active).toBe(true)
        expect(accountObj.currency).toBe("BTC")
        expect(accountObj.frozen).toBe(false)
    });
    it('should get the account details via id', async () => {
        const fetchAccount = await getAccountById(id)
        console.log(fetchAccount)  // printing the results
        expect(fetchAccount.active).toBe(true)    
        expect(fetchAccount.accountCode).toBe(accountCode)    
    });
    it('should update the account', async () => {
        const fetchAccount = await updateAccount(id,({"accountCode":accountCode,"accountNumber":accountNumber}))
        console.log("updateObj",fetchAccount)  // printing the results
    });
    it('should create multiple new accounts', async () => {
        const accountsObj = await createAccounts({ "accounts": [{ "currency": "BTC", "accountNumber": "123", "accountCode": accountCode }, { "currency": "BTC", "accountNumber": "456", "accountCode": accountCode }]})
        console.log(accountsObj)
        expect(accountsObj.length).toBe(2)
        accountsObj.forEach((o)=>{
            expect(o.active).toBe(true) // checking a condition for a specific key in each element
        })        
    });
    it('should get the blocked amounts via id', async () => {
        const fetchAccount = await getBlockedAmountsByAccountId(id)
        expect(fetchAccount.length).toBe(0)  // block amounts should be zero in a new account
    });
    it('should block amount for an account', async () => {
        const fetchAccount = await blockAmount(id,{"amount": "50000","type": "DEBIT_CARD_OP","description": "Card payment in the shop."})
        blockID=fetchAccount.id
        console.log(blockID)
        expect(fetchAccount.id).not.toBe(null)  // returns id of the block amt
    });
    it('should delete block amount for an account', async () => {
        const fetchAccount = await deleteBlockedAmount(blockID) // deletes the blocked amount
        console.log(blockID)
    });
    it('should return empty list again', async () => {
        const fetchAccount = await getBlockedAmountsByAccountId(id)
        expect(fetchAccount.length).toBe(0)  // block amounts should be zero again as delete is called
        console.log(fetchAccount)
    });
});
