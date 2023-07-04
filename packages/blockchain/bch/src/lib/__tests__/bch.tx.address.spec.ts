import { TatumBchSDK } from '@tatumio/bch'

describe('BchSDK - tx - address format', () => {
  it('prepare tx for different address formats', async function () {
    const bchSDK = TatumBchSDK({
      apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab',
    })
    const args = { testnet: true }

    const fromUTXO = [
      {
        txHash: '867f2474e7a21ded94d298861d6b46d44940222f763e827bfe6217206443c3dd',
        index: 0,
        privateKey: 'cVfQ1dCkyFyFUA9hq6Ye5QDETS7YTiLkuVCC7WdrnH6c8RAJaoeF',
      },
    ]

    const VALUE = 0.000015
    const FEE = '0.00001'

    const txCashAddrPrefix = await bchSDK.transaction.prepareSignedTransaction(
      {
        fromUTXO,
        to: [
          {
            address: 'bchtest:qr5etpgkh96aflvmcmpkppa4vr3tex7a7ggncvlknk',
            value: VALUE,
          },
        ],
        changeAddress: 'bchtest:qr8uq9zax5uh68k7rffuq4cuefrmy8msav8yq4z4yr',
        fee: FEE,
      },
      args,
    )

    const txCashAddr = await bchSDK.transaction.prepareSignedTransaction(
      {
        fromUTXO,
        to: [
          {
            address: 'qr5etpgkh96aflvmcmpkppa4vr3tex7a7ggncvlknk',
            value: VALUE,
          },
        ],
        changeAddress: 'qr8uq9zax5uh68k7rffuq4cuefrmy8msav8yq4z4yr',
        fee: FEE,
      },
      args,
    )

    const txLegacy = await bchSDK.transaction.prepareSignedTransaction(
      {
        fromUTXO,
        to: [
          {
            address: 'n2p2raEPCPd77nAiw3Ck1SCsfhMjHu1xav',
            value: VALUE,
          },
        ],
        changeAddress: 'mzTSGgcf4kxz8Aj3nyeFkniv5CqC8DiEsL',
        fee: FEE,
      },
      args,
    )
    expect(txCashAddrPrefix).toBe(txCashAddr)
    expect(txCashAddr).toBe(txLegacy)
  })
})
