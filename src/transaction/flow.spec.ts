import {Currency, TransferFlow} from '../model';
import {flowAddPublicKeyToAccount, flowCreateAccountFromPublicKey, flowSendTransaction} from './flow';

describe('Flow tests', () => {

    jest.setTimeout(99999);

    it('should create account from public key', async () => {
        const result = await flowCreateAccountFromPublicKey(true, '968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90', '0x955cd3f17b2fd8ad', '37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8');
        console.log(result);
        expect(result.address).toBeDefined();
        expect(result.txId).toBeDefined();
    });

    it('should add public key to account', async () => {
        const result = await flowAddPublicKeyToAccount(true, '968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90', '0x955cd3f17b2fd8ad', '37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8');
        console.log(result);
        expect(result.address).toBe('0x955cd3f17b2fd8ad');
        expect(result.txId).toBeDefined();
    });

    it('should send FLOW transaction', async () => {
        const body = new TransferFlow();
        body.to = '0x21cbd745a4df66f1';
        body.amount = '1';
        body.fromAccount = '0x955cd3f17b2fd8ad';
        body.fromSecret = '37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8';
        body.currency = Currency.FLOW;
        const result = await flowSendTransaction(true, body);
        expect(result.txId).toBeDefined();
    });
});
