import {TransferDogeBlockchain} from '../model';
import {prepareDogecoinSignedTransaction} from './dogecoin';

describe('DOGE transactions', () => {
    it('should test DOGE transaction data', async () => {
        const body = new TransferDogeBlockchain();
        body.fromUTXO = [{
            txHash: 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5',
            index: 1,
            value: '60.0819',
            privateKey: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
        }];
        body.to = [{
            address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
            value: 58,
        }];
        try {
            const txData = await prepareDogecoinSignedTransaction(true, body);
            expect(txData).toBe('0200000001e579889f4d028fbe6cf9000273ba8c6dbd0c93248fc574377b4058bfbbdfb7ab010000006a473044022071744b5bda4d319c116b6258e2c643daed2cec4cb6986d03abfaec4aad97333002206fc4dc3ae56880d1c0704246cf776875d07fb667c0dcb427639d44032ce6eb8e012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff0100fab459010000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000');
        } catch (e) {
            console.error(e);
            fail();
        }
    });
});
