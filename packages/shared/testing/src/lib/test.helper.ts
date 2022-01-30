type Fn = () => Promise<unknown>
type Fn1Arg = (arg1: unknown) => Promise<unknown>
type Fn2Arg = (arg1: unknown, arg2: unknown) => Promise<unknown>

export const testHelper = {
  callFnWithArgs: async (fn: Fn | Fn1Arg | Fn2Arg, args: unknown[]) => {
    switch (args.length) {
      case 0:
        await (fn as Fn)()
        break
      case 1:
        await (fn as Fn1Arg)(args[0])
        break
      case 2:
        await (fn as Fn2Arg)(args[0], args[1])
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
