import {Currency} from '../model'
import {
    generateAlgoWallet
} from './wallet'

import {
    generateAddressFromXPub
} from './address'

describe('Algo Wallet tests', () => {
    it('should generate wallet for Algorand', async () => {
        const account = await generateAlgoWallet('artist alarm clerk obscure timber firm reopen provide ankle vicious exhibit waste math toilet believe puppy lucky coast post kind black suspect mule able market');
        expect(account.mnemonic).toBe('artist alarm clerk obscure timber firm reopen provide ankle vicious exhibit waste math toilet believe puppy lucky coast post kind black suspect mule able market')
        const address = await generateAddressFromXPub(
            Currency.ALGO,
            false,
            account.pub,
            0
        )
        expect(address).toBe('NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y');
    })
})