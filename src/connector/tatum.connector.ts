import process from 'process'
import { Container, Service } from 'typedi'
import { JsonRpcCall } from '../dto'
import { ApiVersion } from '../service'
import { CONFIG, Constant, EnvUtils, Utils } from '../util'
import { DefaultBodyType, DefaultParamsType, FileUploadRequest, GetUrl, SdkRequest } from './connector.dto'

@Service({
  factory: (data: { id: string }) => {
    return new TatumConnector(data.id)
  },
  transient: true,
})
export class TatumConnector {
  constructor(private readonly id: string) {}

  public async get<RESPONSE, PARAMS extends DefaultParamsType = DefaultParamsType>(request: GetUrl<PARAMS>) {
    return this.request<RESPONSE, PARAMS>({ ...request, method: 'GET' }) as Promise<RESPONSE>
  }

  public async rpcCall<RESPONSE>(url: string, body: JsonRpcCall | JsonRpcCall[]) {
    return this.request<RESPONSE>({ body, method: 'POST' }, 0, url) as Promise<RESPONSE>
  }

  public async post<RESPONSE, BODY extends DefaultBodyType = DefaultBodyType>(
    request: SdkRequest<DefaultParamsType, BODY>,
  ) {
    return this.request<RESPONSE, DefaultParamsType, BODY>({
      ...request,
      method: 'POST',
    }) as Promise<RESPONSE>
  }

  public async put<RESPONSE, BODY extends DefaultBodyType = DefaultBodyType>(
    request: SdkRequest<DefaultParamsType, BODY>,
  ) {
    return this.request<RESPONSE, DefaultParamsType, BODY>({
      ...request,
      method: 'PUT',
    }) as Promise<RESPONSE>
  }

  public async delete<RESPONSE>(request: GetUrl) {
    return this.request<RESPONSE>({ ...request, method: 'DELETE' }) as Promise<RESPONSE>
  }

  public async uploadFile<RESPONSE>(request: FileUploadRequest) {
    const formData = new FormData()
    formData.append('file', new Blob([request.body]))
    return this.request<RESPONSE>({ ...request, method: 'POST', body: formData }, 0) as Promise<RESPONSE>
  }

  public async getFile<RESPONSE, PARAMS extends DefaultParamsType = DefaultParamsType>(
    request: GetUrl<PARAMS>,
  ) {
    return this.request<RESPONSE, PARAMS>({ ...request, method: 'GET', isDownload: true }) as Promise<Blob>
  }

  private async request<
    RESPONSE,
    PARAMS extends DefaultParamsType = DefaultParamsType,
    BODY extends DefaultBodyType = DefaultBodyType,
  >(
    { path, params, body, method, basePath, isDownload }: SdkRequest<PARAMS, BODY>,
    retry = 0,
    externalUrl?: string,
  ): Promise<RESPONSE | Blob | undefined> {
    const url = externalUrl || this.getUrl({ path, params, basePath })
    const isUpload = body && body instanceof FormData
    const headers = isUpload ? Utils.getBasicHeaders(this.id) : Utils.getHeaders(this.id)

    let requestBody: string | FormData | null = null
    if (isUpload) {
      requestBody = body
    } else if (body) {
      requestBody = JSON.stringify(body)
    }

    const request: RequestInit = {
      headers: headers,
      method,
      body: requestBody,
    }

    const start = Date.now()

    try {
      const res = await fetch(url, request)
      const end = Date.now() - start
      const responseBody = isDownload ? `Binary data` : await res.clone().text()

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
        if (!responseBody) {
          return undefined
        }
        if (isDownload) {
          return await res.blob()
        }
        const response = await res.json()
        if (response?.error) {
          return await this.retry(url, request, res, retry)
        }
        return response
      }

      // Retry only in case of 5xx error
      if (res.status >= 500 && res.status < 600) {
        return await this.retry(url, request, res, retry)
      }

      throw responseBody
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

  private getBaseUrl() {
    const config = Container.of(this.id).get(CONFIG)
    if (EnvUtils.isProcessAvailable() && process.env?.TATUM_URL) {
      return process.env.TATUM_URL
    }
    return config.version === ApiVersion.V3 ? Constant.TATUM_API_URL.V3 : Constant.TATUM_API_URL.V4
  }

  private getUrl<PARAMS extends DefaultParamsType = DefaultParamsType>({
    path,
    params,
    basePath,
  }: GetUrl<PARAMS>) {
    const config = Container.of(this.id).get(CONFIG)
    const base = basePath || this.getBaseUrl()

    const url = new URL(path && path?.length > 1 ? `${base}${path}` : base)

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
  ): Promise<RESPONSE | Blob | undefined> {
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
