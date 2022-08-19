import { SdkErrorCode, SdkErrorMessage } from '@tatumio/shared-abstract-sdk'
import { flatten } from 'lodash'
import { expectHexString, TEST_DATA } from '@tatumio/shared-testing-common'
import { EvmBasedSdkError } from '@tatumio/shared-blockchain-evm-based'
import { CeloFeeCurrency, CeloTestMethod } from '../utils/celo.utils'

export const celoTestFactory = {
  combineArrays: <T, U>(arr1: T[], arr2: U[]): (T | U)[][] =>
    flatten(arr1.map((item1) => arr2.map((item2) => [item1, item2]))),
  combineThreeArrays: <T, U, V>(arr1: T[], arr2: U[], arr3: V[]): (T | U | V)[][] =>
    flatten(flatten(arr1.map((item1) => arr2.map((item2) => arr3.map((item3) => [item1, item2, item3]))))),
  feeCurrencies: (): CeloFeeCurrency[] => ['CELO', 'CUSD', 'CEUR'],
  testSign: ({ apiFn, apiArg, signatureIdExpect }: CeloTestMethod) => {
    celoTestFactory.testAllCurrencies('fromPrivateKey - %p', async (feeCurrency) => {
      const args = {
        ...apiArg,
        feeCurrency,
        fromPrivateKey: TEST_DATA.CELO.TESTNET.ERC_20!.PRIVATE_KEY,
        signatureId: undefined,
      }
      const result = await apiFn(args, TEST_DATA.CELO?.PROVIDER, true)
      expectHexString(result)
    })

    celoTestFactory.testAllCurrencies('signatureId - %p', async (feeCurrency) => {
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
    it.each(celoTestFactory.feeCurrencies())(name, async (feeCurrency) => test(feeCurrency)),
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
    celoTestFactory.testAllCurrencies('invalid address - %p', async (feeCurrency) => {
      await expect(apiFn({ ...invalidAddress, feeCurrency }, TEST_DATA.CELO?.PROVIDER, true)).rejects.toThrow(
        error,
      )
    })

    const missingSCAddress = {
      ...apiArg,
      contractAddress: '',
    }

    celoTestFactory.testAllCurrencies('empty smart contract address - %p', async (feeCurrency) => {
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
    celoTestFactory.testSign(args)
    celoTestFactory.testInvalidInputs(args)
  },
}
