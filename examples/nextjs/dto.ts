import { Status } from '../../src'
import { Network } from '@tatumcom/js'
import { NextApiRequest } from 'next'

export interface TatumConfig {
  apiKey: string
  network: Network
  active: boolean
}

export interface DeleteSubscriptionRequest extends NextApiRequest {
  query: {
    id: string
    apiKey: string
    network: Network
  }
}

export interface GetAllQueryRequest extends NextApiRequest {
  query: {
    pageSize: string
    offset: string
    apiKey: string
    network: Network
  }
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
