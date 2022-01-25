import { TatumBchSDK } from '@tatumio/bch'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bchLedgerAccountsExample() {
  const account = await bchSDK.ledger.account.create({
    currency: Currency.BCH,
  })
}
