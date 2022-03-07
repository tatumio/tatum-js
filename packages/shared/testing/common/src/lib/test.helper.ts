import { CancelablePromise } from '@tatumio/api-client'

type Fn0Args = () => CancelablePromise<unknown>
type Fn1Arg = (arg1: unknown) => CancelablePromise<unknown>
type Fn2Arg = (arg1: unknown, arg2: unknown) => CancelablePromise<unknown>
type Fn3Arg = (arg1: unknown, arg2: unknown, arg3: unknown) => CancelablePromise<unknown>
type Fn4Arg = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown) => CancelablePromise<unknown>

export type TestCasesApiCallMapping<T> = {
  [key in keyof T]:
    | Fn0Args
    | [Fn1Arg, unknown]
    | [Fn2Arg, unknown, unknown]
    | [Fn3Arg, unknown, unknown, unknown]
    | [Fn4Arg, unknown, unknown, unknown, unknown]
}

export const testHelper = {
  callFnWithArgs: async (fn: Fn0Args | Fn1Arg | Fn2Arg | Fn4Arg, args: unknown[]) => {
    switch (args.length) {
      case 0:
        await (fn as Fn0Args)()
        break
      case 1:
        await (fn as Fn1Arg)(args[0])
        break
      case 2:
        await (fn as Fn2Arg)(args[0], args[1])
        break
      case 3:
        await (fn as Fn3Arg)(args[0], args[1], args[2])
        break
      case 4:
        await (fn as Fn4Arg)(args[0], args[1], args[2], args[3])
        break
      default:
        throw new Error('Too many arguments')
    }
  },
  expectMockCalled: (mocked: jest.Mock, body?: unknown[]) => {
    expect(mocked.mock.calls.length).toBe(1)
    if (body) expect(mocked.mock.calls).toEqual([body])
  },
  testCasesFromMapping: <T>(mapping: TestCasesApiCallMapping<T>) => {
    const result = Object.entries(mapping).map(([key, value]) => {
      if (!(value instanceof Array)) return [key, value]

      if (value.length == 1) {
        return [key, value]
      } else {
        return [key, value[0], [value.splice(1)]]
      }
    })

    return result
  },
}
