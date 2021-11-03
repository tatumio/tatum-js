import {generatePrivateKeyFromMnemonic} from './address'
import {
    generateDogeWallet,
} from './wallet'

describe('Wallet tests', () => {

    it('should generate wallet for DOGE mainnet', async () => {
        const wallet = await generateDogeWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6EKTDXEVtTZR3sZoujGEnp9arodxCxHzTrN6G1PEFV7d8bt7CER3fLg8sz8G81LLAkz5C46FCtj4tppA7zd592gs4kCyKvqrMoQK6DQnD5r')
    })

    it('should generate wallet for DOGE testnet', async () => {
        const wallet = await generateDogeWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a')
    })

})
