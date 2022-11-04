import { Currency } from '@tatumio/api-client'
import _ from 'lodash'

export type FlowCurrency = Currency.FLOW | Currency.FUSD

export const flowUtils = {
  isFlowCurrency: (currency: string): currency is FlowCurrency => {
    return [Currency.FLOW, Currency.FUSD].map((i) => i.toString()).includes(currency)
  },
  wrapFlowErrorIfNeeded: (e: Error | string): Error => {
    if (_.isString(e)) {
      return new Error(e)
    }

    return e
  },
}
