import ExpectExtendMap = jest.ExpectExtendMap
import { toThrowSdkErrorWithCode } from './lib/jest.extensions'

export * from './lib/test-fixtures/mock.helper'
export * from './lib/shared-testing'
export * from './lib/test.helper'
export * from './lib/test-data/eth.test-data'
export * from './lib/test-factory/wallet.test-factory'

export const expectExtendMap: ExpectExtendMap = {
  toThrowSdkErrorWithCode,
}
expect.extend(expectExtendMap)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toThrowSdkErrorWithCode(sdkErrorCode: string): Promise<R>
    }

    interface Expect {
      toThrowSdkErrorWithCode<T>(sdkErrorCode: string): JestMatchers<T>
    }
  }
}
