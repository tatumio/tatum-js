import { TatumTerraSDK } from '@tatumio/terra'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { Currency } from '@tatumio/api-client'

const terraSDK = TatumTerraSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function terraTxExample() {
  await terraSDK.transaction.send(true, {
    fromPrivateKey: '42833dd2c36df40d5e4f0ba525d665a25103fc8e01ef86a9d962941855b9902c',
    currency: Currency.LUNA,
    amount: '10000',
    to: 'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn',
  })
}
