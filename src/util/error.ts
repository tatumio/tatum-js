export enum Status {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ResponseDto<T> {
  /**
   * Actual payload of the response
   */
  data: T
  /**
   * Status of the response
   */
  status: Status
  /**
   * In case of ERROR status, this field contains the error message and detailed description
   */
  error?: ErrorWithMessage
}

type ErrorWithMessage = {
  message: string[] | object[]
  code?: string
  dashboardLog?: string
}

export const ErrorUtils = {
  tryFailTron: async <T>(f: (() => Promise<T>) | (() => T)): Promise<ResponseDto<T>> => {
    const response = await ErrorUtils.tryFail(f)

    type errorKey = keyof typeof response.data
    const error: errorKey = 'Error' as errorKey

    if (response.data[error]) {
      return {
        data: null as unknown as T,
        status: Status.ERROR,
        error: ErrorUtils.toErrorWithMessage(response.data[error]),
      }
    }

    return response
  },
  tryFail: async <T>(f: (() => Promise<T>) | (() => T)): Promise<ResponseDto<T>> => {
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
  tryFailBlob: async (f: (() => Promise<Blob>) | (() => Blob)): Promise<Blob | ResponseDto<null>> => {
    try {
      return await f()
    } catch (e) {
      return {
        data: null,
        status: Status.ERROR,
        error: ErrorUtils.toErrorWithMessage(e),
      }
    }
  },
  formatErrorMsg: (message: string) => {
    return message.replace('attr.', '')
  },
  toErrorWithMessage: (maybeError: unknown): ErrorWithMessage => {
    if (typeof maybeError === 'string') {
      try {
        const error = JSON.parse(maybeError as string)
        if (error.data instanceof Array && error.data.length > 0) {
          return {
            message: (error.data as string[]).map((message) => ErrorUtils.formatErrorMsg(message)),
            code: error.errorCode,
            dashboardLog: error.dashboardLog,
          }
        }

        return {
          message: [error.message ?? maybeError],
          code: error.errorCode,
          dashboardLog: error.dashboardLog,
        }
        // eslint-disable-next-line no-empty
      } catch (_) {}
    }

    if (ErrorUtils.isErrorWithMessage(maybeError)) {
      return { message: [maybeError.message], dashboardLog: maybeError.dashboardLog }
    }

    try {
      return {
        message: [JSON.stringify(maybeError, null, 2)],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dashboardLog: maybeError.dashboardLog,
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
  toErrorResponse<T>(error: ErrorWithMessage): ResponseDto<T> {
    return {
      data: null as unknown as T,
      status: Status.ERROR,
      error: error,
    }
  },
}
