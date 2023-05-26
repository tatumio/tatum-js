import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { AddressBalanceDetails } from '../../dto'
import { CONFIG, ErrorUtils, ResponseDto } from '../../util'
import { TatumConfig } from '../tatum'
import {
  CreateFungibleToken,
  FungibleTokenBalance,
  FungibleTransaction,
  GetAllFungibleTransactionsQuery,
  GetTokenMetadata,
  TokenMetadata,
} from './token.dto'

@Service({
  factory: (data: { id: string }) => {
    return new Token(data.id)
  },
  transient: true,
})
export class Token {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.config = Container.of(this.id).get(CONFIG)
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  /**
   * Get balance of fungible tokens for given addresses.
   * You can get balance of multiple addresses in one call.
   */
  async getBalance({
    page = 0,
    pageSize = 50,
    addresses,
  }: AddressBalanceDetails): Promise<ResponseDto<FungibleTokenBalance[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(() =>
      this.connector
        .get<{ result: FungibleTokenBalance[] }>({
          path: `data/balances`,
          params: {
            pageSize,
            offset: page,
            chain,
            tokenTypes: 'fungible',
            addresses: addresses.join(','),
          },
        })
        .then((r) => r.result),
    )
  }

  async createNewFungibleToken(body: CreateFungibleToken): Promise<ResponseDto<{ txId: string }>> {
    return ErrorUtils.tryFail(() =>
      this.connector.post<{ txId: string }>({
        path: `contract/deploy`,
        body: {
          ...body,
          chain: this.config.network,
          contractType: 'fungible',
        },
      }),
    )
  }

  /**
   * Get metadata of fungible token.
   */
  async getTokenMetadata({
    tokenAddress,
    tokenId,
  }: GetTokenMetadata): Promise<ResponseDto<TokenMetadata | null>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(async () => {
      return this.connector.get<TokenMetadata>({
        path: `data/tokens`,
        params: {
          chain,
          tokenAddress,
          tokenIds: tokenId,
        },
      })
    })
  }

  /**
   * Get all transactions for given NFT.
   * @param nftTransactionsDetails  You can get multiple NFT transactions in one call.
   * @param page
   * @param pageSize
   */
  async getAllFungibleTransactions({
    page = 0,
    pageSize = 50,
    tokenAddress,
    transactionType,
    fromBlock,
    toBlock,
  }: GetAllFungibleTransactionsQuery): Promise<ResponseDto<FungibleTransaction[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(() =>
      this.connector
        .get<{ result: FungibleTransaction[] }>({
          path: `data/transactions`,
          params: {
            pageSize,
            offset: page,
            chain,
            tokenTypes: 'fungible',
            transactionSubtype: transactionType,
            tokenAddress,
            fromBlock,
            toBlock,
          },
        })
        .then((r) => r.result),
    )
  }
}
