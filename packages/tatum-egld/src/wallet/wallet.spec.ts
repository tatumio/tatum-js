import {generateEgldWallet} from './wallet'

describe('Wallet tests', () => {

    it('should generate wallet for EGLD', async () => {
        const wallet = await generateEgldWallet('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
    })

})
