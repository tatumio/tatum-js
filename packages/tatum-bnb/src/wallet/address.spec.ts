import { Currency } from "@tatumio/tatum-core"
import { generateBnbWallet, generateAddressFromPrivatekey } from "src"

describe('Address tests', () => {
    it('should generate address from private key for BNB testnet', async () => {
        const {address, privateKey} = await generateBnbWallet(true)
        expect(address).toBe(await generateAddressFromPrivatekey(Currency.BNB, true, privateKey))
    })
})
