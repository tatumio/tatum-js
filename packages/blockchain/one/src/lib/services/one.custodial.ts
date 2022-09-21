import { HarmonyService } from '@tatumio/api-client'
import { custodial, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { oneUtils } from '../one.utils'

export const oneCustodial = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
}): ReturnType<typeof custodial> => {
  const unpatchedCustodial = custodial({
    ...args,
    broadcastFunction: HarmonyService.oneBroadcast,
  })

  return {
    ...unpatchedCustodial,
    prepare: {
      /**
       * Prepare signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: async (
        ...params: Parameters<typeof unpatchedCustodial.prepare.transferFromCustodialWallet>
      ) =>
        unpatchedCustodial.prepare.transferFromCustodialWallet(
          {
            ...params[0],
            custodialAddress: oneUtils.transformAddress(params[0].custodialAddress),
            recipient: oneUtils.transformAddress(params[0].recipient),
            ...(params[0].tokenAddress && {
              tokenAddress: oneUtils.transformAddress(params[0].tokenAddress),
            }),
          },
          params[1],
          params[2],
        ),
      /**
       * Prepare signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: async (
        ...params: Parameters<typeof unpatchedCustodial.prepare.batchTransferFromCustodialWallet>
      ) =>
        unpatchedCustodial.prepare.batchTransferFromCustodialWallet(
          {
            ...params[0],
            custodialAddress: oneUtils.transformAddress(params[0].custodialAddress),
            recipient: params[0].recipient.map((r) => oneUtils.transformAddress(r)),
            ...(params[0].tokenAddress && {
              tokenAddress: params[0].tokenAddress?.map((t) => oneUtils.transformAddress(t)),
            }),
          },
          params[1],
          params[2],
        ),
      /**
       * Prepare signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (
        ...params: Parameters<typeof unpatchedCustodial.prepare.approveFromCustodialWallet>
      ) =>
        unpatchedCustodial.prepare.approveFromCustodialWallet(
          {
            ...params[0],
            custodialAddress: oneUtils.transformAddress(params[0].custodialAddress),
            ...(params[0].tokenAddress && {
              tokenAddress: oneUtils.transformAddress(params[0].tokenAddress),
            }),
          },
          params[1],
        ),
      /**
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWalletBatch: async (
        ...params: Parameters<typeof unpatchedCustodial.prepare.custodialWalletBatch>
      ) =>
        unpatchedCustodial.prepare.custodialWalletBatch(
          {
            ...params[0],
            owner: oneUtils.transformAddress(params[0].owner),
          },
          params[1],
          params[2],
        ),
    },
    send: {
      /**
       * Send signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: async (
        ...params: Parameters<typeof unpatchedCustodial.send.transferFromCustodialWallet>
      ) =>
        unpatchedCustodial.send.transferFromCustodialWallet(
          {
            ...params[0],
            custodialAddress: oneUtils.transformAddress(params[0].custodialAddress),
            recipient: oneUtils.transformAddress(params[0].recipient),
            ...(params[0].tokenAddress && {
              tokenAddress: oneUtils.transformAddress(params[0].tokenAddress),
            }),
          },
          params[1],
          params[2],
        ),

      /**
       * Send signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: async (
        ...params: Parameters<typeof unpatchedCustodial.send.batchTransferFromCustodialWallet>
      ) =>
        unpatchedCustodial.send.batchTransferFromCustodialWallet(
          {
            ...params[0],
            custodialAddress: oneUtils.transformAddress(params[0].custodialAddress),
            recipient: params[0].recipient.map((r) => oneUtils.transformAddress(r)),
            ...(params[0].tokenAddress && {
              tokenAddress: params[0].tokenAddress?.map((t) => oneUtils.transformAddress(t)),
            }),
          },
          params[1],
          params[2],
        ),
      /**
       * Send signed approve transaction from the custodial SC wallet.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveFromCustodialWallet: async (
        ...params: Parameters<typeof unpatchedCustodial.send.approveFromCustodialWallet>
      ) =>
        unpatchedCustodial.send.approveFromCustodialWallet(
          {
            ...params[0],
            custodialAddress: oneUtils.transformAddress(params[0].custodialAddress),
            ...(params[0].tokenAddress && {
              tokenAddress: oneUtils.transformAddress(params[0].tokenAddress),
            }),
          },
          params[1],
        ),
      /**
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWalletBatch: async (
        ...params: Parameters<typeof unpatchedCustodial.send.custodialWalletBatch>
      ) =>
        unpatchedCustodial.send.custodialWalletBatch(
          {
            ...params[0],
            owner: oneUtils.transformAddress(params[0].owner),
          },
          params[1],
          params[2],
        ),
    },
  }
}
