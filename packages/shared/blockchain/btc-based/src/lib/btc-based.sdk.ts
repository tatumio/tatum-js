import { BtcBasedBlockchain } from '@tatumio/shared-core'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { btcBasedKmsService } from './nested/btc-based.kms'
import { TatumUrlArg } from '@tatumio/api-client'

export const btcBasedSdk = (args: { apiKey: string; url?: TatumUrlArg; blockchain: BtcBasedBlockchain }) => {
  return {
    ...abstractBlockchainSdk(args),
    kms: btcBasedKmsService(args),
  }
}
