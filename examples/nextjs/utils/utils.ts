import useSWR from 'swr'

export const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> => {
  const res = await fetch(input, init)
  return res.json()
}

export const useFetch = <JSON = any>(url: string) => useSWR<JSON>(url, fetcher)

