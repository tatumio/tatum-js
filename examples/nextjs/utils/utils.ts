import useSWR from 'swr'
import { TatumConfig } from '../dto'
import { Dispatch, useContext, useEffect, useState } from 'react'
import { ApiKeyContext } from '../app/layout'
import { Network } from '@tatumcom/js'

export const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> => {
  const res = await fetch(input, init)
  return res.json()
}

export const useFetch = <JSON = any>(url: string) => {
  const { apiKey } = useContext(ApiKeyContext)
  const fullUrl = new URL(`${window.location.origin}${url}`)
  fullUrl.searchParams.append('apiKey', apiKey.apiKey)
  fullUrl.searchParams.append('network', apiKey.network)
  return useSWR<JSON>(fullUrl.toString(), fetcher)
}

export const isSSR = typeof window === 'undefined'

const getStorageValue = <T>(key: string, defaultValue: T) => {
  // getting stored value
  if (!isSSR) {
    const saved = localStorage.getItem(key)
    const initial = saved !== null ? JSON.parse(saved) : defaultValue
    return initial
  }
}

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, Dispatch<T>] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export const useApiKeys = () => {
  const defaultApiKey = {
    apiKey: '452826a8-5cd4-4c46-b710-e130934b5102',
    network: Network.Testnet,
    active: true,
  }

  const [apiKeys, setApiKeys] = useLocalStorage<TatumConfig[]>('apiKeys', [defaultApiKey])
  const [apiKey, setApiKey] = useState<TatumConfig>(defaultApiKey)


  useEffect(() => {
    if (apiKeys.length > 0) {
      const activeApiKey = apiKeys.find((apiKey) => apiKey.active)
      if (activeApiKey) {
        setApiKey(activeApiKey)
      }
    }
  }, [apiKeys])

  const add = (apiKey: TatumConfig) => setApiKeys([...apiKeys, apiKey])
  const activate = (config: TatumConfig) => {
    setApiKeys(apiKeys.map(key => {
      if (key.apiKey === config.apiKey) {
        return {
          ...key,
          active: true,
        }
      }
      return {
        ...key,
        active: false,
      }
    }))
  }

  const remove = (id: string) => {
    if (apiKeys.length > 1) {
      setApiKeys(apiKeys.filter(key => key.apiKey !== id))
    }
  }


  return {
    apiKeys,
    apiKey: apiKey as TatumConfig,
    add,
    activate,
    remove,
  }
}
