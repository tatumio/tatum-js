import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeLedgerAccountsExample() {
  const account = await dogeSDK.ledger.account.create({
    currency: Currency.DOGE,
  })
}
