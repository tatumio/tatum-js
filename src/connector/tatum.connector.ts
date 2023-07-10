import { Container, Service } from 'typedi'
import { version } from '../../package.json'
import { JsonRpcCall } from '../dto'
import { ApiVersion } from '../service'
import { CONFIG, Constant, Utils } from '../util'
import { DefaultBodyType, DefaultParamsType, GetUrl, SdkRequest } from './connector.dto'

@Service({
  factory: (data: { id: string }) => {
    return new TatumConnector(data.id)
  },
  transient: true,
})
export class TatumConnector {
  constructor(private readonly id: string) {}

  public async get<RESPONSE, PARAMS extends DefaultParamsType = DefaultParamsType>(request: GetUrl<PARAMS>) {
    return this.request<RESPONSE, PARAMS>({ ...request, method: 'GET' })
  }

  public async rpcCall<RESPONSE>(url: string, body: JsonRpcCall | JsonRpcCall[]) {
    return this.request<RESPONSE>({ body, method: 'POST' }, 0, url)
  }

  public async post<RESPONSE, BODY extends DefaultBodyType = DefaultBodyType>(
    request: SdkRequest<DefaultParamsType, BODY>,
  ) {
    return this.request<RESPONSE, DefaultParamsType, BODY>({ ...request, method: 'POST' })
  }

  public async delete<RESPONSE>(request: GetUrl) {
    return this.request<RESPONSE>({ ...request, method: 'DELETE' })
  }

  private async request<
    RESPONSE,
    PARAMS extends DefaultParamsType = DefaultParamsType,
    BODY extends DefaultBodyType = DefaultBodyType,
  >(
    { path, params, body, method, basePath }: SdkRequest<PARAMS, BODY>,
    retry = 0,
    externalUrl?: string,
  ): Promise<RESPONSE> {
    const { verbose } = Container.of(this.id).get(CONFIG)

    const url = externalUrl || this.getUrl({ path, params, basePath })
    const headers = await this.headers(retry)
    const request: RequestInit = {
      headers,
      method,
      body: body ? JSON.stringify(body) : null,
    }

    const start = Date.now()
    if (verbose) {
      console.debug(new Date().toISOString(), 'Request: ', request.method, url, request.body)
    }
    try {
      return await fetch(url, request).then(async (res) => {
        const end = Date.now() - start
        if (verbose) {
          console.log(
            new Date().toISOString(),
            `Response received in ${end}ms: `,
            res.status,
            await res.clone().text(),
          )
        }
        if ([204, 304, 101, 100].includes(res.status)) {
          return
        }

        if (res.ok) {
          return res.json()
        }

        return this.retry(url, request, res)
      })
    } catch (error) {
      if (verbose) {
        console.warn(new Date().toISOString(), 'Error: ', JSON.stringify(error))
      }
      return Promise.reject(error)
    }
  }

  private getUrl<PARAMS extends DefaultParamsType = DefaultParamsType>({
    path,
    params,
    basePath,
  }: GetUrl<PARAMS>) {
    const config = Container.of(this.id).get(CONFIG)
    const url = new URL(
      path || '',
      basePath || (config.version === ApiVersion.V1 ? Constant.TATUM_API_URL.V1 : Constant.TATUM_API_URL.V2),
    )

    if (params) {
      Object.keys(params)
        .filter((key) => !!params[key])
        .forEach((key) => url.searchParams.append(key, `${params[key]}`))
    }

    if (!Object.keys(config.apiKey || {})?.length && Constant.RPC.TESTNETS.includes(config.network)) {
      url.searchParams.append('type', 'testnet')
    }

    return url.toString()
  }

  private async headers(retry: number) {
    const config = Container.of(this.id).get(CONFIG)
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-ttm-sdk-version': version,
      'x-ttm-sdk-product': 'JS',
      'x-ttm-sdk-debug': `${config.verbose}`,
      'x-ttm-sdk-retry': `${retry}`,
    })
    if (config.apiKey) {
      if (config.version === ApiVersion.V1 && config.apiKey.v1) {
        headers.append('x-api-key', config.apiKey.v1)
      } else if (config.version === ApiVersion.V2 && config.apiKey.v2) {
        headers.append('x-api-key', config.apiKey.v2)
      }
    }
    return headers
  }

  private async retry(url: string, request: RequestInit, response: Response) {
    const { retryDelay, retryCount, verbose } = Container.of(this.id).get(CONFIG)
    if (!retryCount) {
      if (verbose) {
        console.warn(
          new Date().toISOString(),
          `Not retrying the request - no max retry count defined: `,
          url,
          request.body,
        )
      }
      return Promise.reject(await response.text())
    }
    const retry = parseInt(response.headers.get('x-ttm-sdk-retry') || `${retryCount}`) + 1
    if (retry >= retryCount) {
      if (verbose) {
        console.warn(
          new Date().toISOString(),
          `Not retrying the request for the '${retry}' time - exceeded max retry count ${retryCount}: `,
          url,
          request.body,
        )
      }
      return Promise.reject(await response.text())
    }
    await Utils.delay(retryDelay || 1000)
    if (verbose) {
      console.warn(
        new Date().toISOString(),
        `Retrying the request for the '${retry}' time: `,
        url,
        request.body,
      )
    }
    return this.request(
      {
        method: request.method as string,
        body: request.body ? JSON.parse(request.body as string) : null,
      },
      retry,
      url,
    )
  }
}
