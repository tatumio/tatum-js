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
import { SdkErrorCode, SdkErrorMessage, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { Blockchain, httpHelper } from '@tatumio/shared-core'
import { flatten } from 'lodash'
import { expectHexString, TEST_DATA } from '@tatumio/shared-testing-common'
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

export type CeloFeeCurrency = 'CELO' | 'CUSD' | 'CEUR'

export const CELO_CONSTANTS = {
  CEUR_ADDRESS_MAINNET: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
  CEUR_ADDRESS_TESTNET: '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f',
  CUSD_ADDRESS_MAINNET: '0x765de816845861e75a25fca122bb6898b8b1282a',
  CUSD_ADDRESS_TESTNET: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
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
  combineArrays: <T, U>(arr1: T[], arr2: U[]): (T | U)[][] =>
    flatten(arr1.map((item1) => arr2.map((item2) => [item1, item2]))),
  combineThreeArrays: <T, U, V>(arr1: T[], arr2: U[], arr3: V[]): (T | U | V)[][] =>
    flatten(flatten(arr1.map((item1) => arr2.map((item2) => arr3.map((item3) => [item1, item2, item3]))))),
  feeCurrencies: (): CeloFeeCurrency[] => ['CELO', 'CUSD', 'CEUR'],
  testSign: ({ apiFn, apiArg, signatureIdExpect }: CeloTestMethod) => {
    celoUtils.testAllCurrencies('fromPrivateKey - %p', async (feeCurrency) => {
      const args = {
        ...apiArg,
        feeCurrency,
        fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20!.PRIVATE_KEY,
        signatureId: undefined,
      }
      const result = await apiFn(args, TEST_DATA.CELO?.PROVIDER, true)
      expectHexString(result)
    })

    celoUtils.testAllCurrencies('signatureId - %p', async (feeCurrency) => {
      const args = {
        ...apiArg,
        feeCurrency,
        signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
        fromPrivateKey: undefined,
      }
      const result = await apiFn(args, TEST_DATA.CELO?.PROVIDER, true)
      const json = JSON.parse(result)
      if (signatureIdExpect) {
        signatureIdExpect(json)
      } else {
        expectHexString(json.data)
      }
    })
  },
  testAllCurrencies: (name: string, test: (feeCurrency: CeloFeeCurrency) => void) =>
    it.each(celoUtils.feeCurrencies())(name, async (feeCurrency) => test(feeCurrency)),
  testInvalidInputs: ({ apiFn, apiArg, sdkErrorCode }: CeloTestMethod) => {
    const to = Array.isArray(apiArg.to) ? ['someinvalidaddress'] : 'someinvalidaddress'
    const invalidAddress = {
      ...apiArg,
      to,
    }

    const invalidAddressMsg = Array.isArray(apiArg.to)
      ? SdkErrorMessage.get(SdkErrorCode.EVM_INVALID_ADDRESS_ARRAY)
      : SdkErrorMessage.get(SdkErrorCode.EVM_INVALID_ADDRESS_SINGLE)

    const error = new EvmBasedSdkError({ error: new Error(invalidAddressMsg), code: sdkErrorCode })
    celoUtils.testAllCurrencies('invalid address - %p', async (feeCurrency) => {
      await expect(apiFn({ ...invalidAddress, feeCurrency }, TEST_DATA.CELO?.PROVIDER, true)).rejects.toThrow(
        error,
      )
    })

    const missingSCAddress = {
      ...apiArg,
      contractAddress: '',
    }

    celoUtils.testAllCurrencies('empty smart contract address - %p', async (feeCurrency) => {
      await expect(
        apiFn({ ...missingSCAddress, feeCurrency }, TEST_DATA.CELO?.PROVIDER, true),
      ).rejects.toThrow(
        new EvmBasedSdkError({
          error: new Error(SdkErrorMessage.get(SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS)),
          code: SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS,
        }),
      )
    })
  },
  testMethod: (args: CeloTestMethod) => {
    celoUtils.testSign(args)
    celoUtils.testInvalidInputs(args)
  },
}

export interface CeloTestMethod {
  apiFn: ApiFn
  apiArg: any
  signatureIdExpect?: (object: string) => void
  sdkErrorCode?: SdkErrorCode
}

type ApiFn = (a: object, b: string | undefined, c: boolean) => any
