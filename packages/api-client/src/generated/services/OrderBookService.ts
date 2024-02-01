/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Chart } from '../models/Chart';
import type { ChartRequest } from '../models/ChartRequest';
import type { CreateFutureTrade } from '../models/CreateFutureTrade';
import type { CreateTrade } from '../models/CreateTrade';
import type { Id } from '../models/Id';
import type { ListOderBookActiveBuyBody } from '../models/ListOderBookActiveBuyBody';
import type { ListOderBookActiveSellBody } from '../models/ListOderBookActiveSellBody';
import type { ListOderBookHistoryBody } from '../models/ListOderBookHistoryBody';
import type { ListOderBookMatchedBody } from '../models/ListOderBookMatchedBody';
import type { Trade } from '../models/Trade';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class OrderBookService {

    /**
     * Store buy / sell trade
     * <h4>2 credits for API call, 2 credits for each fill of the counter trade. 1 API call + 2 fills  = 6 credits.</h4><br/>
     * <p>Store new buy / sell trade. If there is trade already available to fill, fill as much trades as possible.<br/>
     * It is possible to charge fees for the trades. Fees are an extra amount on top of the trade amount and are paid in the currency that you going to block
     * e.g.:
     * - BUY BTC/USDT - fees will be paid in USDT
     * - SELL BTC/ETH - fees will be paid in BTC
     * </p>
     *
     * <p>
     * If you fill type of the trade with FUTURE_BUY or FUTURE_SELL the trade will behave as a trade future. The trade is concluded now but will be fulfilled in future.
     * The date of fulfillment is by the “Seal Date” field. You can also block a percentage of the amount until the future trade has expired.
     * </p>
     * <p>Futures can also penalize contracting parties if they don’t have the agreed balance available in their accounts.
     * The penalty is calculated in the following way: Penalty amount = (Percentage of incomplete deal amount because of shortage from user) × (Maximum Penalty percentage of futures deal based on blocked amount and time interval) × (total blocked value).
     * </p>
     * <p>Example of the BTC/USDT trade future:</p>
     * <p>The maker creates a sell with the following properties: 1 BTC at a price of 60000 USDT, with a blocking percentage of 22%, a penalty percentage of 45%, a system commision of 1% and with an expiration time of within 12 hours.</p>
     * <pre>
     * {
         * "type": "FUTURE_SELL",
         * "price": "60000",
         * "amount": "1",
         * "pair": "BTC/USDT",
         * "currency1AccountId": "60a236db1b57f60d62612bf3",
         * "currency2AccountId": "609d0696bf835c241ac2920f",
         * "fee": 1,
         * "feeAccountId": "609d0696bf835c251ac2920a",
         * "attr": {
             * "sealDate": 1621990960631,
             * "percentBlock": 22,
             * "percentPenalty": 45
             * }
             * }
             * </pre>
             *
             * The taker accepts the offer with a buy and blocks 13200 USDT (60000 USDT × 0.22) in their account.
             * <pre>
             * {
                 * "type": "FUTURE_BUY",
                 * "price": "60000",
                 * "amount": "1",
                 * "pair": "BTC/USDT",
                 * "currency1AccountId": "60a236db1b57f60d62612bf2",
                 * "currency2AccountId": "609d0696bf835c241ac2920a",
                 * "attr": {
                     * "sealDate": 1621990960631,
                     * "percentBlock": 22,
                     * "percentPenalty": 45
                     * }
                     * }
                     * </pre>
                     * <p>At the time of the trade, the maker and taker have the following conditions.
                     * The maker has 0.65 BTC (35% deficit) in their account and the taker has 49200 USDT (18% deficit) in their account.
                     * </p>
                     *
                     * <p>
                     * The maker penalty is equal to 0.35 × 0.22 × (0.45 × 1 BTC) = 0.03465 BTC.
                     * The taker penalty is equal to 0.18 × 0.22 × (0.45 × 60000 USDT) = 1069.2 USDT.
                     * </p>
                     * <p>
                     * The system commission for the maker is 1 BTC × 1% = 0.01 BTC.
                     * The system commission for the taker is 60000 USDT × 1% = 600 USDT.
                     * </p>
                     * <p>
                     * The maker’s assets after deducting penalties and commissions equals 0.65 - 0.03465 - 0.01 = 0.60535 BTC. The taker’s assets after deducting penalties and commissions equals 49200 - 1069.2 - 600 = 47530.8 USDT.
                     * </p>
                     * <p>
                     * The amount received by the maker after the trade is (0.60535 × 60000) + 1069.2 = 37390.2 USDT and the taker receives 0.60535 + 0.03465 = 0.64 BTC.
                     * </p>
                     *
                     * @param requestBody
                     * @returns Id OK
                     * @throws ApiError
                     */
                    public static storeTrade(
                        requestBody: (CreateTrade | CreateFutureTrade),
                    ): CancelablePromise<Id> {
                        return __request({
                            method: 'POST',
                            path: `/v3/trade`,
                            body: requestBody,
                            mediaType: 'application/json',
                            errors: {
                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * Obtain chart data from historical closed trades
                     * <h4>2 credits for API call.</h4><br/>
                     * <p>Obtain data from the closed trades for entering in the chart. Time interval is set between <i>from</i> and <i>to</i> and there is defined time frame. There can be obtained at most 200 time points in the time interval.</p>
                     *
                     * @param requestBody
                     * @param direction Direction of sorting
                     * @returns Chart OK
                     * @throws ApiError
                     */
                    public static chartRequest(
                        requestBody: ChartRequest,
                        direction?: 'asc' | 'desc',
                    ): CancelablePromise<Array<Chart>> {
                        return __request({
                            method: 'POST',
                            path: `/v3/trade/chart`,
                            query: {
                                'direction': direction,
                            },
                            body: requestBody,
                            mediaType: 'application/json',
                            errors: {
                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * @deprecated
                     * List all historical trades
                     * <h4>1 credit per API call.</h4><br/><p>List all historical trades. It is possible to list all trades, trades for specific trading pair and/or account.</p>
                     * @param pageSize Max number of items per page is 50.
                     * @param id Account ID. If present, only closed trades for given account will be present.
                     * @param pair Trade pair. If present, only closed trades on given trade pair will be present.
                     * @param offset Offset to obtain next page of the data.
                     * @param count Get the total trade pair count based on the filter. Either count or pageSize is accepted.
                     * @param types Trade types.
                     * @returns Trade OK
                     * @throws ApiError
                     */
                    public static getHistoricalTrades(
                        pageSize: number,
                        id?: string,
                        pair?: string,
                        offset?: number,
                        count?: boolean,
                        types?: Array<'FUTURE_BUY' | 'FUTURE_SELL' | 'BUY' | 'SELL'>,
                    ): CancelablePromise<Array<Trade>> {
                        return __request({
                            method: 'GET',
                            path: `/v3/trade/history`,
                            query: {
                                'id': id,
                                'pair': pair,
                                'pageSize': pageSize,
                                'offset': offset,
                                'count': count,
                                'types': types,
                            },
                            errors: {
                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * List all historical trades
                     * <h4>1 credit per API call.</h4><br/><p>List all historical trades. It is possible to list all trades, trades for specific trading pair and/or account.</p>
                     * @param requestBody
                     * @returns Trade OK
                     * @throws ApiError
                     */
                    public static getHistoricalTradesBody(
                        requestBody?: ListOderBookHistoryBody,
                    ): CancelablePromise<Array<Trade>> {
                        return __request({
                            method: 'POST',
                            path: `/v3/trade/history`,
                            body: requestBody,
                            mediaType: 'application/json',
                            errors: {
                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * @deprecated
                     * List all active buy trades
                     * <h4>1 credit per API call.</h4><br/><p>List all active buy trades.</p>
                     * @param pageSize Max number of items per page is 50.
                     * @param id Account ID. If present, list current active buy trades for that account.
                     * @param customerId Customer ID. If present, list current active buy trades for that customer.
                     * @param offset Offset to obtain next page of the data.
                     * @param pair Trade pair. If present, list current active buy trades for that pair.
                     * @param count Get the total trade pair count based on the filter. Either count or pageSize is accepted.
                     * @param tradeType Trade type.
                     * @returns Trade OK
                     * @throws ApiError
                     */
                    public static getBuyTrades(
                        pageSize: number,
                        id?: string,
                        customerId?: string,
                        offset?: number,
                        pair?: string,
                        count?: boolean,
                        tradeType?: 'FUTURE_BUY' | 'BUY',
                    ): CancelablePromise<Array<Trade>> {
                        return __request({
                            method: 'GET',
                            path: `/v3/trade/buy`,
                            query: {
                                'id': id,
                                'customerId': customerId,
                                'pageSize': pageSize,
                                'offset': offset,
                                'pair': pair,
                                'count': count,
                                'tradeType': tradeType,
                            },
                            errors: {
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * List all active buy trades
                     * <h4>1 credit per API call.</h4><br/><p>List all active buy trades.</p>
                     * @param requestBody
                     * @returns Trade OK
                     * @throws ApiError
                     */
                    public static getBuyTradesBody(
                        requestBody: ListOderBookActiveBuyBody,
                    ): CancelablePromise<Array<Trade>> {
                        return __request({
                            method: 'POST',
                            path: `/v3/trade/buy`,
                            body: requestBody,
                            mediaType: 'application/json',
                            errors: {
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * @deprecated
                     * List all active sell trades
                     * <h4>1 credit per API call.</h4><br/><p>List all active sell trades.</p>
                     * @param pageSize Max number of items per page is 50.
                     * @param id Account ID. If present, list current active sell trades for that account.
                     * @param customerId Customer ID. If present, list current active buy trades for that customer.
                     * @param offset Offset to obtain next page of the data.
                     * @param pair Trade pair. If present, list current active sell trades for that pair.
                     * @param count Get the total trade pair count based on the filter. Either count or pageSize is accepted.
                     * @param tradeType Trade type.
                     * @returns Trade OK
                     * @throws ApiError
                     */
                    public static getSellTrades(
                        pageSize: number,
                        id?: string,
                        customerId?: string,
                        offset?: number,
                        pair?: string,
                        count?: boolean,
                        tradeType?: 'FUTURE_SELL' | 'SELL',
                    ): CancelablePromise<Array<Trade>> {
                        return __request({
                            method: 'GET',
                            path: `/v3/trade/sell`,
                            query: {
                                'id': id,
                                'customerId': customerId,
                                'pageSize': pageSize,
                                'offset': offset,
                                'pair': pair,
                                'count': count,
                                'tradeType': tradeType,
                            },
                            errors: {
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * List all active sell trades
                     * <h4>1 credit per API call.</h4><br/><p>List all active sell trades.</p>
                     * @param requestBody
                     * @returns Trade OK
                     * @throws ApiError
                     */
                    public static getSellTradesBody(
                        requestBody: ListOderBookActiveSellBody,
                    ): CancelablePromise<Array<Trade>> {
                        return __request({
                            method: 'POST',
                            path: `/v3/trade/sell`,
                            body: requestBody,
                            mediaType: 'application/json',
                            errors: {
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * List all matched orders from FUTURE_SELL/FUTURE_BUY trades
                     * <h4>1 credit per API call.</h4><br/><p>List all matched orders from the FUTURE_BUY OR FUTURE_SELL orders.</p>
                     * @param requestBody
                     * @returns Trade OK
                     * @throws ApiError
                     */
                    public static getMatchedTrades(
                        requestBody: ListOderBookMatchedBody,
                    ): CancelablePromise<Array<Trade>> {
                        return __request({
                            method: 'POST',
                            path: `/v3/trade/matched`,
                            body: requestBody,
                            mediaType: 'application/json',
                            errors: {
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * Get existing trade
                     * <h4>1 credit for API call</h4><br/><p>Get existing opened trade.</p>
                     * @param id Trade ID
                     * @returns Trade OK
                     * @throws ApiError
                     */
                    public static getTradeById(
                        id: string,
                    ): CancelablePromise<Trade> {
                        return __request({
                            method: 'GET',
                            path: `/v3/trade/${id}`,
                            errors: {
                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * Cancel existing trade
                     * <h4>1 credit for API call</h4><br/><p>Cancel existing trade.</p>
                     * @param id Trade ID
                     * @returns void
                     * @throws ApiError
                     */
                    public static deleteTrade(
                        id: string,
                    ): CancelablePromise<void> {
                        return __request({
                            method: 'DELETE',
                            path: `/v3/trade/${id}`,
                            errors: {
                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                    /**
                     * Cancel all existing trades for account
                     * <h4>1 credit for API call, 1 credit for each cancelled trade. 1 API call + 2 cancellations  = 3 credits.</h4><br/><p>Cancel all trades for account.</p>
                     * @param id Account ID
                     * @returns void
                     * @throws ApiError
                     */
                    public static deleteAccountTrades(
                        id: string,
                    ): CancelablePromise<void> {
                        return __request({
                            method: 'DELETE',
                            path: `/v3/trade/account/${id}`,
                            errors: {
                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                500: `Internal server error. There was an error on the server while processing the request.`,
                            },
                        });
                    }

                }