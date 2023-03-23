import '@tatumio/shared-testing-common'
import {
  BtcBasedFromWithChange,
  BtcBasedFromWithKmsChange,
  BtcBasedTx,
  BtcBasedUtxoKMSWithChange,
  BtcBasedUtxoWithChange,
} from '@tatumio/shared-blockchain-btc-based'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { testHelper } from '@tatumio/shared-testing-common'
import { BroadcastKMS, CancelablePromise, TransactionHash } from '@tatumio/api-client'

export type BtcBasedTestParams = {
  fromAmount: number
  fromTxHash: string
  fromIndex: number
  fromAddress: string
  fromPrivateKey: string
  fromSignatureId: string
  toAmount: number
  toAddress: string
  feeAmount: number
}

export type BtcBasedValidation = {
  txData: string
  txDtoSerialized: string
  txDtoSerializedWithChange: string
}

export type BtcBasedMocks = {
  requestGetRawTx: (obj?: unknown) => void
  requestGetUtxo: (obj?: unknown) => void
  requestGetUTXOsByAddress: (obj?: any) => void
  requestGetUtxoNotFound: () => void
  requestGetTransactionsNotFound: () => void
  requestEstimateFee: (obj?: unknown) => void
  broadcast: ((requestBody: BroadcastKMS) => CancelablePromise<TransactionHash>) & jest.Mock
}

const options = { testnet: true }

function prepareTo(data: BtcBasedTestParams, values: { amount?: number }) {
  return [
    {
      address: data.toAddress,
      value: values?.amount ?? data.toAmount,
    },
  ]
}

function prepareManualChange(data: BtcBasedTestParams) {
  return {
    address: data.fromAddress,
    value: data.fromAmount - data.toAmount - data.feeAmount,
  }
}

const definedChangeAddressUTXOBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: string; privateKey?: string },
): BtcBasedUtxoWithChange => {
  return {
    fromUTXO: [
      {
        txHash: data.fromTxHash,
        index: data.fromIndex,
        privateKey: values?.privateKey ?? data.fromPrivateKey,
      },
    ],
    to: prepareTo(data, values),
    changeAddress: data.fromAddress,
    fee: values?.fee ?? data.feeAmount.toString(),
  }
}

const definedChangeAddressUTXOKmsBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: string; signatureId?: string },
): BtcBasedUtxoKMSWithChange => {
  return {
    fromUTXO: [
      {
        txHash: data.fromTxHash,
        index: data.fromIndex,
        signatureId: values?.signatureId ?? data.fromSignatureId,
      },
    ],
    to: prepareTo(data, values),
    changeAddress: data.fromAddress,
    fee: values?.fee ?? data.feeAmount.toString(),
  }
}

const manualChangeAddressUTXOBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: string; privateKey?: string },
): BtcBasedUtxoWithChange => {
  return {
    fromUTXO: [
      {
        txHash: data.fromTxHash,
        index: data.fromIndex,
        privateKey: data.fromPrivateKey,
      },
    ],
    to: [...prepareTo(data, values), prepareManualChange(data)],
  }
}

const manualChangeAddressUTXOKmsBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: string; signatureId?: string },
): BtcBasedUtxoKMSWithChange => {
  return {
    fromUTXO: [
      {
        txHash: data.fromTxHash,
        index: data.fromIndex,
        signatureId: data.fromSignatureId,
      },
    ],
    to: [...prepareTo(data, values), prepareManualChange(data)],
  }
}

const manualChangeAddressFromBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: string; privateKey?: string },
): BtcBasedFromWithChange => {
  return {
    fromAddress: [
      {
        address: data.fromAddress,
        privateKey: data.fromPrivateKey,
      },
    ],
    to: [...prepareTo(data, values), prepareManualChange(data)],
  }
}

const manualChangeAddressFromKmsBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: string; signatureId?: string },
): BtcBasedFromWithKmsChange => {
  return {
    fromAddress: [
      {
        address: data.fromAddress,
        signatureId: data.fromSignatureId,
      },
    ],
    to: [...prepareTo(data, values), prepareManualChange(data)],
  }
}

const definedChangeAddressFromBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: string; privateKey?: string },
): BtcBasedFromWithChange => {
  return {
    fromAddress: [
      {
        address: data.fromAddress,
        privateKey: values?.privateKey ?? data.fromPrivateKey,
      },
    ],
    to: prepareTo(data, values),
    changeAddress: data.fromAddress,
    fee: values?.fee ?? data.feeAmount.toString(),
  }
}

const definedChangeAddressFromKmsBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: string; signatureId?: string },
): BtcBasedFromWithKmsChange => {
  return {
    fromAddress: [
      {
        address: data.fromAddress,
        signatureId: values?.signatureId ?? data.fromSignatureId,
      },
    ],
    to: prepareTo(data, values),
    changeAddress: data.fromAddress,
    fee: values?.fee ?? data.feeAmount.toString(),
  }
}

const EXPECTED_TX_ID = '1111111111111111111111111111111'
const mockRequestsFromAddress = (mock: BtcBasedMocks) => {
  mock.requestGetUTXOsByAddress()
  mock.requestGetUtxo()
  mock.requestEstimateFee()
  mock.broadcast.mockReturnValue(Promise.resolve({ txId: EXPECTED_TX_ID }))
}

const mockRequestsUtxo = (mock: BtcBasedMocks) => {
  mock.requestGetRawTx()
  mock.requestGetUtxo()
  mock.requestEstimateFee()
  mock.broadcast.mockReturnValue(Promise.resolve({ txId: EXPECTED_TX_ID }))
}

const invalid = {
  invalidAmounts: [-1, -1.11111111, 0.0000000001, 9999.999999999],
  wrongPrivateKey: 'cNcqPfCD4ppFALww1dqg1GEgpgSfTe8rbHtDc7G5a4M6jK7E3Gjg',
}

