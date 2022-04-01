import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/api-client'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ledgerNftExample() {
  const nfts = await tatumSDK.nft.getNFTsByAddress(Currency.ETH, 'TOKEN ADDRESS')
}
