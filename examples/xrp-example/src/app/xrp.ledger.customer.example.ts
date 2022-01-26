import { TatumXrpSDK } from '@tatumio/xrp'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export const xrpLedgerCustomerExample = async () => {
  await xrpSDK.ledger.customer.activate('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.customer.deactivate('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.customer.disable('5e68c66581f2ee32bc354087')
  await xrpSDK.ledger.customer.enable('5e68c66581f2ee32bc354087')

  const customer = await xrpSDK.ledger.customer.get('5e68c66581f2ee32bc354087')
  const customers = await xrpSDK.ledger.customer.getAll(10)
  const updatedCustomer = await xrpSDK.ledger.customer.update('5e68c66581f2ee32bc354087', {
    externalId: '123654',
  })
}
