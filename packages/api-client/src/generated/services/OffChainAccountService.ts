/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { Address } from '../models/Address';
import type { OffchainAddresses } from '../models/OffchainAddresses';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class OffChainAccountService {

    /**
     * Create new deposit address
     * <h4>2 credits per API call and 20 credits for each address registered for scanning every day. If address is FLOW or FUSD, additional 3000 credits are consumed - see <a href="#operation/FlowGenerateAddress">Flow address generation.</a></h4><br/>
     * <p>Create a new deposit address for the account. This method associates public blockchain's ledger address with the account on Tatum's private ledger.<br/>
     * It is possible to generate multiple blockchain addresses for the same ledger account. By this, it is possible to aggregate various blockchain transactions from different addresses into the same account.
     * Depending on the currency of an account, this method will either generate a public address for Bitcoin, Bitcoin Cash,
     * Litecoin or Ethereum, DestinationTag in case of XRP or message in case of XLM. More information about supported blockchains and address types can be found <a href="#operation/createAccount">here</a>.<br/>
     * Addresses are generated in the natural order of the Extended public key provided in the account. Derivation index is the representation of that order - starts from 0 and ends at 2^31.
     * When a new address is generated, the last not used index is used to generate an address. It is possible to skip some of the addresses to the different index, which means all the skipped addresses will no longer be used.
     * </p>
     *
     * @param id Account ID
     * @param index <p>Derivation path index for specific address. If not present, last used index for given xpub of account + 1 is used. We recommend not to pass this value manually, since when some of the indexes are skipped, it is not possible to use them lately to generate address from it.</p>
     * @returns Address OK
     * @throws ApiError
     */
    public static generateDepositAddress(
        id: string,
        index?: number,
    ): CancelablePromise<Address> {
        return __request({
            method: 'POST',
            path: `/v3/offchain/account/${id}/address`,
            query: {
                'index': index,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get all deposit addresses for account
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get all deposit addresses generated for account. It is possible to deposit funds from another blockchain
     * address to any of associated addresses and they will be credited on the Tatum Ledger account connected to the address.</p>
     *
     * @param id Account ID
     * @returns Address OK
     * @throws ApiError
     */
    public static getAllDepositAddresses(
        id: string,
    ): CancelablePromise<Array<Address>> {
        return __request({
            method: 'GET',
            path: `/v3/offchain/account/${id}/address`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Create new deposit addresses in a batch call
     * <h4>2 credits per API call, 1 credit for every address created and 20 credits for each address registered for scanning every day. If address is FLOW or FUSD, additional 3000 credits are consumed for each address - see <a href="#operation/FlowGenerateAddress">Flow address generation.<a/></h4><br/>
     * <p>Create new deposit addressess for the account. This method associates public blockchain's ledger address with the account on Tatum's private ledger.<br/>
     * It is possible to generate multiple blockchain addresses for the same ledger account. By this, it is possible to aggregate various blockchain transactions from different addresses into the same account.
     * Depending on the currency of an account, this method will either generate a public address for Bitcoin, Bitcoin Cash,
     * Litecoin or Ethereum, DestinationTag in case of XRP or message in case of XLM. More information about supported blockchains and address types can be found <a href="#operation/createAccount">here</a>.<br/>
     * Addresses are generated in the natural order of the Extended public key provided in the account. Derivation index is the representation of that order - starts from 0 and ends at 2^31.
     * When a new address is generated, the last not used index is used to generate an address. It is possible to skip some of the addresses to the different index, which means all the skipped addresses will no longer be used.
     * </p>
     *
     * @param requestBody
     * @returns Address OK
     * @throws ApiError
     */
    public static generateDepositAddressesBatch(
        requestBody: OffchainAddresses,
    ): CancelablePromise<Array<Address>> {
        return __request({
            method: 'POST',
            path: `/v3/offchain/account/address/batch`,
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
     * Check, if deposit address is assigned
     * <h4>1 credit per API call.</h4><br/>
     * <p>Check, whether blockchain address for given currency is registered within Tatum and assigned to Tatum Account.
     * Returns account this address belongs to, otherwise throws an error.</p>
     *
     * @param currency Currency
     * @param address Blockchain Address to check
     * @param index In case of XLM or XRP, this is a memo or DestinationTag to search for.
     * @returns Account OK
     * @throws ApiError
     */
    public static addressExists(
        currency: string,
        address: string,
        index?: number,
    ): CancelablePromise<Account> {
        return __request({
            method: 'GET',
            path: `/v3/offchain/account/address/${address}/${currency}`,
            query: {
                'index': index,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Remove address for account
     * <h4>1 credit per API call.</h4><br/>
     * <p>Remove blockchain address from the Ledger account. Tatum will not check for any incoming deposits on this address for this account.
     * It will not be possible to generate the address in the future anymore.</p>
     *
     * @param id Account ID
     * @param address Blockchain address
     * @param index Destination tag or memo attribute for XRP, BNB or XLM addresses
     * @returns void
     * @throws ApiError
     */
    public static removeAddress(
        id: string,
        address: string,
        index?: number,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/v3/offchain/account/${id}/address/${address}`,
            query: {
                'index': index,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Assign address for account
     * <h4>2 credits for API call and 20 credits for each address registered for scanning every day.</h4><br/>
     * <p>This method is used when the account has no default xpub assigned, and addresses are handled manually. It is possible to pair any number of blockchain address to the account.</p>
     *
     * @param id Account ID
     * @param address Blockchain address
     * @param index Destination tag or memo attribute for XRP or XLM addresses
     * @returns Address OK
     * @throws ApiError
     */
    public static assignAddress(
        id: string,
        address: string,
        index?: number,
    ): CancelablePromise<Address> {
        return __request({
            method: 'POST',
            path: `/v3/offchain/account/${id}/address/${address}`,
            query: {
                'index': index,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}