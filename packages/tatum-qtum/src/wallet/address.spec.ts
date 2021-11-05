import {Currency} from '@tatumio/tatum-core'
import {generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address'

describe('Address tests', () => {

    it('should generate private key for QTUM testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.QTUM, true, 'unable stone luggage syrup soul country hammer fee private coyote phrase brisk', 1)
        expect(privateKey).toBe('cPtkzH8zCxWgyaqMiLJ7sJmZBgmLUb2kBMBrWzhKP9BVUHJfbg5w')
    })
    it('should generate address from private key for QTUM testnet', async () => {
        const address = await generateAddressFromPrivatekey(Currency.QTUM, true, 'cNR1n1EuzzaWHD7xcmAo71mwxyVV3uJUbLoamQFiXzaJhjTfCF2P')
        expect(address).toBe('qWpEineYmtc2Ea25GqDYhvuzCjTiu5hMYA')
    })
    it('should generate address from XPub for QTUM testnet', async () => {
        const address = await generateAddressFromXPub(Currency.QTUM, true, 'tpubDEPswwDHtxcS3q3K81iRgcxRKinjdEBM6dKer3HjeVPRgL44fFpJpttdDxQLLAxLoZLu69c6bMeyGqCPihUdCZedYu9vqah2gbP1wkLUvzB', 1)
        console.log(address)
        expect(address).toBe('qZ4oBnNAyQBEsy5G7VRUCJXZsiQKkTU3KL')
    })

})
