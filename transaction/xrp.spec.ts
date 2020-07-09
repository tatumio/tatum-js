import * as blockchain from '../blockchain';
import {TransferXrp} from '../model';
import {prepareXrpSignedTransaction} from './xrp';

jest.mock('../blockchain');

describe('XRP transactions', () => {
    it('should test XRP transaction data', async () => {
        jest.spyOn(blockchain, 'xrpGetAccountInfo').mockResolvedValue({
            ledger_current_index: 1,
            account_data: {Sequence: 123}
        });
        const body = new TransferXrp();
        body.fromSecret = 'shunwft7BwrFHdcXmAA87CazLsRMY';
        body.fromAccount = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N';
        body.fee = '0.00001';
        body.amount = '1';
        body.to = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N';
        const txData = await prepareXrpSignedTransaction(body);
        expect(txData).toContain('1200002280000000240000007B201B000000066140000000000F424068400000000000000A732102A6736884D857E721F19B91226FBA68D638009FA44B14CD46C63CC30253C8715C74473045022100F57CE43BE920FCE2DD5B8E03F1A64A9F6E46D68A37EE13BDE0B193E12635DF94022018740EED96BB501ACC1090AD722CED4C38E388DF1705EDC5A47558F59C7343D88114C8A4688E754167637D0E2C00F14C7E15AAFDA42C8314C8A4688E754167637D0E2C00F14C7E15AAFDA42C');
    });

    it('should not test XRP transaction data, missing amount', async () => {
        jest.spyOn(blockchain, 'xrpGetAccountInfo').mockResolvedValue({
            ledger_current_index: 1,
            account_data: {Sequence: 123}
        });
        const body = new TransferXrp();
        body.fromSecret = 'shunwft7BwrFHdcXmAA87CazLsRMY';
        body.fee = '100';
        body.fromAccount = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N';
        body.to = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N';
        try {
            await prepareXrpSignedTransaction(body);
            fail('Validation did not pass.');
        } catch (e) {
            console.error(e);
        }
    });
});