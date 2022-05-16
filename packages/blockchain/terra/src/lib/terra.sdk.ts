import { TerraService } from '@tatumio/api-client'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { terraWallet } from './services/terra.sdk.wallet'
import { terraTxService } from './services/terra.tx'
import { terraKmsService } from './services/terra.kms'
import { terraClient } from './services/terra.client'
import { terraOffchainService } from './services/terra.offchain'

const blockchain = Blockchain.TERRA

export const TatumTerraSDK = (args: SDKArguments) => {
  const api = TerraService
  const { ...abstractSdk } = abstractBlockchainSdk({ ...args, blockchain })

  return {
    ...abstractSdk,
    api,
    offchain: { ...abstractSdk.offchain, ...terraOffchainService({ ...args, blockchain }) },
    client: terraClient(args),
    kms: terraKmsService({ ...args, blockchain }),
    wallet: terraWallet(),
    transaction: terraTxService(args),
    blockchain: {
      getCurrentBlock: TerraService.terraGetCurrentBlock,
      getBlock: TerraService.terraGetBlock,
      getAccount: TerraService.terraGetAccount,
      getTransaction: TerraService.terraGetTransaction,
      broadcast: TerraService.terraBroadcast,
    },
  }
}
