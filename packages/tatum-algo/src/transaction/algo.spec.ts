import { sendAlgoSignedTransaction } from './algo'
import { AlgoTransaction } from '../model';

describe('Algo transaction', () => {
    jest.setTimeout(59999)
    it('should test signed transaction for Algo transfer', async () => {
        const tx = new AlgoTransaction();
        tx.from     = 'TMETT6BXL3QUH7AH5TS6IONU7LVTLKIGG54CFCNPMQXWGRIZFIESZBYWP4';
        tx.to       = 'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y';
        tx.fee      = '0.001';
        tx.amount   = '1';
        tx.note     = 'Helloworld';
        tx.fromPrivateKey = '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI';
        const txId = String(await sendAlgoSignedTransaction(true,tx, 'https://testnet-algorand.api.purestake.io/ps2'));
        expect(txId.length).toBe(52);
    })
})
