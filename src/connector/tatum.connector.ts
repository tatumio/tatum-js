import { Container, Service } from 'typedi'
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
    const url = externalUrl || this.getUrl({ path, params, basePath })
    const headers = await Utils.getHeaders(this.id)
    const request: RequestInit = {
      headers,
      method,
      body: body ? JSON.stringify(body) : null,
    }

    const start = Date.now()

    try {
      const res = await fetch(url, request)
      const end = Date.now() - start
      const responseBody = await res.clone().text()

      // Structure your log entry here
      Utils.log({
        id: this.id,
        message: `[${request.method}] ${url} -> ${res.status} (${end}ms)`,
        data: {
          request: {
            method: request.method,
            url: url,
            body: request.body,
          },
          response: {
            status: res.status,
            time: `${end}ms`,
            body: responseBody,
          },
          headers: Utils.headersToJson(headers),
        },
      })

      if (res.ok) {
        return await res.json()
      }

      // Retry only in case of 5xx error
      if (res.status >= 500 && res.status < 600) {
        return await this.retry(url, request, res, retry)
      }

      return await Promise.reject(responseBody)
    } catch (error) {
      const end = Date.now() - start
      Utils.log({
        id: this.id,
        message: `[${request.method}] ${url} -> (${end}ms)`,
        data: {
          request: {
            method: request.method,
            url: url,
            body: request.body,
          },
          error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
          time: `${end}ms`,
          headers: Utils.headersToJson(headers),
        },
      })
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
      basePath || (config.version === ApiVersion.V3 ? Constant.TATUM_API_URL.V3 : Constant.TATUM_API_URL.V4),
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

  private async retry<RESPONSE>(
    url: string,
    request: RequestInit,
    response: Response,
    retry: number,
  ): Promise<RESPONSE> {
    const { retryDelay, retryCount } = Container.of(this.id).get(CONFIG)
    if (!retryCount) {
      Utils.log({
        id: this.id,
        message: `Not retrying the request - no max retry count defined`,
        data: { url, requestBody: request.body },
      })
      return Promise.reject(await response.text())
    }

    if (retry >= retryCount) {
      Utils.log({
        id: this.id,
        message: `Not retrying the request for the '${retry}' time - exceeded max retry count ${retryCount}: `,
        data: { url, requestBody: request.body },
      })
      return Promise.reject(await response.text())
    }

    retry++

    await Utils.delay(retryDelay || 1000)
    Utils.log({
      id: this.id,
      message: `Retrying the request for the '${retry}' time: `,
      data: { url, requestBody: request.body },
    })
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
