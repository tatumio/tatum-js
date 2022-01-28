/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export class CancelError extends Error {
  constructor(reason: string = 'Promise was canceled') {
    super(reason)
    this.name = 'CancelError'
  }

  public get isCancelled(): boolean {
    return true
  }
}

export interface OnCancel {
  readonly isPending: boolean
  readonly isCancelled: boolean

  (cancelHandler: () => void): void
}

export type CancelablePromise<T> = Promise<T>
