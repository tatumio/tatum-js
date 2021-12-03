import { checkAddressExists as checkAddressExistsCore, Currency, getWithdrawals as getWithdrawalsCore } from '@tatumio/tatum-core'

export const checkAddressExists = async (address: string, index?: number) => {
  return checkAddressExistsCore(address, Currency.ALGO, index)
}

export const getWithdrawals = async (status?: string, pageSize = 50, offset = 0) => {
  return getWithdrawalsCore(status, Currency.ALGO, pageSize, offset)
}
