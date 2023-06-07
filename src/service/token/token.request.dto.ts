import { ApiBalanceRequest } from '../../dto/api/api.dto'

export interface GetFungibleTokenBalance extends ApiBalanceRequest {
  /**
   * Token types - fungible by default
   */
  tokenTypes: 'fungible'
}
