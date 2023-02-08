import axios from 'axios'
import { Constant } from '../util/constant'
import { Container, Service } from 'typedi'
import { version } from '../../package.json'
import { CONFIG } from '../util/di.tokens'
import { GetUrl, Post } from './connector.dto'

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
    const { data } = await axios.get(this.getUrl({ path, params }), { headers: this.headers() })
    return data
  }

  public async post({ path, params, body }: Post) {
    const { data } = await axios.post(this.getUrl({ path, params }), body, { headers: this.headers() })
    return data
  }

  public async delete({ path, params }: GetUrl) {
    const { data } = await axios.delete(this.getUrl({ path, params }), { headers: this.headers() })
    return data
  }

  private getUrl({ path, params }: GetUrl) {
    const url = new URL(path, Constant.TATUM_API_URL)

    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    }

    const config = Container.get(CONFIG)

    if (config.testnet) {
      url.searchParams.append('testnet', config.testnet.toString())
    }

    return url.toString()
  }

  private headers() {
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': `Tatum_SDK_JS/${version}`,
    }
    const config = Container.get(CONFIG)

    if (config.apiKey) {
      return {
        ...headers,
        'x-api-key': config.apiKey,
      }
    }
    return headers
  }
}
