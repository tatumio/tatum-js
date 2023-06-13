import { Container, Service } from 'typedi'
import { ApiBalanceRequest } from '../../api/api.dto'
import { TatumConnector } from '../../connector/tatum.connector'
import { AddressBalanceDetails } from '../../dto'
import { CONFIG, ErrorUtils, ResponseDto } from '../../util'
import { TatumConfig } from '../tatum'
import {
  CheckTokenOwner,
  CreateMultiTokenNftCollection,
  CreateNftCollection,
  GetAllNftTransactionsByAddress,
  GetAllNftTransactionsQuery,
  GetCollection,
  GetNftMetadata,
  GetTokenOwner,
  NftAddressBalance,
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
   * Create new NFT collection (ERC-721 compatible smart contract). This operation deploys new smart contract to the blockchain and sets the owner of the collection.
   * You don't need to specify the default minter of the collection, as the owner of the collection is the default minter.
   * You don't have to have any funds on the address, as the smart contract is deployed by Tatum.
   * @param body Body of the request.
   * @returns ResponseDto<{txId: string}> Transaction ID of the deployment transaction. You can get the contract address from the transaction details using rpc.getContractAddress(transactionId) function, once transaction is included in the block.
   */
  async createNftCollection(body: CreateNftCollection): Promise<ResponseDto<{ txId: string }>> {
    return ErrorUtils.tryFail(() =>
      this.connector.post<{ txId: string }>({
        path: `contract/deploy`,
        body: {
          ...body,
          chain: this.config.network,
          contractType: 'nft',
        },
      }),
    )
  }

  /**
   * Create new MultiToken NFT collection (ERC-1155 compatible smart contract). This operation deploys new smart contract to the blockchain and sets the owner of the collection.
   * You don't need to specify the default minter of the collection, as the owner of the collection is the default minter.
   * You don't have to have any funds on the address, as the smart contract is deployed by Tatum.
   * @param body Body of the request.
   * @returns ResponseDto<{txId: string}> Transaction ID of the deployment transaction. You can get the contract address from the transaction details using rpc.getContractAddress(transactionId) function, once transaction is included in the block.
   */
  async createMultiTokenNftCollection(
    body: CreateMultiTokenNftCollection,
  ): Promise<ResponseDto<{ txId: string }>> {
    return ErrorUtils.tryFail(() =>
      this.connector.post<{ txId: string }>({
        path: `contract/deploy`,
        body: {
          ...body,
          chain: this.config.network,
          contractType: 'multitoken',
        },
      }),
    )
  }
  /**
   * Get balance of NFT for given address.
   * You can get balance of multiple addresses in one call.
   */
  async getBalance({
    page = 0,
    pageSize = 50,
    addresses,
  }: AddressBalanceDetails): Promise<ResponseDto<NftAddressBalance[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(() =>
      this.connector
        .get<{ result: NftAddressBalance[] }, ApiBalanceRequest>({
          path: `data/balances`,
          params: {
            pageSize,
            offset: page,
            chain,
            tokenTypes: 'nft,multitoken',
            addresses: addresses.join(','),
          },
        })
        .then((r) => r.result),
    )
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
  }: GetAllNftTransactionsQuery): Promise<ResponseDto<NftTransaction[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(() =>
      this.connector
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
            blockFrom: fromBlock,
            blockTo: toBlock,
          },
        })
        .then((r) => r.result),
    )
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
  }: GetAllNftTransactionsByAddress): Promise<ResponseDto<NftTransaction[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(() =>
      this.connector
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
            blockFrom: fromBlock,
            blockTo: toBlock,
          },
        })
        .then((r) => r.result),
    )
  }

  /**
   * Get metadata of NFT.
   */
  async getNftMetadata({
    tokenAddress,
    tokenId,
  }: GetNftMetadata): Promise<ResponseDto<NftTokenDetail | null>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(async () => {
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
    })
  }

  /**
   * Get owner of a specific NFT.
   */
  async getNftOwner({
    tokenAddress,
    tokenId,
    pageSize,
    page,
  }: GetTokenOwner): Promise<ResponseDto<string[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(() =>
      this.connector.get<Array<string>>({
        path: `data/owners`,
        params: {
          chain,
          tokenAddress,
          tokenId,
          pageSize,
          offset: page,
        },
      }),
    )
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
  async getNftsInCollection({
    collectionAddress,
    pageSize,
    excludeMetadata = false,
    page,
  }: GetCollection): Promise<ResponseDto<NftTokenDetail[]>> {
    const chain = this.config.network
    return ErrorUtils.tryFail(() =>
      this.connector.get<Array<NftTokenDetail>>({
        path: `data/collections`,
        params: {
          pageSize,
          offset: page,
          chain,
          collectionAddresses: collectionAddress,
          excludeMetadata,
        },
      }),
    )
  }
}
