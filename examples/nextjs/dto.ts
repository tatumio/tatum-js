import { Network } from '@tatumcom/js'
import { Status } from '../../src'

export interface TatumConfig {
  apiKey: string
  network: Network
  active: boolean
}

type ErrorWithMessage = {
  message: string | object | object[]
  code?: string
}

export interface ResponseDto<T> {
  data: T
  status: Status,
  error?: ErrorWithMessage
}
