import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { EvmBasedWeb3 } from '../../services/evm-based.web3'
import { evmBasedGasPump } from '../../services/evm-based.gas.pump'
import { evmBasedSmartContract } from '../../services/evm-based.smartContract'
import { CustodialWalletFactoryV2 } from '../../contracts'
import { evmBasedUtils } from '../../evm-based.utils'

const gasPumpWalletBatch = async (body: any, web3: EvmBasedWeb3, testnet?: boolean, provider?: string) => {
  const { params, methodName, bodyWithContractAddress } =
    await evmBasedGasPump().prepareGasPumpWalletBatchAbstract(body, web3, testnet)
  return await evmBasedSmartContract(web3).helperPrepareSCCall(
    bodyWithContractAddress,
    methodName,
    params,
    provider,
    CustodialWalletFactoryV2.abi,
    testnet
  )
}

export const gasPump = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      gasPumpWalletBatch: async (testnet: boolean, body: any, provider?: string) =>
        evmBasedUtils.tryCatch(
          () => gasPumpWalletBatch(body, args.web3, testnet, provider),
          SdkErrorCode.EVM_GAS_PUMP_CANNOT_PREPARE_DEPLOY_BATCH_TX,
        ),
    },
  }
}
