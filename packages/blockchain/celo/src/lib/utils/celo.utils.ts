import {
  CallCeloReadSmartContractMethod,
  CallCeloSmartContractMethod,
  ChainBurnCeloErc20,
  ChainDeployCeloErc20,
  ChainMintCeloErc20,
  ChainTransferCeloErc20Token,
  ChainTransferEthErc20,
  CreateRecordCelo,
  Currency,
} from '@tatumio/api-client'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import {
  BurnMultiTokenBatchCelo,
  BurnMultiTokenCelo,
  BurnNftCelo,
  DeployMultiTokenCelo,
  DeployNftCelo,
  GenerateCustodialWalletCelo,
  GenerateCustodialWalletCeloKMS,
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
import { BigNumber as BN } from '@ethersproject/bignumber'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { WithoutChain } from '@tatumio/shared-abstract-sdk'

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

export type ChainMintErc721Celo =
  | MintNftCelo & {
      signatureId?: string
      chain: 'CELO'
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

export type SmartContractReadMethodInvocationCelo = FromPrivateKeyOrSignatureId<CallCeloSmartContractMethod>

export type ChainGenerateCustodialAddressCelo = GenerateCustodialWalletCelo | GenerateCustodialWalletCeloKMS

// export type ChainTransferCustodialWalletCelo = FromPrivateKeyOrSignatureId<TransferCustodialWalletCelo> & {
//   index?: number
// }

// export type ChainBatchTransferCustodialWalletCelo =
//   FromPrivateKeyOrSignatureId<TransferCustodialWalletBatchCelo> & { index?: number }

// export type ChainApproveCustodialTransferCelo =
//   FromPrivateKeyOrSignatureId<ApproveTransferCustodialWalletCelo> & { index?: number }

// export type ChainGenerateCustodialWalletCelo = FromPrivateKeyOrSignatureId<GenerateCustodialWalletCelo> & {
//   index?: number
// }

export type CeloFeeCurrency = 'CELO' | 'CUSD' | 'CEUR'

export const CELO_CONSTANTS = {
  CEUR_ADDRESS_MAINNET: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
  CEUR_ADDRESS_TESTNET: '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f',
  CUSD_ADDRESS_MAINNET: '0x765de816845861e75a25fca122bb6898b8b1282a',
  CUSD_ADDRESS_TESTNET: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
}

export const celoUtils = {
  prepareSignedTransactionAbstraction: async (wallet: CeloWallet, transaction: CeloTransactionConfig) => {
    transaction.gasLimit = (await wallet.estimateGas(transaction))
      .add(transaction.feeCurrency === Currency.CELO ? 0 : 100000)
      .toHexString()

    return wallet.signTransaction(transaction)
  },

  getProvider: (provider?: string) =>
    new CeloProvider(
      provider ||
        `${process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL}/v3/celo/web3/${
          TATUM_API_CONSTANTS.API_KEY
        }`,
    ),

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
