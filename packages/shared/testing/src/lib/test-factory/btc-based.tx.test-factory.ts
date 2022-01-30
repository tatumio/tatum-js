import '../../index'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import { SdkErrorCode } from '@tatumio/abstract-sdk'
import { testHelper } from '../test.helper'
import { BroadcastKMS, CancelablePromise, TransactionHashKMS } from '@tatumio/api-client'

export const btcBasedTxTestFactory = {
  fromUTXO: <T>(args: {
    transactions: BtcBasedTx<T>
    getRequestBodyFromUTXO: (amount: number) => T
    data: {
      utxoAmount: number
      validAmount: number
      validTxData: string
    }
    mock: {
      requestGetRawTx: (obj?: { outputs: [] }) => void
      broadcast: ((requestBody: BroadcastKMS) => CancelablePromise<TransactionHashKMS>) & jest.Mock
    }
  }) => {
    describe('sendTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetRawTx()

        args.mock.broadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

        const result = await args.transactions.sendTransaction(
          args.getRequestBodyFromUTXO(args.data.validAmount),
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.data.validTxData }])
      })
    })

    describe('prepareSignedTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetRawTx()
        const txData = await args.transactions.prepareSignedTransaction(
          args.getRequestBodyFromUTXO(args.data.validAmount),
        )
        expect(txData).toBe(args.data.validTxData)
      })

      it('not enough money on balance', async () => {
        args.mock.requestGetRawTx()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(100500)),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_NOT_ENOUGH_BALANCE)
      })

      it('fee = 0', async () => {
        args.mock.requestGetRawTx()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(args.data.utxoAmount)),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_FEE_TOO_SMALL)
      })

      it('no outputs', async () => {
        args.mock.requestGetRawTx({ outputs: [] })

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(args.data.validAmount)),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_UTXO_NOT_FOUND)
      })
    })
  },
  fromAddress: <T>(args: {
    transactions: BtcBasedTx<T>
    getRequestBodyFromAddress: (amount: number) => T
    data: {
      utxoAmount: number
      validAmount: number
      validTxData: string
    }
    mock: {
      requestGetTxByAddress: (obj?: { outputs: [] }) => void
      broadcast: ((requestBody: BroadcastKMS) => CancelablePromise<TransactionHashKMS>) & jest.Mock
    }
  }) => {
    describe('sendTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetTxByAddress()

        args.mock.broadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

        const result = await args.transactions.sendTransaction(
          args.getRequestBodyFromAddress(args.data.validAmount),
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.data.validTxData }])
      })
    })

    describe('prepareSignedTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetTxByAddress()
        const txData = await args.transactions.prepareSignedTransaction(
          args.getRequestBodyFromAddress(args.data.validAmount),
        )
        expect(txData).toBe(args.data.validTxData)
      })

      it('not enough money on balance', async () => {
        args.mock.requestGetTxByAddress()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromAddress(100500)),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_NOT_ENOUGH_BALANCE)
      })

      it('fee = 0', async () => {
        args.mock.requestGetTxByAddress()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromAddress(args.data.utxoAmount)),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_FEE_TOO_SMALL)
      })
    })
  },
}
