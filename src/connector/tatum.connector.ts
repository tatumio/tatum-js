import axios from 'axios'
import { Constant } from '../utils/constant'
import { Service } from 'typedi'
import { version } from '../../package.json'

@Service()
export class TatumConnector {

  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  public async get(url: string) {
    return axios.get(`${Constant.TATUM_API_URL}${url}`, { headers: this.headers() })
  }

  public async post(url: string, body: object) {
    return axios.post(`${Constant.TATUM_API_URL}${url}`, body, { headers: this.headers() })
  }

  private headers() {
    return {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'User-Agent': `Tatum_SDK_JS/${version}`,
    }
  }
}
