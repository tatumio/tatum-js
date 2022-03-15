import ExpectExtendMap = jest.ExpectExtendMap
import { toThrowErrorWithMessageThatIncludes, toThrowSdkErrorWithCode } from './lib/jest.extensions'

export * from './lib/test-fixtures/mock.helper'
export * from './lib/shared-testing'
export * from './lib/test.helper'
export * from './lib/test-data/eth.test-data'
export * from './lib/test-factory/wallet.test-factory'
export * from './lib/test-factory/common.test-factory'

export const expectExtendMap: ExpectExtendMap = {
  toThrowSdkErrorWithCode,
  toThrowErrorWithMessageThatIncludes,
}
expect.extend(expectExtendMap)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toThrowSdkErrorWithCode(sdkErrorCode: string): Promise<R>
      toThrowErrorWithMessageThatIncludes(message: string): Promise<R>
    }

    interface Expect {
      toThrowSdkErrorWithCode<T>(sdkErrorCode: string): JestMatchers<T>
      toThrowErrorWithMessageThatIncludes<T>(message: string): JestMatchers<T>
    }
  }
}
