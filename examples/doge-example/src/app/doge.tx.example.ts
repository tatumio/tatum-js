import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { DogeTransaction } from 'packages/blockchain/doge/src/lib/transaction/doge.tx';

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeTransactionsExample() {
  const txData = await dogeSDK.transaction.prepareSignedTransaction({
    fromUTXO: [
      {
        txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
        index: 1,
        privateKey: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
        address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
        value: '60'
      },
    ],
    to: [
      {
        address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        value: 0.00015,
      },
    ],
  } as DogeTransaction)

  const { txId, failed } = await dogeSDK.transaction.sendTransaction({
    fromUTXO: [
      {
        txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
        index: 1,
        privateKey: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
        address: 'nUPfS5zGfHzehxcReVQR2Jb53ef2i8xQb1',
        value: '100'
      },
    ],
    to: [
      {
        address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        value: 0.00015,
      },
    ],
  } as DogeTransaction)
}
