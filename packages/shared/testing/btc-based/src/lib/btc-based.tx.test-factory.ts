import '@tatumio/shared-testing-common'
import {
  BtcBasedFromWithChange,
  BtcBasedTx,
  BtcBasedUtxoWithChange,
  FeeChange,
} from '@tatumio/shared-blockchain-btc-based'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { testHelper } from '@tatumio/shared-testing-common'
import {
  BroadcastKMS,
  BtcTransactionFromAddress,
  BtcTransactionFromUTXO,
  CancelablePromise,
  LtcTransactionAddress,
  LtcTransactionUTXO,
  TransactionHashKMS,
} from '@tatumio/api-client'

export type BtcBasedTestParams = {
  fromAmount: number
  fromTxHash: string
  fromIndex: number
  fromAddress: string
  fromPrivateKey: string
  toAmount: number
  toAddress: string
  feeAmount: number
}
export type BtcBasedInvalidTestParams = {
  invalidAmounts: number[]
}

export type BtcBasedMocks = {
  requestGetRawTx: (obj?: unknown) => void
  requestGetUtxo: (obj?: unknown) => void
  requestGetTxByAddress: (obj?: { outputs: [] }) => void
  requestGetUtxoNotFound: () => void
  broadcast: ((requestBody: BroadcastKMS) => CancelablePromise<TransactionHashKMS>) & jest.Mock
}

const options = { testnet: true }
const definedChangeAddressUTXOBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: number; privateKey?: string },
): BtcBasedUtxoWithChange => {
  return {
    fromUTXO: [
      {
        txHash: data.fromTxHash,
        index: data.fromIndex,
        privateKey: values?.privateKey ?? data.fromPrivateKey,
      },
    ],
    to: [
      {
        address: data.toAddress,
        value: values?.amount ?? data.toAmount,
      },
    ],
    change: data.fromAddress,
    fee: values?.fee ?? data.feeAmount,
  }
}

const manualChangeAddressUTXOBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: number; privateKey?: string },
): BtcBasedUtxoWithChange => {
  return {
    fromUTXO: [
      {
        txHash: data.fromTxHash,
        index: data.fromIndex,
        privateKey: data.fromPrivateKey,
      },
    ],
    to: [
      {
        address: data.toAddress,
        value: data.toAmount,
      },
      {
        address: data.fromAddress,
        value: data.fromAmount - data.toAmount - data.feeAmount,
      },
    ],
  }
}

const manualChangeAddressFromBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: number; privateKey?: string },
): BtcBasedFromWithChange => {
  return {
    fromAddress: [
      {
        address: data.fromAddress,
        privateKey: data.fromPrivateKey,
      },
    ],
    to: [
      {
        address: data.toAddress,
        value: data.toAmount,
      },
      {
        address: data.fromAddress,
        value: data.fromAmount - data.toAmount - data.feeAmount,
      },
    ],
  }
}
const definedChangeAddressFromBody = (
  data: BtcBasedTestParams,
  values?: { amount?: number; fee?: number; privateKey?: string },
): BtcBasedFromWithChange => {
  return {
    fromAddress: [
      {
        address: data.fromAddress,
        privateKey: values?.privateKey ?? data.fromPrivateKey,
      },
    ],
    to: [
      {
        address: data.toAddress,
        value: values?.amount ?? data.toAmount,
      },
    ],
    change: data.fromAddress,
    fee: values?.fee ?? data.feeAmount,
  }
}
export const btcBasedTxTestFactory = {
  fromUTXO: (args: {
    transactions: BtcBasedTx<(BtcTransactionFromUTXO & FeeChange) | (LtcTransactionUTXO & FeeChange)>
    data: BtcBasedTestParams
    validate: {
      txData: string
    }
    mock: BtcBasedMocks
  }) => {
    describe('sendTransaction', () => {
      it('valid defined change address', async () => {
        args.mock.requestGetRawTx()
        args.mock.requestGetUtxo()

        args.mock.broadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

        const result = await args.transactions.sendTransaction(
          definedChangeAddressUTXOBody(args.data),
          options,
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.validate.txData }])
      })
      it('valid manual change address', async () => {
        args.mock.requestGetRawTx()
        args.mock.requestGetUtxo()

        args.mock.broadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

        const result = await args.transactions.sendTransaction(
          manualChangeAddressUTXOBody(args.data),
          options,
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.validate.txData }])
      })
    })

    // @TODO Add tests KMS
  },
  fromUTXOInvalid: (args: {
    transactions: BtcBasedTx<(BtcTransactionFromUTXO & FeeChange) | (LtcTransactionUTXO & FeeChange)>
    data: BtcBasedTestParams
    invalid: BtcBasedInvalidTestParams
    validate: {
      txData: string
    }
    mock: BtcBasedMocks
  }) => {
    describe('prepareSignedTransaction', () => {
      it('not enough money on balance', async () => {
        args.mock.requestGetRawTx()
        args.mock.requestGetUtxo()

        await expect(
          args.transactions.prepareSignedTransaction(
            definedChangeAddressUTXOBody(args.data, { amount: 100500 }),
            options,
          ),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
      })

      it('fee = 0', async () => {
        args.mock.requestGetRawTx()
        args.mock.requestGetUtxo()

        await expect(
          args.transactions.prepareSignedTransaction(
            definedChangeAddressUTXOBody(args.data, { amount: args.data.fromAmount, fee: 0 }),
            options,
          ),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_FEE_TOO_SMALL)
      })

      it('utxo not found', async () => {
        args.mock.requestGetUtxoNotFound()

        await expect(
          args.transactions.prepareSignedTransaction(definedChangeAddressUTXOBody(args.data), options),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND)
      })

      describe('invalid amount', function () {
        it.each(args.invalid.invalidAmounts)('%d', async (value) => {
          await expect(
            args.transactions.prepareSignedTransaction(
              definedChangeAddressUTXOBody(args.data, { amount: value }),
              options,
            ),
          ).rejects.toThrow(SdkErrorCode.BTC_BASED_AMOUNT)
          testHelper.expectMockNotCalled(args.mock.broadcast)
        })
      })
    })
  },

  fromAddress: (args: {
    transactions: BtcBasedTx<(BtcTransactionFromAddress & FeeChange) | (LtcTransactionAddress & FeeChange)>
    data: BtcBasedTestParams
    validate: {
      txData: string
    }
    mock: BtcBasedMocks
  }) => {
    const options = { testnet: true }
    describe('sendTransaction', () => {
      it(`valid defined change address`, async () => {
        args.mock.requestGetTxByAddress()
        args.mock.requestGetUtxo()

        args.mock.broadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

        const result = await args.transactions.sendTransaction(
          definedChangeAddressFromBody(args.data),
          options,
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.validate.txData }])
      })

      it(`valid manual change address`, async () => {
        args.mock.requestGetTxByAddress()
        args.mock.requestGetUtxo()

        args.mock.broadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

        const result = await args.transactions.sendTransaction(
          manualChangeAddressFromBody(args.data),
          options,
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.validate.txData }])
      })
    })
  },
  fromAddressInvalidAmount: (args: {
    transactions: BtcBasedTx<BtcTransactionFromAddress | LtcTransactionAddress>
    data: BtcBasedTestParams
    invalid: BtcBasedInvalidTestParams
    mock: BtcBasedMocks
  }) => {
    const options = { testnet: true }
    describe('invalid amount', function () {
      args.mock.requestGetTxByAddress()
      args.mock.requestGetUtxo()
      it.each(args.invalid.invalidAmounts)('%d', async (value) => {
        await expect(
          args.transactions.prepareSignedTransaction(
            definedChangeAddressFromBody(args.data, { amount: value }),
            options,
          ),
        ).rejects.toThrow(SdkErrorCode.BTC_BASED_AMOUNT)
        testHelper.expectMockNotCalled(args.mock.broadcast)
      })
    })
  },
}
