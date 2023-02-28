import useSWR from 'swr'
import { TatumConfig } from '../dto'
import { Dispatch, useEffect, useState } from 'react'

export const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> => {
  const res = await fetch(input, init)
  return res.json()
}

export const useFetch = <JSON = any>(url: string) => useSWR<JSON>(url, fetcher)

export const isSSR = typeof window === 'undefined'

const getStorageValue = <T>(key: string, defaultValue: T) => {
  // getting stored value
  if (!isSSR) {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
}

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, Dispatch<T> ] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useLocalStorage<TatumConfig[]>('apiKeys', [])
  const [apiKey, setApiKey] = useState<TatumConfig>()


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
    setApiKeys(apiKeys.filter(key => key.apiKey !== id))
  }


  return {
    apiKeys,
    apiKey,
    add,
    activate,
    remove,
  }
}
