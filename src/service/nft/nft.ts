import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { CONFIG } from '../../util'
import { TatumConfig } from '../tatum'
import {
  CheckTokenOwner,
  GetAllNftTransactionsByAddress,
  GetAllNftTransactionsQuery,
  GetCollection,
  GetNftMetadata,
  GetTokenOwner,
  NftAddressBalance,
  NftBalanceDetails,
  NftTokenDetail,
  NftTransaction,
} from './nft.dto'

@Service({
  factory: (data: { id: string }) => {
    return new Nft(data.id)
  },
  transient: true,
})
export class Nft {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.config = Container.of(this.id).get(CONFIG)
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  /**
   * Get balance of NFT for given address.
   * You can get balance of multiple addresses in one call.
   */
  async getBalance({ page = 0, pageSize = 50, addresses }: NftBalanceDetails): Promise<NftAddressBalance[]> {
    const chain = this.config.network
    return this.connector
      .get<{ result: NftAddressBalance[] }>({
        path: `data/balances`,
        params: {
          pageSize,
          offset: page,
          chain,
          tokenTypes: 'nft,multitoken',
          addresses: addresses.join(','),
        },
      })
      .then((r) => r.result)
  }

  /**
   * Get all transactions for given NFT.
   * @param nftTransactionsDetails  You can get multiple NFT transactions in one call.
   * @param page
   * @param pageSize
   */
  async getAllNftTransactions({
    page = 0,
    pageSize = 50,
    tokenId,
    tokenAddress,
    transactionType,
    fromBlock,
    toBlock,
  }: GetAllNftTransactionsQuery): Promise<NftTransaction[]> {
    const chain = this.config.network
    return this.connector
      .get<{ result: NftTransaction[] }>({
        path: `data/transactions`,
        params: {
          pageSize,
          offset: page,
          chain,
          tokenTypes: 'nft,multitoken',
          transactionSubtype: transactionType,
          tokenAddress,
          tokenId,
          fromBlock,
          toBlock,
        },
      })
      .then((r) => r.result)
  }

  /**
   * Get all transactions for given NFT.
   * @param nftTransactionsDetails  You can get multiple NFT transactions in one call.
   * @param page
   * @param pageSize
   */
  async getAllNftTransactionsByAddress({
    page = 0,
    pageSize = 50,
    addresses,
    tokenId,
    tokenAddress,
    transactionType,
    fromBlock,
    toBlock,
  }: GetAllNftTransactionsByAddress): Promise<NftTransaction[]> {
    const chain = this.config.network
    return this.connector
      .get<{ result: NftTransaction[] }>({
        path: `data/transactions`,
        params: {
          pageSize,
          offset: page,
          chain,
          addresses: addresses.join(','),
          tokenTypes: 'nft,multitoken',
          transactionSubtype: transactionType,
          tokenAddress,
          tokenId,
          fromBlock,
          toBlock,
        },
      })
      .then((r) => r.result)
  }

  /**
   * Get metadata of NFT.
   */
  async getNftMetadata({ tokenAddress, tokenId }: GetNftMetadata): Promise<NftTokenDetail | null> {
    const chain = this.config.network
    const response = await this.connector.get<Array<NftTokenDetail>>({
      path: `data/metadata`,
      params: {
        chain,
        tokenAddress,
        tokenIds: tokenId,
      },
    })
    if (response?.length) {
      return response[0]
    }
    return null
  }

  /**
   * Get owner of a specific NFT.
   */
  async getNftOwner({ tokenAddress, tokenId, pageSize, page }: GetTokenOwner): Promise<string[]> {
    const chain = this.config.network
    return this.connector.get<Array<string>>({
      path: `data/owners`,
      params: {
        chain,
        tokenAddress,
        tokenId,
        pageSize,
        offset: page,
      },
    })
  }

  /**
   * Check if address is owner of a specific NFT.
   */
  async checkNftOwner({ tokenAddress, tokenId, owner }: CheckTokenOwner): Promise<boolean> {
    const chain = this.config.network
    return this.connector.get<boolean>({
      path: `data/owners/address`,
      params: {
        chain,
        tokenAddress,
        address: owner,
        tokenId,
      },
    })
  }

  /**
   * Get all NFTs in collection.
   */
  async getNFtsInCollection({
    tokenAddress,
    pageSize,
    excludeMetadata = false,
    page,
  }: GetCollection): Promise<NftTokenDetail[]> {
    const chain = this.config.network
    return this.connector.get<Array<NftTokenDetail>>({
      path: `data/collections`,
      params: {
        pageSize,
        offset: page,
        chain,
        collectionAddresses: tokenAddress,
        excludeMetadata,
      },
    })
  }
}
