/**
 * Subscription
 */
import {SubscriptionType} from './SubscriptionType'

export interface Subscription {
  /**
   * Type of the subscription.
   * @type {string}
   * @memberof Subscription
   */
  type: SubscriptionType
  /**
   * ID of the subscription.
   * @type {string}
   * @memberof Subscription
   */
  id: string
  /**
   * Additional attributes based on the subscription type.
   * @type {object}
   * @memberof Subscription
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  attr: object
}
