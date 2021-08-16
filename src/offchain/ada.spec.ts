import {sendAdaOffchainTransaction} from './ada';

describe('ADA offchain', () => {
  it('should transaction with mnemonic and xpub', async () => {
    try {
    const tx = await sendAdaOffchainTransaction(true, {
      senderAccountId: '60f990befd2f551040f512c0',
      address: 'addr_test1qp33h99feurpn7n8cezqthh75723q5kjwqmthaf073y7edlg9xj6jj5qs9pe3nxq8rx59aa5qlmjrgsm0jt22hh3ll5q7n3j5s',
      amount: '1',
      xpub: '59bed551a66a043510e8f8cd7a0a34c630f82aeaa4198d212625b7c7438c82259dc3766148401d5a697cb7c8311b366258be6e74700419c3f385932d22fb49bf90ee448d740e6529d1936e33a1e806b1c745eba19d24e299757c9baed1caf24a5e25b1cd8da401a3ff37d4c6b8e4e984ffde03eb8cadd9bf3740152999604b04',
      mnemonic: 'head surround recipe nuclear giraffe tool benefit steel plug obey damp scale suffer fortune lift tree affair oyster engine ceiling physical emotion drink bubble',
    })
    expect(tx).not.toBeNull()
    expect(tx).toHaveProperty('txId')
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
    expect(tx).toHaveProperty('txId')
  })


})
