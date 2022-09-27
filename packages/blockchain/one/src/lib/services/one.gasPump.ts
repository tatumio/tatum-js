import { HarmonyService } from '@tatumio/api-client'
import { EvmBasedWeb3, gasPump } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const oneGasPump = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
}): ReturnType<typeof gasPump> => {
  const unpatchedGasPump = gasPump({
    ...args,
    broadcastFunction: HarmonyService.oneBroadcast,
  })

  return {
    ...unpatchedGasPump,
    prepare: {
      /**
       * Generate new smart contract based gas pump wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       * @param params
       */
      gasPumpWalletBatch: async (...params: Parameters<typeof unpatchedGasPump.prepare.gasPumpWalletBatch>) =>
        unpatchedGasPump.prepare.gasPumpWalletBatch(params[0], params[1], params[2]),
    },
  }
}
