import {
    generateQtumWallet,
} from './wallet'

describe('Wallet tests', () => {

    it('should generate wallet for QTUM testnet', async () => {
        const wallet = await generateQtumWallet(true, 'unable stone luggage syrup soul country hammer fee private coyote phrase brisk')
        expect(wallet.mnemonic).toBe('unable stone luggage syrup soul country hammer fee private coyote phrase brisk')
        expect(wallet.xpub).toBe('tpubDEPswwDHtxcS3q3K81iRgcxRKinjdEBM6dKer3HjeVPRgL44fFpJpttdDxQLLAxLoZLu69c6bMeyGqCPihUdCZedYu9vqah2gbP1wkLUvzB')
    })

})
