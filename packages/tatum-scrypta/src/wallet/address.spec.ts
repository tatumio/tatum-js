import { Currency } from '@tatumio/tatum-core'
import {generateAddressFromPrivatekey} from './address'

describe('Address tests', () => {
    it('should generate an address from a mainnet LYRA private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.LYRA, false, 'SqhJUqY2quSoBBittiKB6U9kSeUccGTBGHsj2jQuh3Uk7AH9H5u7')
        expect(address).toBe('LNrkvwa8RGCyaeh733K4p7hnFm4p5NWDkq')
    })

    it.skip('should generate an address from a testnet LYRA private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.LTC, true, 'Snb6yv7H3YJ5jzbHZNFRTj3YQ1a6GjDFwPxuPbFEhUg6eniQyopJ')
        expect(address).toBe('tJJKy2c3mqXjpWDKdBADQJY6p5pBr5qvpn')
    })
})
