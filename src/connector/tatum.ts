import a from 'axios';
import axiosRetry, {isNetworkOrIdempotentRequestError} from 'axios-retry';
import {plainToClass} from 'class-transformer';
import {validateOrReject} from 'class-validator';
import FormData from 'form-data';
import http from 'http';
import https from 'https';
import { version } from '../../package.json'
import {TATUM_API_URL, TATUM_RETRIES, TATUM_RETRY_DELAY} from '../constants';
import {ClassConstructor} from "class-transformer/types/interfaces";

export const axios = a.create({
  httpAgent: new http.Agent({keepAlive: true}),
  httpsAgent: new https.Agent({keepAlive: true})
});

// In case of 429 Too Many Requests response error, request is triggered again
axiosRetry(axios, {
  retryDelay: () => process.env.TATUM_RETRY_DELAY ? Number(process.env.TATUM_RETRY_DELAY) : TATUM_RETRY_DELAY,
  retries: process.env.TATUM_RETRIES ? Number(process.env.TATUM_RETRIES) : TATUM_RETRIES,
  retryCondition: (error) => isNetworkOrIdempotentRequestError(error) || error?.response?.status === 429
});

const baseUrl = () => process.env.TATUM_API_URL || TATUM_API_URL;

const headers = () => ({headers: {'x-api-key': process.env.TATUM_API_KEY, 'x-testnet-type': process.env.TESTNET_TYPE || 'ethereum-ropsten', 'User-Agent': `Tatum_SDK_JS/${version}`,}});

export const get = async <T>(url: string): Promise<T> => {
  const { data } = await axios.get(`${baseUrl()}${url}`, headers())
  return data
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const post = async <T extends object, U, V>(url: string, body?: U, classType?: ClassConstructor<T>): Promise<V> => {
  await validateBody(body, classType);
  const {data} = await axios.post(`${baseUrl()}${url}`, body, headers());
  return data;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const postMultiForm = async (url: string, body: FormData): Promise<any> => {
  const h = headers();
  h.headers = {...h.headers, ...body.getHeaders()};
  const {data} = await axios.post(`${baseUrl()}${url}`, body, h);
  return data;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const put = async <T extends object, U, V>(url: string, body?: U, classType?: ClassConstructor<T>): Promise<V> => {
  await validateBody(body, classType)
  const { data } = await axios.put(`${baseUrl()}${url}`, body, headers())
  return data
}

export const httpDelete = async (url: string): Promise<void> => {
  await axios.delete(`${baseUrl()}${url}`, headers())
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const validateBody = async <T extends object, U>(body: U, classType?: ClassConstructor<T>): Promise<void> => {
  if (classType) {
    const classInstance = plainToClass(classType, body)
    await validateOrReject(classInstance)
  }
}
