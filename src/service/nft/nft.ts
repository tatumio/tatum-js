import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { GetBalance, GetBalanceResponse, GetNftTransactionResponse, GetNftTransactions } from './nft.dto'

@Service()
export class Nft {
  private connector: TatumConnector = Container.get(TatumConnector)

  async getBalance({ chain, address }: GetBalance): Promise<GetBalanceResponse[]> {
    return this.connector.get({ path: `nft/address/balance/${chain}/${address}` })
  }

  async getNftTransactions({ chain, contractAddress, tokenId, pageSize }: GetNftTransactions): Promise<GetNftTransactionResponse[]> {
    return this.connector.get({ path: `nft/transaction/tokenId/${chain}/${contractAddress}/${tokenId}`, params: { pageSize: pageSize ?? '50' } })
  }

}
