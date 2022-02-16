// import {
//   BroadcastFunction,
//   ChainApproveCustodialTransfer,
//   ChainBatchTransferCustodialWallet,
//   ChainGenerateCustodialWalletBatch,
//   ChainTransferCustodialWallet,
// } from '@tatumio/shared-blockchain-abstract'
// import { EvmBasedBlockchain } from '@tatumio/shared-core'
// import { EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
// import { custodial as evmCustodial } from '@tatumio/shared-blockchain-evm-based'

// export const custodial = (args: {
//   blockchain: EvmBasedBlockchain
//   broadcastFunction: BroadcastFunction
//   web3: EvmBasedWeb3
// }) => {
//   const evmCustodialService = evmCustodial({
//     blockchain: args.blockchain,
//     web3: args.web3,
//     broadcastFunction: args.broadcastFunction,
//   })
//   return {
//     prepare: {
//       /**
//        * Prepare signed transaction from the custodial SC wallet.
//        * @param testnet chain to work with
//        * @param body request data
//        * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
//        * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
//        */
//       transferFromCustodialWallet: async (
//         body: ChainTransferCustodialWallet,
//         testnet?: boolean,
//         provider?: string,
//       ) => evmCustodialService.prepare.transferFromCustodialWallet(body, testnet, provider),
//       /**
//        * Prepare signed batch transaction from the custodial SC wallet.
//        * @param testnet chain to work with
//        * @param body request data
//        * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
//        * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
//        */
//       batchTransferFromCustodialWallet: async (
//         body: ChainBatchTransferCustodialWallet,
//         testnet?: boolean,
//         provider?: string,
//       ) => evmCustodialService.prepare.batchTransferFromCustodialWallet(body, testnet, provider),
//       /**
//        * Prepare signed approve transaction from the custodial SC wallet.
//        * @param body request data
//        * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
//        * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
//        */
//       approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider?: string) =>
//         evmCustodialService.prepare.approveFromCustodialWallet(body, provider),
//       /**
//        * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
//        * of assets is covered by the deployer.
//        * @param testnet chain to work with
//        * @param body request data
//        * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
//        * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
//        */
//       custodialWalletBatch: async (
//         body: ChainGenerateCustodialWalletBatch,
//         testnet?: boolean,
//         provider?: string,
//       ) => evmCustodialService.prepare.custodialWalletBatch(body, testnet, provider),
//     },
//     send: {
//       /**
//        * Send signed transaction from the custodial SC wallet.
//        * @param testnet chain to work with
//        * @param body request data
//        * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
//        * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
//        */
//       transferFromCustodialWallet: async (
//         body: ChainTransferCustodialWallet,
//         testnet?: boolean,
//         provider?: string,
//       ) => await evmCustodialService.send.transferFromCustodialWallet(body, testnet, provider),
//       /**
//        * Send signed batch transaction from the custodial SC wallet.
//        * @param testnet chain to work with
//        * @param body request data
//        * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
//        * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
//        */
//       batchTransferFromCustodialWallet: async (
//         body: ChainBatchTransferCustodialWallet,
//         testnet?: boolean,
//         provider?: string,
//       ) => await evmCustodialService.send.batchTransferFromCustodialWallet(body, testnet, provider),
//       /**
//        * Send signed approve transaction from the custodial SC wallet.
//        * @param body request data
//        * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
//        * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
//        */
//       approveFromCustodialWallet: async (body: ChainApproveCustodialTransfer, provider?: string) =>
//         await evmCustodialService.send.approveFromCustodialWallet(body, provider),
//       /**
//        * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
//        * of assets is covered by the deployer.
//        * @param testnet chain to work with
//        * @param body request data
//        * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
//        * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
//        */
//       custodialWalletBatch: async (
//         body: ChainGenerateCustodialWalletBatch,
//         testnet?: boolean,
//         provider?: string,
//       ) => await evmCustodialService.send.custodialWalletBatch(body, testnet, provider),
//     },
//   }
// }
