import { BlockchainTerraService } from '@tatumio/api-client'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { terraWallet } from './services/terra.sdk.wallet'
import { terraTxService } from './services/terra.tx'
import { terraKmsService } from './services/terra.kms'
import { terraClient } from './services/terra.web3'

const blockchain = Blockchain.TERRA

export const TatumTerraSDK = (args: SDKArguments) => {
  const api = BlockchainTerraService
  const { ...abstractSdk } = abstractBlockchainSdk({ ...args, blockchain })


  return {
    ...abstractSdk,
    api,
    web3: terraClient(args),
    kms: terraKmsService({ ...args, blockchain }),
    wallet: terraWallet(),
    transaction: terraTxService(args),
    blockchain: {
      getCurrentBlock: BlockchainTerraService.terraGetCurrentBlock,
      getBlock: BlockchainTerraService.terraGetBlock,
      getAccount: BlockchainTerraService.terraGetAccount,
      getTransaction: BlockchainTerraService.terraGetTransaction,
      broadcast: BlockchainTerraService.terraBroadcast,
    },
  }
}
