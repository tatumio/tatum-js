import { Container, Service } from 'typedi'
import { TatumConnector } from '../connector/tatum.connector'
import {
  ApiBalanceRequest,
  ApiBalanceResponse,
  ApiCheckOwnersRequest,
  ApiCollectionsResponse,
  ApiCreateTokenRequest,
  ApiEventsRequest,
  ApiGetBlockRequest,
  ApiLatestBlockRequest,
  ApiMetadataRequest,
  ApiMetadataResponse,
  ApiOwnersRequest,
  ApiTokensRequest,
  ApiTransactionByHashRequest,
  ApiTransactionsRequest,
  ApiTxData,
  ApiUtxoByAddress,
  ApiUtxoResponse,
  Block,
  Event,
  FungibleInfo,
  MultitokenInfo,
  NftInfo,
  NftTokenInfo,
  TxIdResponse,
} from './api.dto'

@Service({
  factory: (data: { id: string }) => {
    return new TatumApi(data.id)
  },
  transient: true,
})
export class TatumApi {
  private readonly connector: TatumConnector

  constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  public async getTokensFromCollection(params: ApiMetadataRequest): Promise<ApiCollectionsResponse[]> {
    const { result } = await this.connector.get<{ result: ApiCollectionsResponse[] }, ApiMetadataRequest>({
      path: `data/collections`,
      params,
    })
    return result
  }

  public async getTokenMetadata(params: ApiMetadataRequest): Promise<ApiMetadataResponse[]> {
    const { result } = await this.connector.get<{ result: ApiMetadataResponse[] }, ApiMetadataRequest>({
      path: `data/metadata`,
      params,
    })
    return result
  }

  public async getBalancesOfAddresses(params: ApiBalanceRequest): Promise<ApiBalanceResponse[]> {
    const { result } = await this.connector.get<{ result: ApiBalanceResponse[] }, ApiBalanceRequest>({
      path: `data/wallet/portfolio`,
      params,
    })
    return result
  }

  public async getOwnersOfToken(params: ApiOwnersRequest): Promise<string[]> {
    const { result } = await this.connector.get<{ result: string[] }, ApiOwnersRequest>({
      path: `data/owners`,
      params,
    })
    return result
  }

  public checkOwner(params: ApiCheckOwnersRequest): Promise<boolean> {
    return this.connector.get<boolean, ApiCheckOwnersRequest>({
      path: `data/owners/address`,
      params,
    })
  }

  public async getTransactions(params: ApiTransactionsRequest): Promise<ApiTxData[]> {
    const { result } = await this.connector.get<{ result: ApiTxData[] }, ApiTransactionsRequest>({
      path: `data/transaction/history`,
      params,
    })
    return result
  }

  public async getTransactionsByHash(params: ApiTransactionByHashRequest): Promise<ApiTxData[]> {
    const { result } = await this.connector.get<{ result: ApiTxData[] }, ApiTransactionsRequest>({
      path: `data/transactions`,
      params,
    })
    return result
  }

  public async getEvents(params: ApiEventsRequest): Promise<Event[]> {
    const { result } = await this.connector.get<{ result: Event[] }, ApiEventsRequest>({
      path: `data/defi/events`,
      params,
    })
    return result
  }

  public getBlocks(params: ApiGetBlockRequest): Promise<Block[]> {
    return this.connector.get<Block[], ApiGetBlockRequest>({
      path: `data/defi/blocks`,
      params,
    })
  }

  public getLatestBlock(params: ApiLatestBlockRequest): Promise<Block> {
    return this.connector.get<Block, ApiLatestBlockRequest>({
      path: `data/defi/blocks/latest`,
      params,
    })
  }

  public getTokenInfo(
    params: ApiTokensRequest,
  ): Promise<FungibleInfo | NftInfo | MultitokenInfo | NftTokenInfo> {
    return this.connector.get<FungibleInfo | NftInfo | MultitokenInfo | NftTokenInfo, ApiTokensRequest>({
      path: `data/tokens`,
      params,
    })
  }

  public getUtxosByAddress(params: ApiUtxoByAddress): Promise<ApiUtxoResponse[]> {
    return this.connector.get<ApiUtxoResponse[], ApiUtxoByAddress>({
      path: `data/utxos`,
      params,
    })
  }

  public createFungibleToken(body: ApiCreateTokenRequest): Promise<TxIdResponse> {
    return this.connector.post<TxIdResponse, ApiCreateTokenRequest>({
      path: `contract/deploy`,
      body,
    })
  }
}
