import axios from 'axios'
import { Constant } from '../util/constant'
import { Container, Service } from 'typedi'
import { version } from '../../package.json'
import { API_KEY } from '../util/di.tokens'
import { GetUrl, Post } from './connector.dto'

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
    return url.toString()
  }

  private headers() {
    return {
      'x-api-key': Container.get(API_KEY),
      'Content-Type': 'application/json',
      'User-Agent': `Tatum_SDK_JS/${version}`,
    }
  }
}
