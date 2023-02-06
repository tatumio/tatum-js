import axios from 'axios'
import { Constant } from '../utils/constant'
import { Container, Service } from 'typedi'
import { version } from '../../package.json'
import { API_KEY } from '../utils/di.tokens'

@Service()
export class TatumConnector {
  public async get(url: string) {
    return axios.get(`${Constant.TATUM_API_URL}${url}`, { headers: this.headers() })
  }

  public async post(url: string, body: object) {
    return axios.post(`${Constant.TATUM_API_URL}${url}`, body, { headers: this.headers() })
  }

  private headers() {
    return {
      'x-api-key': Container.get(API_KEY),
      'Content-Type': 'application/json',
      'User-Agent': `Tatum_SDK_JS/${version}`,
    }
  }
}
