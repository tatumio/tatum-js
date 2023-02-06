import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { GetBalance } from './nft.dto'

@Service()
export class Nft {
  private connector: TatumConnector = Container.get(TatumConnector);

  getBalance = async ({ chain, address }: GetBalance) => {
    return this.connector.get(`nft/address/balance/${chain}/${address}`)
  }
}
