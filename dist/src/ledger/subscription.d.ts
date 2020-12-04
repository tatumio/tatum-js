import { CreateSubscription } from '../model/request';
import { Account, Subscription, Transaction } from '../model/response';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createSubscription" target="_blank">Tatum API documentation</a>
 */
export declare const createNewSubscription: (data: CreateSubscription) => Promise<{
    id: string;
}>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSubscriptions" target="_blank">Tatum API documentation</a>
 */
export declare const listActiveSubscriptions: (pageSize?: number, offset?: number) => Promise<Subscription[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteSubscription" target="_blank">Tatum API documentation</a>
 */
export declare const cancelExistingSubscription: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSubscriptionReport" target="_blank">Tatum API documentation</a>
 */
export declare const obtainReportForSubscription: (id: string) => Promise<Transaction[] | Account[]>;
