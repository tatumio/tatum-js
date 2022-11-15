import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { TatumUrlArg } from '@tatumio/api-client'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { EvmBasedWeb3 } from './services/evm-based.web3'
import { evmBasedWallet } from './services/evm-based.wallet'
import { evmBlockchainRecord } from './services/evm-based.record'
import { abstractSdkCustodialManagedWallets } from '@tatumio/shared-abstract-sdk'

export const evmBasedSdk = (args: {
  apiKey: string
  url?: TatumUrlArg
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
}) => {
  return {
    ...abstractBlockchainSdk(args),
    web3Client: args.web3.getClient,
    record: evmBlockchainRecord(args),
    getGasPriceInWei: args.web3.getGasPriceInWei,
    wallet: evmBasedWallet(args),
    custodialManagedWallet: abstractSdkCustodialManagedWallets(),
  }
}
