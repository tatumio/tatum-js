import { signAlgoTransaction } from './algo'
describe('Algo transaction', () => {
    jest.setTimeout(19999)
    it('should test signed transaction for Algo transfer', async () => {
        const txId = await signAlgoTransaction(
            true,
            'TMETT6BXL3QUH7AH5TS6IONU7LVTLKIGG54CFCNPMQXWGRIZFIESZBYWP4',
            'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y',
            10,
            BigInt(1000000),
            '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI'
        );
        expect(txId.length).toBe(52)
    })
})
