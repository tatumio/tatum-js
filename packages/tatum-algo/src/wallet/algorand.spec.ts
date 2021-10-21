import {generateAlgoWallet} from './wallet'
import {generateAlgoAddressFromPrivatetKey} from './address'

describe('Algo Wallet tests', () => {
    it('should generate wallet for Algorand', async () => {
        const account = await generateAlgoWallet('artist alarm clerk obscure timber firm reopen provide ankle vicious exhibit waste math toilet believe puppy lucky coast post kind black suspect mule able market');
        expect(account.privateKey).toBe('NBYMCVEEDFYV3TPWVRE6APE7PKHUJD4XAKXCKNCLKGUXOC3LFNJGZQCJCRA53HB7ZAHF6NFJH2QIVQ5USQNWG35QCJLD4KZ5IWMB24Q')
        const address = await generateAlgoAddressFromPrivatetKey(account.privateKey);
        expect(address).toBe('NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y');
    })
})