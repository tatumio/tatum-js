import { Currency } from '@tatumio/tatum-core'
import { generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic } from './address'
// tslint:disable-next-line:no-var-requires
const TronWeb = require('tronweb')
describe('Address tests', () => {
    it('should generate address 1 for BTC testnet', () => {
        const address = generateAddressFromXPub(Currency.BTC, true, 'tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a', 1)
        expect(address).toBe('mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5')
    })
    it('should generate private key 1 for BTC mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BTC, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('KwrYonf8pFfyQR87NTn124Ep9zoJsZMBCoVUi7mjMc1eTHDyLyBN')
    })

    it('should generate private key 1 for BTC testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BTC, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV')
    })
    it('should generate an address from a mainnet BTC private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.BTC, false, 'KwREvx76g7QAp5dow1ab2Mg8K6Ta4SH5kR5ASjhwoDcNj2bPvgG3')
        expect(address).toBe('18w9N93bAn13wDnEXFKLGTGeYN9CQoJAqV')
    })

    it('should generate an address from a testnet BTC private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.BTC, true, 'cNvyq4JM4DnPyXNNkkxf47baCuyVesCrw5AtkALKy7ELTrBLrGBK')
        expect(address).toBe('n4EUn9z1zXK1824mTHj9hEV91L3KdNPnpY')
    })
})
