import { sendBscOffchainTransaction } from './bsc'

describe('BSC offchain', () => {
    it('should test custom gas sendBscOffchainTransaction transaction', async () => {
        const tx = await sendBscOffchainTransaction(true, {
            senderAccountId: '612e0eb784c139b378c5ca18',
            address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
            amount: '0.1',
            gasPrice: '200',
            gasLimit: '60000',
            signatureId: '695a3b3e-649f-4e5b-9524-c388c4f45230',
        })
        console.log(tx)
        expect(tx).not.toBeNull()
    })
})
