import { ResponseDto, Status } from '../dto/shared.dto'
import axios from 'axios'

type ErrorWithMessage = {
  message: string
  errorCode?: string
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
        data: null as unknown as T,
        status: Status.ERROR,
        error: ErrorUtils.getErrorMsg(e),
      }
    }
  },
  toErrorWithMessage: (maybeError: unknown): ErrorWithMessage => {
    if (axios.isAxiosError(maybeError)) {
      return {
        message: maybeError.response?.data?.message ?? maybeError.message,
        errorCode: maybeError.response?.data?.errorCode,
      }
    }

    if (ErrorUtils.isErrorWithMessage(maybeError)) {
      return maybeError
    }

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
