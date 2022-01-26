import { TatumXrpSDK } from '@tatumio/xrp'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { VirtualCurrency } from '@tatumio/api-client'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpLedgerVirtualCurrencyExample() {
  const virtualCurrencyAcc = await xrpSDK.ledger.virtualCurrency.create({
    name: 'VC_VIRTUAL',
    supply: '1000000',
    basePair: VirtualCurrency.basePair.XRP,
    baseRate: 1,
    customer: {
      accountingCurrency: VirtualCurrency.accountingCurrency.USD,
      customerCountry: 'US',
      externalId: '123654',
      providerCountry: 'US',
    },
    description: 'My Virtual Token description.',
    accountCode: 'AC_1011_B',
    accountNumber: '1234567890',
    accountingCurrency: VirtualCurrency.accountingCurrency.USD,
  })
  const virtualCurrency = await xrpSDK.ledger.virtualCurrency.getByName('VC_VIRTUAL')
  const mintTx = await xrpSDK.ledger.virtualCurrency.mint({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  const revokeTx = await xrpSDK.ledger.virtualCurrency.revoke({
    accountId: '5e68c66581f2ee32bc354087',
    amount: '1.5',
  })
  await xrpSDK.ledger.virtualCurrency.update({
    name: 'VC_VIRTUAL',
    baseRate: 1,
    basePair: VirtualCurrency.basePair.EUR,
  })
}
