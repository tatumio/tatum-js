import {Currency} from '@tatumio/tatum-core'
import {generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address'
import {generateTronWallet} from './wallet'
// tslint:disable-next-line:no-var-requires
const TronWeb = require('tronweb')
describe('Address tests', () => {
    it('should generate address 1 for TRON mainnet', () => {
        const address = generateAddressFromXPub('0244b3f40c6e570ae0032f6d7be87737a6c4e5314a4a1a82e22d0460a0d0cd794936c61f0c80dc74ace4cd04690d4eeb1aa6555883be006e1748306faa7ed3a26a', 1)
        expect(address).toBe('TFFBpkRNro4Pe4154ayGWx7C6Ev7BvQZ6t')
    })

    it('should generate private key 1 for TRON mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.TRON, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('e75d702ce00987633f8009fbb1eabb5b187cb5b50fe9179a8d6cee6bab076b66')
    })

    it('should generate private key and address 1 for TRON mainnet', async () => {
        const wallet = await generateTronWallet('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        const address = await generateAddressFromXPub(wallet.xpub, 1)
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.TRON, false, wallet.mnemonic, 1)
        expect(address).toBe(TronWeb.address.fromPrivateKey(privateKey))
    })
})
