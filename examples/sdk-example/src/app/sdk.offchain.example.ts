import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/api-client'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function virtualAccountExample() {
  // create account first
  const account = await tatumSDK.ledger.account.create({
    currency: Currency.BTC,
  })

  const depositAddress = await tatumSDK.virtualAccount.depositAddress.create(account.id)

  const depositAddresses = await tatumSDK.virtualAccount.depositAddress.createMultiple({
    addresses: [
      {
        accountId: 'ACCOUNT ID',
      },
    ],
  })

  const getDepositAddresses = await tatumSDK.virtualAccount.depositAddress.getByAccount(account.id)

  // @TODO OPENAPI - maybe return true / false?
  const address = await tatumSDK.virtualAccount.depositAddress.checkExists(
    Currency.BTC,
    '1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv',
  )

  const assignedAddress = await tatumSDK.virtualAccount.depositAddress.assign(
    account.id,
    '1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv',
  )

  await tatumSDK.virtualAccount.depositAddress.remove(account.id, '1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv')

  const withdrawalResult = await tatumSDK.virtualAccount.withdrawal.create({
    amount: '300',
    senderAccountId: account.id,
    address: '1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv',
    fee: '50',
  })

  const withdrawals = await tatumSDK.virtualAccount.withdrawal.getAll(50)

  const broadcastResponse = await tatumSDK.virtualAccount.withdrawal.broadcast({
    currency: Currency.ETH,
    signatureId: 'SIGNATURE ID',
    txData: 'Raw signed transaction to be published to network.',
  })

  await tatumSDK.virtualAccount.withdrawal.complete(withdrawalResult.id!, withdrawalResult.reference!)
}
