import { BtcBasedBlockchain } from '@tatumio/shared-core'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { btcBasedKmsService } from './nested/btc-based.kms'
import { TatumUrl } from '@tatumio/api-client'

export const btcBasedSdk = (args: { apiKey: string; url?: TatumUrl; blockchain: BtcBasedBlockchain }) => {
  return {
    ...abstractBlockchainSdk(args),
    kms: btcBasedKmsService(args),
  }
}
