import axios from 'axios'
import { Constant } from '../util/constant'
import { Container, Service } from 'typedi'
import { version } from '../../package.json'
import { CONFIG } from '../util/di.tokens'
import { GetUrl, Request } from './connector.dto'


if (process.env.DEBUG === 'true') {
  axios.interceptors.request.use(request => {
    console.log('Request', request.url, request.method, JSON.stringify(request.data))
    return request
  })

  axios.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response.data), response.status, response.statusText)
    return response
  })
}

@Service()
export class TatumConnector {
  public async get({ path, params }: GetUrl) {
    return this.request({ path, params, method: 'GET' })
  }

  public async post({ path, params, body }: Request) {
    return this.request({ path, params, body, method: 'POST' })
  }

  public async delete({ path, params }: GetUrl) {
    return this.request({ path, params, method: 'DELETE' })
  }

  private async request({ path, params, body, method }: Request) {
    try {
      const headers = this.headers()
      const { data } = await axios.request({ url: this.getUrl({ path, params }), headers, method, data: body })
      return data
    } catch (e) {
      // TODO: proper error handling
      console.log(e)
      return null
    }
  }

  private getUrl({ path, params }: GetUrl) {
    const url = new URL(path, Constant.TATUM_API_URL)

    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    }

    const config = Container.get(CONFIG)

    if (!config.apiKey && config.testnet === true) {
      url.searchParams.append('type', 'testnet')
    }

    return url.toString()
  }

  private headers() {
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': `Tatum_SDK_JS/${version}`,
    }
    const config = Container.get(CONFIG)

    return {
      ...headers,
      ...(config.apiKey) && { 'x-api-key': config.apiKey },
    }
  }
}
