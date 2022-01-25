import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ledgerNftExample() {
  const nfts = await tatumSDK.nft.getNFTsByAddress(Currency.ETH, 'TOKEN ADDRESS', 'CONTRACT ADDRESS')
}
