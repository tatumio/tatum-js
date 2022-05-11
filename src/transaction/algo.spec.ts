import { getAlgoClient, prepareAlgoCreateNFTSignedTransaction, sendAlgoSignedTransaction } from './algo'
import { AlgoTransaction, MintAlgoNft } from '../model';
import { Buffer } from 'buffer'

describe('Algo transaction', () => {
  jest.setTimeout(59999)
  it('should test signed transaction for Algo transfer', async () => {
    const tx = new AlgoTransaction();
    tx.from = 'TMETT6BXL3QUH7AH5TS6IONU7LVTLKIGG54CFCNPMQXWGRIZFIESZBYWP4';
    tx.to = 'NTAESFCB3WOD7SAOL42KSPVARLB3JFA3MNX3AESWHYVT2RMYDVZI6YLG4Y';
    tx.fee = '0.001';
    tx.amount = '1';
    tx.note = 'Helloworld';
    tx.fromPrivateKey = '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI';
    const txId = String(await sendAlgoSignedTransaction(true, tx));
    expect(txId.length).toBe(52);
  })
})

describe('Algo NFT transaction', () => {
  jest.setTimeout(59999)
  it('should test NFT create', async () => {
    const tx = new MintAlgoNft();
    tx.from = 'TMETT6BXL3QUH7AH5TS6IONU7LVTLKIGG54CFCNPMQXWGRIZFIESZBYWP4';
    tx.attr = {
      assetUnit: 'USDT',
      clawback: 'TMETT6BXL3QUH7AH5TS6IONU7LVTLKIGG54CFCNPMQXWGRIZFIESZBYWP4',
    }
    tx.name = 'Artwork@arc3';
    tx.url = 'https://tatum.io/images/logo.svg'
    tx.fromPrivateKey = '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI';
    const txData = await prepareAlgoCreateNFTSignedTransaction(true, tx, 'https://academy-algod.dev.aws.algodev.network')
    const client = await getAlgoClient(true, 'https://academy-algod.dev.aws.algodev.network')
    try {
      const { txId } = await client.sendRawTransaction(Buffer.from(txData, 'hex')).do()
      console.log(txId)
      expect(txId.length).toBe(52);
    } catch (e) {
      console.error(e)
      throw e
    }
  })
})

// describe('Algo FT transaction', () => {
//     jest.setTimeout(59999)
//     it('should test FT create', async () => {
//         const tx = new AlgoCreateFT();
//         tx.from = 'TMETT6BXL3QUH7AH5TS6IONU7LVTLKIGG54CFCNPMQXWGRIZFIESZBYWP4';
//         tx.total = 200;
//         tx.decimal = 2;
//         tx.defaultFrozen = false;
//         tx.uintName = 'ALICEART';
//         tx.assetName = 'Artwork@arc3';
//         tx.note = 'TestNFT';
//         tx.assetURL = 'https://tatum.io/images/logo.svg'
//         tx.fromPrivateKey = '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI';
//         const txId = String(await sendAlgoCreateFTSignedTransaction(true, tx));
//         expect(txId.length).toBe(52);
//     })
// })
