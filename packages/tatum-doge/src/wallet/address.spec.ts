import {Currency} from '@tatumio/tatum-core'
import {generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address'

describe('Address tests', () => {

    it('should generate address 1 for DOGE mainnet', () => {
        const address = generateAddressFromXPub(Currency.DOGE, false, 'xpub6EKTDXEVtTZR3sZoujGEnp9arodxCxHzTrN6G1PEFV7d8bt7CER3fLg8sz8G81LLAkz5C46FCtj4tppA7zd592gs4kCyKvqrMoQK6DQnD5r', 1)
        expect(address).toBe('DJKAJhzMzvCezBjfAzdSKrTykbQB5kNCgv')
    })

    it('should generate address 1 for DOGE testnet', () => {
        const address = generateAddressFromXPub(Currency.DOGE, true, 'tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a', 1)
        expect(address).toBe('nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W')
    })

    it('should generate private key 1 for DOGE mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.DOGE, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('QTWSvxHz3FgohMiqfjfZpctvodANr7eQcpjuvdXtw6QRgxFL1PzK')
    })

    it('should generate private key 1 for DOGE testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.DOGE, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1')
    })

})
