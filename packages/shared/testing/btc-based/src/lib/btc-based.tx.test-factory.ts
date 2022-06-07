import '@tatumio/shared-testing-common'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { testHelper } from '@tatumio/shared-testing-common'
import { BroadcastKMS, CancelablePromise, TransactionHashKMS } from '@tatumio/api-client'

export const btcBasedTxTestFactory = {
  fromUTXO: <T, TX>(args: {
    transactions: BtcBasedTx<T, TX>
    getRequestBodyFromUTXO: (amount: number) => T
    data: {
      utxoAmount: number
      validAmount: number
      validTxData: string
    }
    mock: {
      requestGetRawTx: (obj?: unknown) => void
      requestGetRawTxNotFound: () => void
      broadcast: ((requestBody: BroadcastKMS) => CancelablePromise<TransactionHashKMS>) & jest.Mock
    }
    skipTest?: {
      noOutputs?: boolean
      txNotFound?: boolean
    }
  }) => {
    describe('sendTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetRawTx()

        args.mock.broadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

        const result = await args.transactions.sendTransaction(
          args.getRequestBodyFromUTXO(args.data.validAmount),
          { testnet: true },
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.data.validTxData }])
      })
    })

    // @TODO Add tests KMS

    describe('prepareSignedTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetRawTx()
        const txData = await args.transactions.prepareSignedTransaction(
          args.getRequestBodyFromUTXO(args.data.validAmount),
          { testnet: true },
        )
        expect(txData).toBe(args.data.validTxData)
      })

      it('not enough money on balance', async () => {
        args.mock.requestGetRawTx()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(100500), { testnet: true }),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_NOT_ENOUGH_BALANCE)
      })

      it('fee = 0', async () => {
        args.mock.requestGetRawTx()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(args.data.utxoAmount), {
            testnet: true,
          }),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_FEE_TOO_SMALL)
      })

      if (!args.skipTest?.noOutputs) {
        it('no outputs', async () => {
          args.mock.requestGetRawTx({ outputs: [], vout: [] })

          await expect(
            args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(args.data.validAmount), {
              testnet: true,
            }),
          ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_UTXO_NOT_FOUND)
        })
      }

      if (!args.skipTest?.txNotFound) {
        it('tx not found', async () => {
          args.mock.requestGetRawTxNotFound()

          await expect(
            args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(args.data.validAmount), {
              testnet: true,
            }),
          ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.API_ERROR)
        })
      }
    })
  },
  fromAddress: <T, TX>(args: {
    transactions: BtcBasedTx<T, TX>
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
          { testnet: true },
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.data.validTxData }])
      })
    })

    // @TODO Add tests KMS

    describe('prepareSignedTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetTxByAddress()
        const txData = await args.transactions.prepareSignedTransaction(
          args.getRequestBodyFromAddress(args.data.validAmount),
          { testnet: true },
        )
        expect(txData).toBe(args.data.validTxData)
      })

      it('not enough money on balance', async () => {
        args.mock.requestGetTxByAddress()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromAddress(100500), {
            testnet: true,
          }),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_NOT_ENOUGH_BALANCE)
      })

      it('fee = 0', async () => {
        args.mock.requestGetTxByAddress()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromAddress(args.data.utxoAmount), {
            testnet: true,
          }),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_FEE_TOO_SMALL)
      })
    })
  },
}
