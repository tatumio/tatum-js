export const testHelper = {
  callFnWithArgs: async (fn: any, args: unknown[]) => {
    switch (args.length) {
      case 0:
        await fn()
        break
      case 1:
        await fn(args[0])
        break
      case 2:
        await fn(args[0], args[1])
        break
      default:
        throw new Error('Too many arguments')
    }
  },
  expectMockCalled: (mocked: jest.Mock, body?: unknown[]) => {
    expect(mocked.mock.calls.length).toBe(1)
    if (body) expect(mocked.mock.calls).toEqual([body])
  },
}
