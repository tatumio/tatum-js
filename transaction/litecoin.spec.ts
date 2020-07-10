import {TransferBtcBasedBlockchain} from '../model';
import {prepareLitecoinSignedTransaction} from './bitcoin';

describe('LTC transactions', () => {
    it('should test LTC transaction data', async () => {
        const body = new TransferBtcBasedBlockchain();
        body.fromUTXO = [{
            txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
            index: 0,
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        }];
        body.to = [{
            address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
            value: 0.02969944
        }];
        const txData = await prepareLitecoinSignedTransaction(true, body);
        expect(txData).toBe('0200000001cc8f0fa58c9ae6954a1611abbd558eb5ae848c4e9a14f520157e21e803a1fa53000000006a473044022030aeec05dc9bfefe5e3c1d6d4ea7945c9648f20bede1c854c9cc018cc9e4d771022048c64fb22ae3208a9ba9418aed392bbc4aab28f0e333b3c8fab042da88d357f5012103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff0158512d00000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000');
    });

    it('should not test LTC transaction data, fromAddress and fromUTXO present at the same time', async () => {
        const body = new TransferBtcBasedBlockchain();
        body.fromUTXO = [{
            txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
            index: 0,
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        }];
        body.fromAddress = [{
            address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
            privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        }];
        body.to = [{
            address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
            value: 0.02969944
        }];
        try {
            await prepareLitecoinSignedTransaction(true, body);
            fail('Validation did not pass.');
        } catch (e) {
            console.error(e);
        }
    });
});