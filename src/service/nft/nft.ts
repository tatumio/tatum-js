import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import {
  GetAllNftTransactionsQuery,
  GetBalanceResponse,
  GetCollection,
  GetCollectionResponse,
  GetNftMetadata,
  GetNftMetadataResponse,
  GetNftTransactionResponse,
  NftBalance,
  NftBalanceDetails,
  NftBalances,
  NftTransactions,
} from './nft.dto'
import { Utils } from '../../util'

@Service()
export class Nft {
  private connector: TatumConnector = Container.get(TatumConnector)

  async getBalance(detailsRequests: NftBalanceDetails[]): Promise<NftBalances> {
    const result: NftBalances = {}
    for (const detailsRequest of detailsRequests) {
      await this.processDetailsRequest(detailsRequest, result)
    }
    return result
  }

  private async processDetailsRequest(detailsRequest: NftBalanceDetails, result: NftBalances) {
    for (const address of detailsRequest.addresses) {
      const response = await this.connector.get<GetBalanceResponse[]>({
        path: `nft/address/balance/${Utils.mapChain(detailsRequest.chain)}/${address}`,
      })
      if (!response) continue //TODO?

      const balancesByChain = result[detailsRequest.chain] ?? {}

      for (const balanceResult of response) {
        const balanceByAddress = balancesByChain[address] ?? []

        for (let i = 0; i < balanceResult.metadata.length; i++) {
          const metadata = balanceResult.metadata[i]

          const balanceEntry: NftBalance = {
            contractAddress: balanceResult.contractAddress,
            tokenId: metadata.tokenId,
            metadataUri: metadata.url,
            metadata: metadata.metadata,
          }
          balanceByAddress.push(balanceEntry)
        }

        balancesByChain[address] = balanceByAddress
      }

      result[detailsRequest.chain] = balancesByChain
    }
  }

  async getAllNftTransactions({
                                nftTransactionsDetails,
                                offset = 0,
                                pageSize = 10,
                              }: GetAllNftTransactionsQuery): Promise<NftTransactions> {
    const result: NftTransactions = {}

    for (const { chain, contractAddress, fromBlock, toBlock, tokenId } of nftTransactionsDetails) {
      const resultsByChain = result[chain] ?? []

      const response = await this.connector.get<GetNftTransactionResponse[]>({
        path: `nft/transaction/tokenId/${Utils.mapChain(chain)}/${contractAddress}/${tokenId}`,
        params: {
          from: fromBlock?.toString(),
          to: toBlock?.toString(),
          pageSize: pageSize.toString(),
          offset: offset.toString(),
        },
      })

      for (const responseTx of response) {
        resultsByChain.push({
          blockNumber: responseTx.blockNumber,
          txId: responseTx.txId,
          from: responseTx.from,
          to: responseTx.to,
          contractAddress: responseTx.contractAddress,
          tokenId: responseTx.tokenId,
        })
      }

      result[chain] = resultsByChain
    }
    return result
  }

  async getNftMetadata({
                         chain,
                         contractAddress,
                         tokenId,
                       }: GetNftMetadata): Promise<GetNftMetadataResponse | null> {
    return this.connector.get({ path: `nft/metadata/${Utils.mapChain(chain)}/${contractAddress}/${tokenId}` })
  }

  async getCollection({
                        chain,
                        contractAddress,
                        pageSize,
                      }: GetCollection): Promise<GetCollectionResponse[] | null> {
    return this.connector.get({
      path: `nft/collection/${Utils.mapChain(chain)}/${contractAddress}`,
      params: { pageSize: pageSize ?? '50' },
    })
  }
}
