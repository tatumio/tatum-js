import { Container, Service } from 'typedi'
import { TatumApi } from '../../api/tatum.api'
import { AddressBalanceDetails, isDataApiEvmEnabledNetwork } from '../../dto'
import { CONFIG, ErrorUtils, ResponseDto } from '../../util'
import { TatumConfig } from '../tatum'
import {
  CreateFungibleToken,
  FungibleTokenBalance,
  GetAllFungibleTransactionsQuery,
  GetTokenMetadata,
  TokenMetadata,
  Transaction,
  TxIdResponse,
  mapper,
} from './token.dto'

import { FungibleInfo, networkToChain } from '../../api/api.dto'
@Service({
  factory: (data: { id: string }) => {
    return new Token(data.id)
  },
  transient: true,
})
export class Token {
  private readonly api: TatumApi
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.config = Container.of(this.id).get(CONFIG)
    this.api = Container.of(this.id).get(TatumApi)
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
    if (isDataApiEvmEnabledNetwork(chain)) {
      return ErrorUtils.tryFail(() =>
        this.api
          .getBalancesOfAddresses({
            chain,
            addresses: addresses.join(','),
            pageSize,
            offset: page,
            tokenTypes: 'fungible',
          })
          .then((r) =>
            r.map((value) => {
              return mapper.toFungibleTokenBalance(value)
            }),
          ),
      )
    } else {
      throw new Error(`Not supported for ${chain} network.`)
    }
  }

  /**
   * Create new fungible collection (ERC-20 compatible smart contract). This operation deploys new smart contract to the blockchain and sets the owner of the token.
   * You don't need to specify the default minter of the collection, as the owner of the collection is the default minter.
   * You don't have to have any funds on the address, as the smart contract is deployed by Tatum.
   * @param body Body of the request.
   * @returns ResponseDto<{txId: string}> Transaction ID of the deployment transaction. You can get the contract address from the transaction details using rpc.getContractAddress(transactionId) function, once transaction is included in the block.
   */
  async createNewFungibleToken(body: CreateFungibleToken): Promise<ResponseDto<TxIdResponse>> {
    const chain = networkToChain(this.config.network)
    return ErrorUtils.tryFail(() =>
      this.api
        .createFungibleToken({
          ...body,
          chain,
          contractType: 'fungible',
        })
        .then((r) => mapper.toCreateTokenResponse(r)),
    )
  }

  /**
   * Get metadata of fungible token.
   */
  async getTokenMetadata({ tokenAddress }: GetTokenMetadata): Promise<ResponseDto<TokenMetadata>> {
    const chain = networkToChain(this.config.network)
    return ErrorUtils.tryFail(() =>
      this.api
        .getTokenInfo({
          chain,
          tokenAddress,
        })
        .then((r) => mapper.toTokenMetadata(r as FungibleInfo)),
    )
  }

  /**
   * Get all token transactions for given address.
   * @param details  You can get multiple token transactions in one call.
   * @param page
   * @param pageSize
   */
  async getAllFungibleTransactions({
    page = 0,
    pageSize = 50,
    tokenAddress,
    addresses,
    transactionTypes,
    blockFrom,
    blockTo,
  }: GetAllFungibleTransactionsQuery): Promise<ResponseDto<Transaction[]>> {
    const chain = networkToChain(this.config.network)
    return ErrorUtils.tryFail(() =>
      this.api
        .getTransactions({
          chain,
          tokenAddress,
          pageSize,
          offset: page,
          blockFrom,
          blockTo,
          transactionSubTypes: transactionTypes?.join(','),
          addresses: addresses.join(','),
        })
        .then((r) =>
          r.map((value) => {
            return mapper.toTransaction(value)
          }),
        ),
    )
  }
}
