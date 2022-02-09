import { TestCasesApiCallMapping, testHelper } from '../test.helper'

export const blockchainTestFactory = {
  apiMethods: <T>(blockchain: T, blockchainFunctionsMapping: TestCasesApiCallMapping<T>) => {
    it.each(testHelper.testCasesFromMapping(blockchainFunctionsMapping))('%p', (async (
      sdkMethod: any,
      apiMethod: any,
      args: unknown[] = [],
    ) => {
      await testHelper.callFnWithArgs((blockchain as any)[sdkMethod], args)
      testHelper.expectMockCalled(apiMethod, args)
    }) as (...args: unknown[]) => any)
  },
}
