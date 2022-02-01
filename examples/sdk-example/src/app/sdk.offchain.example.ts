import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { Currency } from '@tatumio/shared-core'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function offChainExample() {
  // create account first
  const account = await tatumSDK.ledger.account.create({
    currency: Currency.BTC,
  })

  const depositAddress = await tatumSDK.offchain.depositAddress.create(account.id)

  const depositAddresses = await tatumSDK.offchain.depositAddress.createMultiple({
    addresses: [
      {
        accountId: 'ACCOUNT ID',
      },
    ],
  })

  const getDepositAddresses = await tatumSDK.offchain.depositAddress.getByAccount(account.id)

  // @TODO OPENAPI - maybe return true / false?
  const address = await tatumSDK.offchain.depositAddress.checkExists(
    Currency.BTC,
    '1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv',
  )

  const assignedAddress = await tatumSDK.offchain.depositAddress.assign(
    account.id,
    '1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv',
  )

  await tatumSDK.offchain.depositAddress.remove(account.id, '1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv')

  const withdrawalResult = await tatumSDK.offchain.withdrawal.create({
    amount: '300',
    senderAccountId: account.id,
    address: '1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv',
    fee: '50',
  })

  const withdrawals = await tatumSDK.offchain.withdrawal.getAll(50)

  const broadcastResponse = await tatumSDK.offchain.withdrawal.broadcast({
    currency: Currency.ETH,
    signatureId: 'SIGNATURE ID',
    txData: 'Raw signed transaction to be published to network.',
  })

  // @TODO what is what here?
  await tatumSDK.offchain.withdrawal.complete(withdrawalResult.id!, withdrawalResult.reference!)
}
