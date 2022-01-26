import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumXrpSDK } from '@tatumio/xrp'
import { Currency } from '@tatumio/shared-core'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpLedgerAccountExample() {
  const account = await xrpSDK.ledger.account.create({
    currency: Currency.XRP,
  })
  await xrpSDK.ledger.account.activate('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.account.createMultiple({
    accounts: [{ currency: Currency.XRP }, { currency: Currency.XRP }],
  })
  await xrpSDK.ledger.account.deactivate('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.account.freeze('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.account.unfreeze('5e6be89ee6aa436299950c3f')
  await xrpSDK.ledger.account.update('5e6be89ee6aa436299950c3f', {
    accountCode: 'AC_1011_B',
    accountNumber: '123456',
  })

  const accountById = await xrpSDK.ledger.account.get('5e68c66581f2ee32bc354087')
  const accounts = await xrpSDK.ledger.account.getAll(10)
  const balance = await xrpSDK.ledger.account.getBalance('5e68c66581f2ee32bc354087')
  const blockedAmount = await xrpSDK.ledger.account.getBlockedAmountsByAccountId('5e68c66581f2ee32bc354087')
  const customerAccounts = await xrpSDK.ledger.account.getByCustomerId(10, '5e6be89ee6aa436299950c3f')
}
