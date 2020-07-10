import {TransferVet} from '../model';
import {prepareVetSignedTransaction} from './vet';

describe('VET transactions', () => {
    it('should test valid transaction data with fee estimation', async () => {
        const body = new TransferVet();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        const txData = await prepareVetSignedTransaction(true, body);
        expect(txData).toContain('0x');
    });

    it('should test valid transaction data with custom fee', async () => {
        const body = new TransferVet();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.fee = {gasLimit: '21000'};
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        const txData = await prepareVetSignedTransaction(true, body);
        expect(txData).toContain('0x');
    });

    it('should not test valid transaction data, to private key assigned', async () => {
        const body = new TransferVet();
        body.amount = '0';
        body.fee = {gasLimit: '21000'};
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        try {
            await prepareVetSignedTransaction(true, body);
            fail('Validation did not pass.');
        } catch (e) {
            console.error(e);
        }
    });
});