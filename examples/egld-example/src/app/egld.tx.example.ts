import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Blockchain, Currency, Fee } from '@tatumio/shared-core'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldTxExample(): Promise<void> {
  // TODO finish
  await egldSDK.transaction.prepare.storeDataSignedTransaction({
    data: 'string',
    from: 'string',
    key: 'string',
    fromPrivateKey: 'string',
  })
  await egldSDK.transaction.prepare.deployEsdtSignedTransaction({})
  await egldSDK.transaction.prepare.transferEsdtSignedTransaction({})
  await egldSDK.transaction.prepare.mintEsdtSignedTransaction({})
  await egldSDK.transaction.prepare.burnEsdtSignedTransaction({})
  await egldSDK.transaction.prepare.pauseEsdtSignedTransaction({})
  await egldSDK.transaction.prepare.specialRoleEsdtOrNftSignedTransaction({})
  await egldSDK.transaction.prepare.freezeOrWipeOrOwvershipEsdtSignedTransaction({})
  await egldSDK.transaction.prepare.controlChangesEsdtSignedTransaction({})
  await egldSDK.transaction.prepare.deployNftOrSftSignedTransaction({})
  await egldSDK.transaction.prepare.createNftOrSftSignedTransaction({})
  await egldSDK.transaction.prepare.transferNftCreateRoleSignedTransaction({})
  await egldSDK.transaction.prepare.stopNftCreateSignedTransaction({})
  await egldSDK.transaction.prepare.addOrBurnNftQuantitySignedTransaction({})
  await egldSDK.transaction.prepare.freezeNftSignedTransaction({})
  await egldSDK.transaction.prepare.wipeNftSignedTransaction({})
  await egldSDK.transaction.prepare.transferNftSignedTransaction({})
  await egldSDK.transaction.prepare.signedTransaction({})
}
