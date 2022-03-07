import { SdkError, SdkErrorCode, SdkErrorMessage } from '../errors.abstract.sdk'
import { ApiError } from '@tatumio/api-client'

describe('SdkError', () => {
  it('By code', async () => {
    const err = new SdkError({ code: SdkErrorCode.API_ERROR })

    expect(err.errorCode).toBe(SdkErrorCode.API_ERROR)
    expect(err.errorMessage).toBe(SdkErrorMessage[SdkErrorCode.API_ERROR])
  })

  describe('With original error', () => {
    it('wraps itself', async () => {
      const err1 = new SdkError({ code: SdkErrorCode.API_ERROR })
      const err2 = new SdkError({ originalError: err1 })

      expect(err1).toStrictEqual(err2)
    })

    it('originalError is Error', async () => {
      const err1 = new Error('123')
      const err2 = new SdkError({ originalError: err1 })

      expect(err2.errorCode).toBe(SdkErrorCode.COMMON_ERROR)
      expect(err2.errorMessage).toBe(SdkErrorMessage[SdkErrorCode.COMMON_ERROR])
      expect(err2.originalError).toBe(err1.message)
    })

    it('originalError is ApiError', async () => {
      const err1 = new ApiError(
        {
          statusText: 'statusText',
          url: 'url',
          status: 500,
          ok: false,
          body: 'body',
        },
        'message',
      )

      const err2 = new SdkError({ originalError: err1 })

      expect(err2.errorCode).toBe(SdkErrorCode.API_ERROR)
      expect(err2.errorMessage).toBe(SdkErrorMessage[SdkErrorCode.API_ERROR])
      expect(err2.originalError).toBe(err1)
    })
  })
})
