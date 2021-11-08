import {Currency} from '@tatumio/tatum-core'
import {generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address'
describe('Address tests', () => {

    it('should generate private key 1 for EGLD mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.EGLD, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('3ae733827921c526de0f497ccad602b58b287e33611a66ebdc7b13104b021282')
    })

    it('should generate an address from a mainnet EGLD private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.EGLD, false, '3ae733827921c526de0f497ccad602b58b287e33611a66ebdc7b13104b021282')
        expect(address.length).toBe(62)
        expect(address).toBe('erd1v4jp3x4ykjqphfy53w8aw7r30gqc74qv9extcr50am3qqn5y9zqsxef44a')
    })

    it('should generate address for EGLD mainnet index 1', async () => {
        const address = await generateAddressFromXPub(Currency.EGLD, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        // console.log(address, address.length)
        expect(address.length).toBe(62)
        expect(address).toBe('erd1v4jp3x4ykjqphfy53w8aw7r30gqc74qv9extcr50am3qqn5y9zqsxef44a')
    })

    it('should generate address for EGLD mainnet index 0', async () => {
        const address = await generateAddressFromXPub(Currency.EGLD, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 0)
        // console.log(address, address.length)
        expect(address.length).toBe(62)
        expect(address).not.toBe('erd1v4jp3x4ykjqphfy53w8aw7r30gqc74qv9extcr50am3qqn5y9zqsxef44a')
    })

    it('should generate private key for EGLD testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.EGLD, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 0)
        expect(privateKey).toBe('9bfb8dacf1d625acea5805b5306f0ba26d42bc1eb114ce00fec57fc638c2bfb5')
    })

    it('should generate an address from a testnet EGLD private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.EGLD, true, '9bfb8dacf1d625acea5805b5306f0ba26d42bc1eb114ce00fec57fc638c2bfb5')
        expect(address.length).toBe(62)
        expect(address).toBe('erd10j7rvtrpejsquz98ccrcysp7g44r0fpk0w3uey40v9wf3yfdztcqahhvz9')
    })

    it('should generate address for EGLD testnet index 0', async () => {
        const address = await generateAddressFromXPub(Currency.EGLD, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 0)
        // console.log(address, address.length)
        expect(address.length).toBe(62)
        expect(address).toBe('erd10j7rvtrpejsquz98ccrcysp7g44r0fpk0w3uey40v9wf3yfdztcqahhvz9')
    })

    it('should generate address for EGLD testnet index 1', async () => {
        const address = await generateAddressFromXPub(Currency.EGLD, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        // console.log(address, address.length)
        expect(address.length).toBe(62)
        expect(address).not.toBe('erd10j7rvtrpejsquz98ccrcysp7g44r0fpk0w3uey40v9wf3yfdztcqahhvz9')
    })
})
