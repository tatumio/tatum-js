import { Currency } from '../model'
import { sendAdaOffchainTransaction, signAdaOffchainKMSTransaction } from './ada'

describe('ADA offchain', () => {
  it('should transaction with mnemonic and xpub', async () => {
    try {
    const tx = await sendAdaOffchainTransaction(true, {
      senderAccountId: '60ec1b6879cba0127ceb73ab',
      address: 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
      amount: '1',
      xpub: 'd817412f8a32f7a6eaec247dd624727f0cff6cfa72dcdeb58f8c27a0241a8297040513c3d1fcec4ecebae7a70471c52afd225e61ba926cc75ffc1c3aab649d9fb8927d7328a01d4d969ff419f55d372c2653dab0da0d91aae8be2f33acb569bf34ee70a6e93c4225488f40c2073268509f2336a6248c40335b3b66e255099244',
      mnemonic: 'chimney farm monster tail zero aerobic depend skin tiger dream camp ask crowd antique jar cousin general neutral license evil cram patch source sister',
    })
    expect(tx).not.toBeNull()
    expect(tx).toHaveProperty('txId');
    } catch (e) {
      console.log(e)
    }
  })

  it('should with keypair', async () => {
    const tx = await sendAdaOffchainTransaction(true, {
      keyPair: [
        {
          privateKey: '88e0687cf43333502b03eb27d857c413ac97305312d607b7599ab5a889007d55cb9693455af5f1813b9bd38f574dc6136181bf1781641c2525fd51556bfd1ac1df44389d8de89b9e74585c6d6d14b08922fcecd038f2def7e50f5488559be2abad9b25ef114471eab8f0f83cc7a2442665e2c453f01e9ec55ef07c1ebae98397',
          address: 'addr_test1qz9se7lx6rkctnpx8y3hm68lqmq58kq5dycumj9d6e5qgchat2zasvwcf2ws75fr33qdlxg8g305wn57hhkujrya4a5q0k60f0',
        },
      ],
      senderAccountId: '60ec1b6879cba0127ceb73ab',
      address: 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
      amount: '1',
    })
    expect(tx).not.toBeNull()
    expect(tx).toHaveProperty('txId');
  })

  it('should prepare KMS transaction', async () => {
    const transactionToBroadcast = signAdaOffchainKMSTransaction({
        chain: Currency.ADA,
        serializedTransaction: '{"txData":"164,0,129,130,88,32,135,245,171,214,120,8,28,197,190,143,106,122,2,39,142,167,183,52,228,45,118,43,204,87,229,100,107,81,0,226,10,166,1,1,130,130,88,57,0,7,67,209,108,254,60,79,204,12,17,194,64,59,188,16,219,199,236,221,68,119,224,83,72,26,54,142,122,6,226,174,68,223,246,119,13,192,244,173,163,207,76,242,96,80,8,226,122,236,219,51,42,211,73,253,167,26,0,15,66,64,130,88,57,0,70,32,41,225,187,111,84,234,23,75,7,140,7,187,225,172,48,2,183,112,119,48,48,161,199,144,51,43,253,90,133,216,49,216,74,157,15,81,35,140,64,223,153,7,68,95,71,78,158,189,237,201,12,157,175,104,26,58,227,175,0,2,26,0,15,66,64,3,26,1,240,139,75"}',
        hashes:
          [
            'b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0',
          ],
        id: '60f67210baf4120bb057c1ce',
        'withdrawalResponses': [
          {
            'vIn': '938445d67ba62a40cf70d960b53ed3a776c88b2d5933cb883a71d25bd0a29a1f',
            'vInIndex': 2,
            'amount': '1.00000000',
            'address': {
              'address': 'addr_test1qzc7rzfhklhfps8ckkzucgfhur3jv28yjy5250ymzmcvpqxxyaht2rjd4x058ma0uf7jlkfc3gn6p3lnmv6s4wxs79ds7vph3r',
              'xpub': '39706a094bceb30fa7db5da1080dbbc95d93f29bdf844f397f45e74255a0ebdac393c52b9d50d1c134afc5c6f79b1fbc1d96000bcf117794532f6455ed1039ce12916d5c663445f6f404fd41736bfbe722ef37df9f945b105ebbbd8b05c3654ea6112d2f04140fd44cf3a22fe98d8c236a9e36c15df46231709daa5d078d4542',
              'derivationKey': 1,
              'currency': 'ADA'
            }
          },
          {
            'vIn': '008f5d7e476fd0da5a0f5965de58eb5e35e54cad0f739eb0aed4bdb2306eb843',
            'vInIndex': 1,
            'amount': 5.00000000,
            'address': {
              'address': 'addr_test1qzc7rzfhklhfps8ckkzucgfhur3jv28yjy5250ymzmcvpqxxyaht2rjd4x058ma0uf7jlkfc3gn6p3lnmv6s4wxs79ds7vph3r',
              'xpub': '39706a094bceb30fa7db5da1080dbbc95d93f29bdf844f397f45e74255a0ebdac393c52b9d50d1c134afc5c6f79b1fbc1d96000bcf117794532f6455ed1039ce12916d5c663445f6f404fd41736bfbe722ef37df9f945b105ebbbd8b05c3654ea6112d2f04140fd44cf3a22fe98d8c236a9e36c15df46231709daa5d078d4542',
              'derivationKey': 1,
              'currency': 'ADA'
            }
          },
        ],

      }, 'chimney farm monster tail zero aerobic depend skin tiger dream camp ask crowd antique jar cousin general neutral license evil cram patch source sister',
      true)
    expect(transactionToBroadcast).not.toBeNull()
  })
});
