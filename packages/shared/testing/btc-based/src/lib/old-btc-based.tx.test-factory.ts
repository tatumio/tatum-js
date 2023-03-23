import '@tatumio/shared-testing-common'
import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { testHelper } from '@tatumio/shared-testing-common'
import { BroadcastKMS, CancelablePromise, TransactionHash } from '@tatumio/api-client'

//deprecated - should be removed after
export const oldBtcBasedTxTestFactory = {
  fromUTXO: <T, TX>(args: {
    transactions: BtcBasedTx<T>
    getRequestBodyFromUTXO: (amount: number) => T
    data: {
      utxoAmount: number
      validAmount: number
      validTxData: string
    }
    mock: {
      requestGetRawTx: (obj?: unknown) => void
      requestGetUtxo: (obj?: unknown) => void
      requestGetUtxoNotFound: () => void
      broadcast: ((requestBody: BroadcastKMS) => CancelablePromise<TransactionHash>) & jest.Mock
    }
    skipTest?: {
      noOutputs?: boolean
      txNotFound?: boolean
    }
  }) => {
    const options = { testnet: true }

    describe('sendTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetRawTx()
        args.mock.requestGetUtxo()

        args.mock.broadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

        const result = await args.transactions.sendTransaction(
          args.getRequestBodyFromUTXO(args.data.validAmount),
          options,
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.data.validTxData }])
      })
    })

    // @TODO Add tests KMS

    describe('prepareSignedTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetRawTx()
        args.mock.requestGetUtxo()
        const txData = await args.transactions.prepareSignedTransaction(
          args.getRequestBodyFromUTXO(args.data.validAmount),
          options,
        )
        expect(txData).toBe(args.data.validTxData)
      })

      it('not enough money on balance', async () => {
        args.mock.requestGetRawTx()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(100500), options),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
      })

      it('fee = 0', async () => {
        args.mock.requestGetRawTx()
        args.mock.requestGetUtxo()

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(args.data.utxoAmount), {
            testnet: true,
          }),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_FEE_TOO_SMALL)
      })

      if (!args.skipTest?.txNotFound) {
        it('utxo not found', async () => {
          args.mock.requestGetUtxoNotFound()

          await expect(
            args.transactions.prepareSignedTransaction(args.getRequestBodyFromUTXO(args.data.validAmount), {
              testnet: true,
            }),
          ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND)
        })
      }
    })
  },
  fromAddress: <T, TX>(args: {
    transactions: BtcBasedTx<T>
    getRequestBodyFromAddress: (amount: number) => T
    data: {
      validAmount: number
      validTxData: string
    }
    mock: {
      requestGetUtxo: (obj?: unknown) => void
      requestGetUtxoNotFound: () => void
      broadcast: ((requestBody: BroadcastKMS) => CancelablePromise<TransactionHash>) & jest.Mock
    }
  }) => {
    const options = { testnet: true }
    describe('sendTransaction', () => {
      it('valid', async () => {
        args.mock.requestGetUtxo()

        args.mock.broadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

        const result = await args.transactions.sendTransaction(
          args.getRequestBodyFromAddress(args.data.validAmount),
          options,
        )
        expect(result.txId).toBe('12345')
        testHelper.expectMockCalled(args.mock.broadcast, [{ txData: args.data.validTxData }])
      })
    })

    // @TODO Add tests KMS

    describe('prepareSignedTransaction', () => {
      it('valid', async () => {
        const txData = await args.transactions.prepareSignedTransaction(
          args.getRequestBodyFromAddress(args.data.validAmount),
          options,
        )
        expect(txData).toBe(args.data.validTxData)
      })

      it('not enough money on balance', async () => {

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromAddress(100500), {
            testnet: true,
          }),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE)
      })

      it('fee = 0', async () => {

        await expect(
          args.transactions.prepareSignedTransaction(args.getRequestBodyFromAddress(args.data.validAmount + 1), {
            testnet: true,
          }),
        ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.BTC_BASED_FEE_TOO_SMALL)
      })
    })
  },
}
