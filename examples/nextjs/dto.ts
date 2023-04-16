import { Status } from '../../src'
import { NextApiRequest } from 'next'

export interface TatumConfig {
  apiKey: string
  active: boolean
}

export interface DeleteSubscriptionRequest extends NextApiRequest {
  query: {
    id: string
    apiKey: string
  }
}

export interface GetAllQueryRequest extends NextApiRequest {
  query: {
    pageSize: string
    offset: string
    apiKey: string
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
