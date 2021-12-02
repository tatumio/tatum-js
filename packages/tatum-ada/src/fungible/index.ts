import { Currency, getERC20TransactionsByAddress as getERC20TransactionsByAddressCore, Sort } from '@tatumio/tatum-core'

export const getERC20TransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getERC20TransactionsByAddressCore(Currency.ADA, address, tokenAddress, pageSize, offset, from, to, sort)
}
