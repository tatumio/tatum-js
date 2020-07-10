import * as blockchain from '../blockchain';
import {TransferXlm} from '../model';
import {prepareXlmSignedTransaction} from './xlm';

jest.mock('../blockchain');

describe('XLM transactions', () => {
    it('should test XLM transaction data', async () => {
        jest.spyOn(blockchain, 'xlmGetAccountInfo').mockResolvedValue({sequence: '123'});
        const body = new TransferXlm();
        body.fromSecret = 'SCFCTIS5326CRI3XFFBEWGXFWZK3HTUFI2AOI5IJUZAX2W5KM2PXIFIQ';
        body.amount = '1';
        body.to = 'GB4HCKVMM6SVPVSO7SFYS7DUU2C5KESP3ZOVGOHG32MLC7T4B6G4ZBLO';
        const txData = await prepareXlmSignedTransaction(true, body);
        expect(txData).toContain('AAAAAgAAAAA0EqaLPO0bvBPvzGz4wucBtxmNXs');
    });

    it('should not test XLM transaction data, missing amount', async () => {
        jest.spyOn(blockchain, 'xlmGetAccountInfo').mockResolvedValue({sequence: '123'});
        const body = new TransferXlm();
        body.fromSecret = 'SCFCTIS5326CRI3XFFBEWGXFWZK3HTUFI2AOI5IJUZAX2W5KM2PXIFIQ';
        body.to = 'GB4HCKVMM6SVPVSO7SFYS7DUU2C5KESP3ZOVGOHG32MLC7T4B6G4ZBLO';
        try {
            await prepareXlmSignedTransaction(true, body);
            fail('Validation did not pass.');
        } catch (e) {
            console.error(e);
        }
    });
});