/**
 *
 * @export
 * @interface Subscription
 */
import { SubscriptionType } from './SubscriptionType'

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
  attr: object
}

/**
 *
 * @export
 * @interface CreateSubscription
 */
export interface CreateSubscription {
  /**
   * Type of the subscription.
   * @type {string}
   * @memberof Subscription
   */
  type: SubscriptionType
  /**
   * Additional attributes based on the subscription type.
   * @type {object}
   * @memberof Subscription
   */
  attr: object
}

