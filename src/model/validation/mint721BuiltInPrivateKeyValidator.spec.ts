import { Currency } from '../request'
import { mintNFTWithUri } from '../../nft'

describe('Mint721BuiltInPrivateKeyValidator tests', () => {
    it('should test mint CELO with signature id', async () => {
        const txId = await mintNFTWithUri(true, {
            "chain": Currency.CELO,
            "to": "0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F",
            "url": "https://www.seznam.cz",
            "feeCurrency": Currency.CELO,
            "tokenId": "1",
            "signatureId": "e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad",
            "contractAddress": "0x45871ED5F15203C0ce791eFE5f4B5044833aE10e",
        })
        expect(txId).not.toBeNull()
    })

    it('should test mint CELO with private key', async () => {
        const txId = await mintNFTWithUri(true, {
            "chain": Currency.CELO,
            "to": "0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F",
            "url": "https://www.seznam.cz",
            "feeCurrency": Currency.CELO,
            "tokenId": "1",
            "fromPrivateKey": "89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d",
            "contractAddress": "0x45871ED5F15203C0ce791eFE5f4B5044833aE10e",
        })
        expect(txId).not.toBeNull()
    })

    it('should test mint CELO without private key or signature id', async () => {
        const txId = await mintNFTWithUri(true, {
            "chain": Currency.CELO,
            "to": "0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F",
            "url": "https://www.seznam.cz",
            "feeCurrency": Currency.CELO,
        })
        expect(txId).not.toBeNull()
    })

    it('should test mint TRON without private key or signature id', async () => {
        const t = async () => await mintNFTWithUri(true, {
            "chain": Currency.TRON,
            "to": "0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F",
            "url": "https://www.seznam.cz",
        })
        await expect(t()).rejects.toThrow()
    })

})