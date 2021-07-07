import { sendAdaOffchainTransaction } from './ada'

describe('ADA offchain', () => {
  it('should transaction with mnemonic and xpub', async () => {
    const tx = await sendAdaOffchainTransaction(true, {
      senderAccountId: '60ec1b6879cba0127ceb73ab',
      address: 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
      amount: '1',
      xpub: 'd817412f8a32f7a6eaec247dd624727f0cff6cfa72dcdeb58f8c27a0241a8297040513c3d1fcec4ecebae7a70471c52afd225e61ba926cc75ffc1c3aab649d9fb8927d7328a01d4d969ff419f55d372c2653dab0da0d91aae8be2f33acb569bf34ee70a6e93c4225488f40c2073268509f2336a6248c40335b3b66e255099244',
      mnemonic: 'chimney farm monster tail zero aerobic depend skin tiger dream camp ask crowd antique jar cousin general neutral license evil cram patch source sister',
    })
    expect(tx).not.toBeNull()
    expect(tx).toHaveProperty('txId');
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
});
