import { TatumSDK } from '@tatumio/sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const tatumSDK = TatumSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function storageExample() {
  // @TODO add example
  // @TODO OPENAPI should not be optional
  /*const uploadedHash = await tatumSDK.storage.upload({
    file: new Blob(),
  })

  await tatumSDK.storage.get(uploadedHash.ipfsHash!)*/
}
