/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResult } from './ApiResult'

export class ApiError extends Error {
  public readonly url: string
  public readonly status: number
  public readonly statusText: string
  public readonly body: any

  constructor(response: ApiResult, message: string) {
    super(response.body ? JSON.stringify(response.body) : message)

    this.name = 'ApiError'
    this.url = response.url
    this.status = response.status
    this.statusText = response.statusText
    this.body = response.body
  }
}
