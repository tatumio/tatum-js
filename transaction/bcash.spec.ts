import {TransferBchBlockchain} from '../model';
import {prepareBitcoinCashSignedTransaction} from './bcash';

describe('BCH transactions', () => {
    it('should test BCH transaction data', async () => {
        const body = new TransferBchBlockchain();
        body.fromUTXO = [{
            txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
            index: 0,
            value: '0.0001',
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        }];
        body.to = [{
            address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
            value: 0.02969944
        }];
        const txData = await prepareBitcoinCashSignedTransaction(true, body);
        expect(txData).toBe('0200000001cc8f0fa58c9ae6954a1611abbd558eb5ae848c4e9a14f520157e21e803a1fa5300000000644149b200cc9f41c0247c0fe1bfa9668adbcd2edd5c04bda9446db16c34e4b6e6ed2f2c5d9db454343ce84797114779610642b03ac09cdf9754795c605ce24f4974412103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff0158512d00000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000');
    });

    it('should not test BCH transaction data, missing to', async () => {
        const body = new TransferBchBlockchain();
        body.fromUTXO = [{
            txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
            index: 0,
            value: '0.0001',
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        }];
        try {
            await prepareBitcoinCashSignedTransaction(true, body);
            fail('Validation did not pass.');
        } catch (e) {
            console.error(e);
        }
    });
});