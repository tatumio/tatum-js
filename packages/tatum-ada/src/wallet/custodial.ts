import { getCustodialAddresses as getCustodialAddressesDefi } from '@tatumio/tatum-defi'
import { Currency } from '@tatumio/tatum-core'

export const getCustodialAddresses = async (txId: string) => {
  return getCustodialAddressesDefi(Currency.ADA, txId)
}
