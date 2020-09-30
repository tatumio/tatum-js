import axios from 'axios';
import { TATUM_API_URL } from '../constants'
import { Account, Subscription, Transaction } from '../model/response'
import { SubscriptionType } from '../model/response/ledger/SubscriptionType'

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/createSubscription" target="_blank">Tatum API documentation</a>
 */
export const createNewSubscription = async (data: Subscription): Promise<{ id: string }> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/subscription`, data, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getSubscriptions" target="_blank">Tatum API documentation</a>
 */
export const listActiveSubscriptions = async (pageSize: number = 50, offset: number = 0): Promise<Subscription[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/subscription?pageSize=${pageSize}&offset=${offset}`, { headers: { 'x-api-key': process.env.TATUM_API_KEY } })).data
}

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteSubscription" target="_blank">Tatum API documentation</a>
 */
export const cancelExistingSubscription = async (id: string): Promise<void> => {
    await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/subscription/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getSubscriptionReport" target="_blank">Tatum API documentation</a>
 */
export const obtainReportForSubscription = async (id: string): Promise<Transaction[] | Account[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/subscription/report/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}}))
};



