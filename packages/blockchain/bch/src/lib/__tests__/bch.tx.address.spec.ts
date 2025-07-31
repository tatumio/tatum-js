import { TatumBchSDK } from '../bch.sdk';
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { REPLACE_ME_WITH_TATUM_TESTNET_API_KEY } from '@tatumio/shared-testing-common'

describe.skip('BchSDK - tx - address format', () => {
  it.skip('prepare tx for different address formats', async function () {
    const bchSDK = TatumBchSDK({
      apiKey: REPLACE_ME_WITH_TATUM_TESTNET_API_KEY,
    })
    const args = { testnet: true }

    const fromUTXO = [
      {
        txHash: '867f2474e7a21ded94d298861d6b46d44940222f763e827bfe6217206443c3dd',
        index: 0,
        privateKey: 'cV9PPpXgnxsfocuFaVMZ7nx8zEHPz3GkSicpW4SgDWrT57rynpB8',
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

  it('invalid private key', async () => {
    const bchSDK = TatumBchSDK({
      apiKey: REPLACE_ME_WITH_TATUM_TESTNET_API_KEY,
    })
    const args = { testnet: true }
    const VALUE = 0.000015
    const FEE = '0.00001'

    await expect(
      bchSDK.transaction.prepareSignedTransaction(
        {
          fromUTXO: [
            {
              txHash: '867f2474e7a21ded94d298861d6b46d44940222f763e827bfe6217206443c3dd',
              index: 0,
              privateKey: 'cVfQ1dCkyFyFUA9hq6Ye5QDETS7YTiLkuVCC7WdrnH6c8RAJaoeF',
            },
          ],
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
      ),
    ).rejects.toThrow(SdkErrorCode.BTC_BASED_WRONG_PRIVATE_KEY)
  })
})