export const btcBasedTxTestFactory = {
  fromUTXO: (args: {
    transactions: BtcBasedTx<BtcBasedUtxoWithChange | BtcBasedUtxoKMSWithChange>
    data: BtcBasedTestParams
    validate: BtcBasedValidation
    mock: BtcBasedMocks
  }) => {
    describe('sendTransaction', () => {
      it('valid defined change address', async () => {
        mockRequestsUtxo(args.mock)

        const result = await args.transactions.sendTransaction(
          definedChangeAddressUTXOBody(args.data),
          options,
        )
        expect(result.txId).toBe(EXPECTED_TX_ID)
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.validate.txData }])
      })
      it('valid manual change address', async () => {
        mockRequestsUtxo(args.mock)

        const result = await args.transactions.sendTransaction(
          manualChangeAddressUTXOBody(args.data),
          options,
        )
        expect(result.txId).toBe(EXPECTED_TX_ID)
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.validate.txData }])
      })
    })

    describe('prepareSignedTransaction KMS', () => {
      it('valid defined change address', async () => {
        mockRequestsUtxo(args.mock)

        const actualTxDto = await args.transactions.prepareSignedTransaction(
          definedChangeAddressUTXOKmsBody(args.data),
          options,
        )
        expect(actualTxDto).toBe(args.validate.txDtoSerializedWithChange)
        testHelper.expectMockNotCalled(args.mock.broadcast)
      })
      it('valid manual change address', async () => {
        mockRequestsUtxo(args.mock)

        const actualTxDto = await args.transactions.prepareSignedTransaction(
          manualChangeAddressUTXOKmsBody(args.data),
          options,
        )
        expect(actualTxDto).toBe(args.validate.txDtoSerialized)
        testHelper.expectMockNotCalled(args.mock.broadcast)
      })
    })

    describe('prepareSignedTransaction', () => {
      it('not enough money on balance', async () => {
        mockRequestsUtxo(args.mock)

        await expect(
          args.transactions.prepareSignedTransaction(
            definedChangeAddressUTXOBody(args.data, { amount: 100500 }),
            options,
          ),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
      })

      it('fee = 0', async () => {
        mockRequestsUtxo(args.mock)

        await expect(
          args.transactions.prepareSignedTransaction(
            definedChangeAddressUTXOBody(args.data, { amount: args.data.fromAmount, fee: '0' }),
            options,
          ),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_FEE_TOO_SMALL)
      })

      it('no inputs - values', async () => {
        args.mock.requestGetTransactionsNotFound()
        args.mock.requestGetUtxoNotFound()

        await expect(
          args.transactions.prepareSignedTransaction(
            {
              ...definedChangeAddressUTXOBody(args.data),
              fromUTXO: [],
            },
            options,
          ),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_NO_INPUTS)
      })

      it('no inputs - balance', async () => {
        args.mock.requestGetTransactionsNotFound()
        args.mock.requestGetUtxoNotFound()

        await expect(
          args.transactions.prepareSignedTransaction(definedChangeAddressUTXOBody(args.data), options),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
      })

      describe('invalid amount', function () {
        it.each(invalid.invalidAmounts)('%d', async (value) => {
          await expect(
            args.transactions.prepareSignedTransaction(
              definedChangeAddressUTXOBody(args.data, { amount: value }),
              options,
            ),
          ).rejects.toThrow(SdkErrorCode.BTC_BASED_AMOUNT)
          testHelper.expectMockNotCalled(args.mock.broadcast)
        })
      })

      it.skip('invalid private key', async () => {
        // TODO different address types break logic, virtual account tx conflicts
        mockRequestsUtxo(args.mock)
        await expect(
          args.transactions.prepareSignedTransaction(
            definedChangeAddressUTXOBody(args.data, { privateKey: invalid.wrongPrivateKey }),
            options,
          ),
        ).rejects.toThrow(SdkErrorCode.BTC_BASED_MISSING_PRIVATE_KEY)
        testHelper.expectMockNotCalled(args.mock.broadcast)
      })
    })
  },

  fromAddress: (args: {
    transactions: BtcBasedTx<BtcBasedFromWithChange | BtcBasedFromWithKmsChange>
    data: BtcBasedTestParams
    validate: BtcBasedValidation
    mock: BtcBasedMocks
  }) => {
    const options = { testnet: true }
    describe('sendTransaction', () => {
      it(`valid defined change address`, async () => {
        mockRequestsFromAddress(args.mock)

        const result = await args.transactions.sendTransaction(
          definedChangeAddressFromBody(args.data),
          options,
        )
        expect(result.txId).toBe(EXPECTED_TX_ID)
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.validate.txData }])
      })

      it(`valid manual change address`, async () => {
        mockRequestsFromAddress(args.mock)

        const result = await args.transactions.sendTransaction(
          manualChangeAddressFromBody(args.data),
          options,
        )
        expect(result.txId).toBe(EXPECTED_TX_ID)
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.validate.txData }])
      })
    })
    describe('prepareSignedTransaction KMS', () => {
      it(`valid defined change address`, async () => {
        mockRequestsFromAddress(args.mock)

        const actualTxDto = await args.transactions.prepareSignedTransaction(
          definedChangeAddressFromKmsBody(args.data),
          options,
        )
        expect(actualTxDto).toBe(args.validate.txDtoSerializedWithChange)
        testHelper.expectMockNotCalled(args.mock.broadcast)
      })

      it(`valid manual change address`, async () => {
        mockRequestsFromAddress(args.mock)

        const actualTxDto = await args.transactions.prepareSignedTransaction(
          manualChangeAddressFromKmsBody(args.data),
          options,
        )
        expect(actualTxDto).toBe(args.validate.txDtoSerialized)
        testHelper.expectMockNotCalled(args.mock.broadcast)
      })
    })
    describe('invalid amount', function () {
      mockRequestsFromAddress(args.mock)

      it.each(invalid.invalidAmounts)('%d', async (value) => {
        await expect(
          args.transactions.prepareSignedTransaction(
            definedChangeAddressFromBody(args.data, { amount: value }),
            options,
          ),
        ).rejects.toThrow(SdkErrorCode.BTC_BASED_AMOUNT)
        testHelper.expectMockNotCalled(args.mock.broadcast)
      })
    })
    it.skip('invalid private key', async () => {
      // TODO different address types break logic, virtual account tx conflicts
      mockRequestsFromAddress(args.mock)
      await expect(
        args.transactions.prepareSignedTransaction(
          definedChangeAddressFromBody(args.data, { privateKey: invalid.wrongPrivateKey }),
          options,
        ),
      ).rejects.toThrow(SdkErrorCode.BTC_BASED_MISSING_PRIVATE_KEY)
      testHelper.expectMockNotCalled(args.mock.broadcast)
    })
    it('no inputs - values', async () => {
      args.mock.requestGetTransactionsNotFound()
      args.mock.requestGetUtxoNotFound()

      await expect(
        args.transactions.prepareSignedTransaction(
          {
            ...definedChangeAddressFromBody(args.data),
            fromAddress: [],
          },
          options,
        ),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_NO_INPUTS)
    })
    it('no inputs - balance', async () => {
      args.mock.requestGetUTXOsByAddress(-1)

      await expect(
        args.transactions.prepareSignedTransaction(definedChangeAddressFromBody(args.data), options),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
    })
  },
}
