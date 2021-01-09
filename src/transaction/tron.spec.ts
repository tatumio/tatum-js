import {TransferTron} from '../model';
import {prepareTronSignedTransaction} from './tron';

describe('Tron transactions', () => {
    it('should test valid transaction data', async () => {
        const body = new TransferTron();
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
        body.amount = '0.000001';
        body.to = 'TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW';
        const txData = await prepareTronSignedTransaction(true, body);
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.amount).toBe(1);
    });

    it('should not test valid transaction data, to private key assigned', async () => {
        const body = new TransferTron();
        body.amount = '0';
        body.amount = '100';
        body.to = 'TFnpwE8jCgtq3QpAhFfF2QpXzdBGmKvKMe';
        try {
            await prepareTronSignedTransaction(true, body);
            fail('Validation did not pass.');
        } catch (e) {
            console.error(e);
        }
    });
});
