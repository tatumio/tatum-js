/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExchangeRate } from '../models/ExchangeRate';
import type { FiatCurrency } from '../models/FiatCurrency';
import type { FiatOrCryptoCurrency } from '../models/FiatOrCryptoCurrency';
import type { RateQuery } from '../models/RateQuery';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class ExchangeRateService {

    /**
     * Get the current exchange rate for exchanging fiat/crypto assets
     * <p><b>1 credit per API call</b></p>
     * <p>Get the current exchange rate for exchanging fiat/crypto assets.</p>
     * <p>By default, the base pair (the target asset) is EUR. When obtaining the exchange rate for an asset (for example, BTC), the value returned by the API expresses the amount of EUR that can be currently exchanged into 1 BTC.</p>
     *
     * @param currency The fiat or crypto asset to exchange
     * @param basePair The target fiat asset to get the exchange rate for
     * @returns ExchangeRate OK
     * @throws ApiError
     */
    public static getExchangeRate(
        currency: FiatOrCryptoCurrency,
        basePair: FiatCurrency = 'EUR',
    ): CancelablePromise<ExchangeRate> {
        return __request({
            method: 'GET',
            path: `/v3/tatum/rate/${currency}`,
            query: {
                'basePair': basePair,
            },
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get the current exchange rates for exchanging fiat/crypto assets
     * <p><b>1 credit per pair per API call</b></p>
     * <p>Get the current exchange rates for exchanging fiat/crypto assets.</p>
     * <p>When obtaining the exchange rate for an asset (for example, BTC), the value returned by the API expresses the amount of EUR that can be currently exchanged into 1 BTC.</p>
     *
     * @param requestBody
     * @returns ExchangeRate OK
     * @throws ApiError
     */
    public static getExchangeRates(
        requestBody: Array<RateQuery>,
    ): CancelablePromise<Array<ExchangeRate>> {
        return __request({
            method: 'POST',
            path: `/v3/tatum/rate`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}