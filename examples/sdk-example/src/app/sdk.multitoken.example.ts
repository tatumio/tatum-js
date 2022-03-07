import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/api-client'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function multiTokenExample() {
  // @TODO add real token
  const balance = await tatumSDK.multiToken.getMultiTokensBalance(
    Currency.ETH,
    'ADDRESS',
    'CONTRACT ADDRESS',
    'TOKEN_ID',
  )

  const transaction = await tatumSDK.multiToken.getMultiTokenTransaction(Currency.MATIC, 'TX HASH')

  const txs = await tatumSDK.multiToken.getMultiTokenTransactionsByAddress(
    Currency.CELO,
    'ADDRESS',
    'TOKEN ADDRESS',
    50,
  )

  const metadata = await tatumSDK.multiToken.getMultiTokenMetadata(Currency.CELO, 'ADDRESS', 'TOKEN ADDRESS')
}
