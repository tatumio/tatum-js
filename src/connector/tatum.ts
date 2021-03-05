import axios from 'axios'
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry'
import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'
import { validateOrReject } from 'class-validator'
import { TATUM_API_URL, TATUM_RETRIES, TATUM_RETRY_DELAY } from '../constants'

// In case of 429 Too Many Requests response error, request is triggered again
axiosRetry(axios, {
  retryDelay: () => process.env.TATUM_RETRY_DELAY ? Number(process.env.TATUM_RETRY_DELAY) : TATUM_RETRY_DELAY,
  retries: process.env.TATUM_RETRIES ? Number(process.env.TATUM_RETRIES) : TATUM_RETRIES,
  retryCondition: (error) => isNetworkOrIdempotentRequestError(error) || error?.response?.status === 429
});

const baseUrl = () => process.env.TATUM_API_URL || TATUM_API_URL

const headers = () => ({ headers: { 'x-api-key': process.env.TATUM_API_KEY } })

export const get = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get(`${baseUrl()}${url}`, headers())
  return data
}

export const post = async <T extends object, U, V>(url: string, body?: U, classType?: ClassType<T>): Promise<V> => {
  await validateBody(body, classType)
  const { data } = await axios.post(`${baseUrl()}${url}`, body, headers())
  return data
}

export const put = async <T extends object, U, V>(url: string, body?: U, classType?: ClassType<T>): Promise<V> => {
  await validateBody(body, classType)
  const { data } = await axios.put(`${baseUrl()}${url}`, body, headers())
  return data
}

export const httpDelete = async (url: string): Promise<void> => {
  await axios.delete(url, headers())
}

export const validateBody = async <T extends object, U>(body: U, classType?: ClassType<T>): Promise<void> => {
  if (classType) {
    const classInstance = plainToClass(classType, body)
    await validateOrReject(classInstance)
  }
}
