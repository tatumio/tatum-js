import {TransferTron} from '../model';
import {prepareTronSignedTransaction} from './tron';

describe('Tron transactions', () => {
    it('should test valid transaction data', async () => {
        // const body = new TransferTron();
        // body.fromPrivateKey = 'BAB093C310CD3CCE98D873A5AAA41540FF9028780548D55A34A3E51F637D3123'; // address TJtK8wLAEdJqcfHhk8MhuhpwQqfdTwLqVZ
        // body.amount = '100';
        // body.to = 'TFnpwE8jCgtq3QpAhFfF2QpXzdBGmKvKMe';
        // const txData = await prepareTronSignedTransaction(true, body);
        // expect(txData).toContain('0x');
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
