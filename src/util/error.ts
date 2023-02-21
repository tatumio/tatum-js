import axios from 'axios'

export enum Status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ResponseDto<T> {
  data: T
  status: Status,
  error?: ErrorWithMessage
}

type ErrorWithMessage = {
  message: string[] | object[]
  code?: string
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
        error: ErrorUtils.toErrorWithMessage(e),
      }
    }
  },
  formatErrorMsg: (message: string) => {
    return message.replace('attr.', '')
  },
  toErrorWithMessage: (maybeError: unknown): ErrorWithMessage => {
    if (axios.isAxiosError(maybeError)) {
      if (maybeError.response?.data?.data instanceof Array && maybeError.response?.data?.data.length > 0) {
        return {
          message: (maybeError.response?.data?.data as string[]).map(message => ErrorUtils.formatErrorMsg(message)),
          code: maybeError.response?.data?.errorCode,
        }
      }

      return {
        message: [maybeError.response?.data?.message ?? maybeError.message],
        code: maybeError.response?.data?.errorCode,
      }
    }

    if (ErrorUtils.isErrorWithMessage(maybeError)) {
      return { message: [maybeError.message] }
    }

    try {
      return {
        message: [JSON.stringify(maybeError, null, 2)],
      }
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return { message: [String(maybeError)] }
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
}
