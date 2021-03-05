import { get, httpDelete, post } from '../connector/tatum'
import {CreateSubscription} from '../model';
import {Account, Subscription, Transaction} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createSubscription" target="_blank">Tatum API documentation</a>
 */
export const createNewSubscription = async (data: CreateSubscription): Promise<{ id: string }> => post(`/v3/subscription`, data, CreateSubscription);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSubscriptions" target="_blank">Tatum API documentation</a>
 */
export const listActiveSubscriptions = async (pageSize: number = 50, offset: number = 0): Promise<Subscription[]> => get(`/v3/subscription?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteSubscription" target="_blank">Tatum API documentation</a>
 */
export const cancelExistingSubscription = async (id: string): Promise<void> => httpDelete(`/v3/subscription/${id}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSubscriptionReport" target="_blank">Tatum API documentation</a>
 */
export const obtainReportForSubscription = async (id: string): Promise<Transaction[] | Account[]> => get(`/v3/subscription/report/${id}`);



