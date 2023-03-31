import { CONFIG, Constant, Utils } from '../util'
import { Container, Service } from 'typedi'
import { version } from '../../package.json'
import { GetUrl, SdkRequest } from './connector.dto'
import { Network } from '../service'
import { JsonRpcCall } from '../dto'

@Service({
  factory: (data: { id: string }) => {
    return new TatumConnector(data.id)
  }, transient: true,
})
export class TatumConnector {

  constructor(private readonly id: string) {
  }

  public async get<T>({ path, params }: GetUrl) {
    return this.request<T>({ path, params, method: 'GET' })
  }

  public async rpcCall<T>(url: string, body: JsonRpcCall) {
    return this.request<T>({ body, method: 'POST' }, 0, url)
  }

  public async post<T>({ path, params, body }: SdkRequest) {
    return this.request<T>({ path, params, body, method: 'POST' })
  }

  public async delete<T>({ path, params }: GetUrl) {
    return this.request<T>({ path, params, method: 'DELETE' })
  }

  private async request<T>({ path, params, body, method }: SdkRequest, retry = 0, externalUrl?: string): Promise<T> {
    const { verbose } = Container.of(this.id).get(CONFIG)

    const url = externalUrl || this.getUrl({ path, params })
    const headers = await this.headers(retry)
    const request: RequestInit = {
      headers,
      method,
      body: body ? JSON.stringify(body) : null,
    }

    if (verbose) {
      console.debug('Request: ', request.method, url, request.body)
    }
    try {
      return await fetch(url, request).then(async (res) => {
        if (verbose) {
          console.log('Response: ', res.status, await res.clone().text())
        }
        if (res.ok) {
          return res.json()
        }

        return this.retry(url, request, res)
      })
    } catch (error) {
      if (verbose) {
        console.warn('Error: ', error)
      }
      return Promise.reject(error)
    }
  }

  private getUrl({ path, params }: GetUrl) {
    const url = new URL(path || '', Constant.TATUM_API_URL)

    if (params) {
      Object.keys(params)
        .filter((key) => !!params[key])
        .forEach((key) => url.searchParams.append(key, params[key] as string))
    }

    const config = Container.of(this.id).get(CONFIG)

    if (config.network === Network.Testnet) {
      url.searchParams.append('type', 'testnet')
    }

    return url.toString()
  }

  private async headers(retry: number) {
    const config = Container.of(this.id).get(CONFIG)
    return new Headers({
      'Content-Type': 'application/json',
      'x-ttm-sdk-version': version,
      'x-ttm-sdk-product': 'JS',
      'x-ttm-sdk-debug': `${config.verbose}`,
      'x-ttm-sdk-retry': `${retry}`,
    })
  }

  private async retry(url: string, request: RequestInit, response: Response) {
    const { retryDelay, retryCount, verbose } = Container.of(this.id).get(CONFIG)
    if (!retryCount) {
      if (verbose) {
        console.warn(`Not retrying the request - no max retry count defined: `, url, request.body)
      }
      return Promise.reject(await response.text())
    }
    const retry = parseInt(response.headers.get('x-ttm-sdk-retry') || `${retryCount}`) + 1
    if (retry >= retryCount) {
      if (verbose) {
        console.warn(`Not retrying the request for the '${retry}' time - exceeded max retry count ${retryCount}: `, url, request.body)
      }
      return Promise.reject(await response.text())
    }

    if (verbose) {
      console.warn(`Retrying the request for the '${retry}' time: `, url, request.body)
    }
    await Utils.delay(retryDelay || 1000)
    return this.request({
      method: request.method as string,
      body: request.body ? JSON.parse(request.body as string) : null,
    }, retry, url)
  }
}
