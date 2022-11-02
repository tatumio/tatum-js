import { BtcTransactionFromUTXO } from '@tatumio/api-client'
import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function btcTransactionsExample() {
  const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  // Send Transaction
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin#operation/BtcTransferBlockchain
  const { txId } = await btcSDK.transaction.sendTransaction(
    {
      fromAddress: [
        {
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          privateKey: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
        },
      ],
      to: [
        {
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          value: 0.00015,
        },
      ],
      fee: '0.00001',
      changeAddress: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
    },
    { testnet: true },
  )
  console.log(txId)
}
