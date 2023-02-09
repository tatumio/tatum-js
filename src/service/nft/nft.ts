import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import {
  GetBalance,
  GetBalanceResponse, GetCollection, GetCollectionResponse,
  GetNftMetadata, GetNftMetadataResponse,
  GetNftTransactionResponse,
  GetNftTransactions,
} from './nft.dto'
import { Utils } from '../../util/util.shared'

@Service()
export class Nft {
  private connector: TatumConnector = Container.get(TatumConnector)

  async getBalance({ chain, address }: GetBalance): Promise<GetBalanceResponse[]> {
    return this.connector.get({ path: `nft/address/balance/${Utils.mapChain(chain)}/${address}` })
  }

  async getNftTransactions({
                             chain,
                             contractAddress,
                             tokenId,
                             pageSize,
                           }: GetNftTransactions): Promise<GetNftTransactionResponse[]> {
    return this.connector.get({
      path: `nft/transaction/tokenId/${Utils.mapChain(chain)}/${contractAddress}/${tokenId}`,
      params: { pageSize: pageSize ?? '50' },
    })
  }

  async getNftMetadata({ chain, contractAddress, tokenId }: GetNftMetadata): Promise<GetNftMetadataResponse> {
    return this.connector.get({ path: `nft/metadata/${Utils.mapChain(chain)}/${contractAddress}/${tokenId}` })
  }

  async getCollection({ chain, contractAddress, pageSize }: GetCollection): Promise<GetCollectionResponse[]> {
    return this.connector.get({
      path: `nft/collection/${Utils.mapChain(chain)}/${contractAddress}`,
      params: { pageSize: pageSize ?? '50' },
    })
  }
}
