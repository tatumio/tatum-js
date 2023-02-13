import { ResponseDto, Status } from '../dto/shared.dto'

type ErrorWithMessage = {
  message: string
}

export const ErrorUtils = {
  tryFail: async <T>(
    f: (() => Promise<T>) | (() => T),
  ): Promise<ResponseDto<T>> => {
    try {
      const data = await f()
      return {
        data,
        status: Status.SUCCESS,
      }
    } catch (e) {
      return {
        status: Status.ERROR,
        error: ErrorUtils.getErrorMsg(e),
      }
    }
  },
  toErrorWithMessage: (maybeError: unknown): ErrorWithMessage => {
    if (ErrorUtils.isErrorWithMessage(maybeError)) return maybeError

    try {
      return new Error(JSON.stringify(maybeError))
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return new Error(String(maybeError))
    }
  },
  isErrorWithMessage(e: unknown): e is ErrorWithMessage {
    return (
      typeof e === 'object' &&
      e !== null &&
      'message' in e &&
      typeof (e as Record<string, unknown>).message === 'string'
    )
  },
  getErrorMsg: (e: unknown): string => ErrorUtils.toErrorWithMessage(e).message,
}
