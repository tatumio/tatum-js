import {
  BurnMultiTokenBatchCelo,
  BurnMultiTokenCelo,
  BurnNftCelo,
  CallCeloSmartContractMethod,
  ChainBurnCeloErc20,
  ChainDeployCeloErc20,
  ChainMintCeloErc20,
  ChainTransferCeloErc20Token,
  ChainTransferEthErc20,
  CreateRecordCelo,
  Currency,
  DeployMultiTokenCelo,
  DeployNftCelo,
  MintMultipleNftCelo,
  MintMultiTokenBatchCelo,
  MintMultiTokenCelo,
  MintNftCelo,
  TATUM_API_CONSTANTS,
  TransferCeloBlockchain,
  TransferMultiTokenBatchCelo,
  TransferMultiTokenCelo,
  TransferNftCelo,
  UpdateCashbackValueForAuthorNftCelo,
} from '@tatumio/api-client'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import { BigNumber as BN } from '@ethersproject/bignumber'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { SdkErrorCode, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { Blockchain, httpHelper } from '@tatumio/shared-core'
import { EvmBasedSdkError, evmBasedUtils } from '@tatumio/shared-blockchain-evm-based'

export interface CeloTransactionConfig {
  from?: string
  to?: string
  value?: number | string
  gas?: number | string
  gasPrice?: BN | string
  gasLimit?: string | number
  data?: string
  nonce?: number
  chainId?: number
  chain?: string
  feeCurrency?: string
}

export type ChainMintNftCelo = FromPrivateKeyOrSignatureId<MintNftCelo>

export type ChainMintMultipleNftCelo = FromPrivateKeyOrSignatureId<MintMultipleNftCelo> & {
  erc20?: string
}

export type ChainBurnErc721Celo = WithoutChain<FromPrivateKeyOrSignatureId<BurnNftCelo>>

export type ChainTransferErc721Celo = WithoutChain<FromPrivateKeyOrSignatureId<TransferNftCelo>>

export type ChainUpdateCashbackErc721Celo = WithoutChain<
  FromPrivateKeyOrSignatureId<UpdateCashbackValueForAuthorNftCelo>
>

export type ChainDeployErc721Celo = WithoutChain<FromPrivateKeyOrSignatureId<DeployNftCelo>>

export type ChainMintMultiTokenCelo = WithoutChain<FromPrivateKeyOrSignatureId<MintMultiTokenCelo>>

export type ChainMintMultiTokenBatchCelo = WithoutChain<FromPrivateKeyOrSignatureId<MintMultiTokenBatchCelo>>

export type ChainTransferMultiTokenCelo = WithoutChain<FromPrivateKeyOrSignatureId<TransferMultiTokenCelo>>

export type ChainTransferMultiTokenBatchCelo = WithoutChain<
  FromPrivateKeyOrSignatureId<TransferMultiTokenBatchCelo>
>

export type ChainBurnMultiTokenCelo = WithoutChain<FromPrivateKeyOrSignatureId<BurnMultiTokenCelo>>

export type ChainBurnMultiTokenBatchCelo = WithoutChain<FromPrivateKeyOrSignatureId<BurnMultiTokenBatchCelo>>

export type ChainDeployMultiTokenCelo = WithoutChain<FromPrivateKeyOrSignatureId<DeployMultiTokenCelo>>

export type ChainTransferCeloBlockchain = FromPrivateKeyOrSignatureId<
  Omit<TransferCeloBlockchain, 'currency'>
>

export type ChainDeployErc20Celo = WithoutChain<FromPrivateKeyOrSignatureId<ChainDeployCeloErc20>>

export type ChainMintErc20Celo = WithoutChain<FromPrivateKeyOrSignatureId<ChainMintCeloErc20>>

export type ChainTransferErc20Celo = Omit<
  WithoutChain<FromPrivateKeyOrSignatureId<ChainTransferCeloErc20Token>>,
  'digits'
> &
  Pick<ChainTransferEthErc20, 'fee'>

export type ChainTransferCeloOrCUsd = FromPrivateKeyOrSignatureId<TransferCeloBlockchain> &
  Pick<ChainTransferEthErc20, 'fee'>

export type ChainBurnErc20Celo = WithoutChain<FromPrivateKeyOrSignatureId<ChainBurnCeloErc20>>

export type ChainStoreDataCelo = WithoutChain<FromPrivateKeyOrSignatureId<CreateRecordCelo>> &
  Pick<ChainTransferEthErc20, 'fee'>

export type SmartContractWriteMethodInvocationCelo = FromPrivateKeyOrSignatureId<CallCeloSmartContractMethod>

export type CeloFeeCurrency = 'CELO' | 'CUSD' | 'CEUR'

export const CELO_CONSTANTS = {
  CEUR_ADDRESS_MAINNET: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
  CEUR_ADDRESS_TESTNET: '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f',
  CUSD_ADDRESS_MAINNET: '0x765de816845861e75a25fca122bb6898b8b1282a',
  CUSD_ADDRESS_TESTNET: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
  CELO_ADDRESS_MAINNET: '0x471EcE3750Da237f93B8E339c536989b8978a438',
  CELO_ADDRESS_TESTNET: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
}

export const celoUtils = {
  prepareSignedTransactionAbstraction: async (wallet: CeloWallet, transaction: CeloTransactionConfig) => {
    try {
      transaction.gasLimit = (await wallet.estimateGas(transaction))
        .add(transaction.feeCurrency === Currency.CELO ? 0 : 100000)
        .toHexString()
    } catch (e) {
      throw new EvmBasedSdkError({ error: e as Error, code: SdkErrorCode.EVM_CANNOT_ESTIMATE_GAS_LIMIT })
    }

    return evmBasedUtils.tryCatch(
      () => wallet.signTransaction(transaction),
      SdkErrorCode.EVM_CANNOT_SIGN_TRANSACTION,
    )
  },

  getProvider: (provider?: string) => new CeloProvider(celoUtils.getProviderUrl(provider)),

  getProviderUrl: (provider?: string) => {
    return (
      provider ||
      httpHelper.web3Endpoint(
        Blockchain.CELO,
        process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL,
        TATUM_API_CONSTANTS.API_KEY,
      )
    )
  },

  obtainWalletInformation: async (wallet: CeloWallet, feeCurrencyContractAddress?: string) => {
    const [txCount, gasPrice, from] = await Promise.all([
      wallet.getTransactionCount(),
      wallet.getGasPrice(feeCurrencyContractAddress),
      wallet.getAddress(),
    ])

    return {
      txCount,
      gasPrice:
        [CELO_CONSTANTS.CUSD_ADDRESS_MAINNET, CELO_CONSTANTS.CUSD_ADDRESS_TESTNET].includes(
          feeCurrencyContractAddress || '',
        ) && gasPrice.lte(0x1dcd6500)
          ? BN.from(0x3b9aca00)
          : gasPrice,
      from,
    }
  },
  isCeloAddress: (address?: string) => {
    return address === CELO_CONSTANTS.CELO_ADDRESS_TESTNET || address === CELO_CONSTANTS.CELO_ADDRESS_MAINNET
  },
  isCeloFeeCurrency: (feeCurrency: string): feeCurrency is CeloFeeCurrency => {
    return [Currency.CELO, Currency.CUSD, Currency.CEUR].map((i) => i.toString()).includes(feeCurrency)
  },
  getFeeCurrency: (feeCurrency?: CeloFeeCurrency, testnet?: boolean) => {
    switch (feeCurrency) {
      case Currency.CEUR:
        return testnet ? CELO_CONSTANTS.CEUR_ADDRESS_TESTNET : CELO_CONSTANTS.CEUR_ADDRESS_MAINNET
      case Currency.CUSD:
        return testnet ? CELO_CONSTANTS.CUSD_ADDRESS_TESTNET : CELO_CONSTANTS.CUSD_ADDRESS_MAINNET
      default:
        return undefined
    }
  },
}

export interface CeloTestMethod {
  apiFn: ApiFn
  apiArg: any
  signatureIdExpect?: (object: string) => void
  sdkErrorCode?: SdkErrorCode
}

type ApiFn = (a: object, b: string | undefined, c: boolean) => any
