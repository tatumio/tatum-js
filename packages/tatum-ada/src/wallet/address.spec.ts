import {Currency} from '@tatumio/tatum-core'
import {generatePrivateKeyFromMnemonic} from './address'
import {generateWallet} from './wallet'
describe('Address tests', () => {
    it('should generate address from private key for ADA testnet', async () => {
        const {mnemonic, xpub} = await generateWallet(Currency.ADA, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(xpub).not.toBeNull()
        expect(mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
    })
    
    it('should generate private key 1 for ADA', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.ADA, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
    })
})
