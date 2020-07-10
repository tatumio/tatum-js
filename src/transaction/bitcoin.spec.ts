import {TransferBtcBasedBlockchain} from '../model';
import {prepareBitcoinSignedTransaction} from './bitcoin';

describe('BTC transactions', () => {
    it('should test BTC transaction data', async () => {
        const body = new TransferBtcBasedBlockchain();
        body.fromUTXO = [{
            txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
            index: 0,
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        }];
        body.to = [{
            address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
            value: 0.02969944
        }];
        const txData = await prepareBitcoinSignedTransaction(true, body);
        expect(txData).toBe('0200000001cc8f0fa58c9ae6954a1611abbd558eb5ae848c4e9a14f520157e21e803a1fa53000000006a47304402205e49848369acc41719b669dcc9ba486c570f1ca4974f61a4321329fe35e3ff36022007485588ede47e17db992ba41aef35c72cb292f9889d471f2c592fb7f252672e012103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff0158512d000000000017a9144e1e4321307c88ecd4ddd6aeec040c6f01e53c998700000000');
    });

    it('should not test BTC transaction data, fromAddress and fromUTXO present at the same time', async () => {
        const body = new TransferBtcBasedBlockchain();
        body.fromUTXO = [{
            txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
            index: 0,
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        }];
        body.fromAddress = [{
            address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        }];
        body.to = [{
            address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
            value: 0.02969944
        }];
        try {
            await prepareBitcoinSignedTransaction(true, body);
            fail('Validation did not pass.');
        } catch (e) {
            console.error(e);
        }
    });
});