/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { Address } from '../models/Address';
import type { OffchainAddresses } from '../models/OffchainAddresses';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainAddressesService {

    /**
     * Create a deposit address for a virtual account
     * <p><b>2 credits per API call<br/>
     * On Flow, additional 3000 credits are consumed for <a href="https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateAddress" target="_blank">each created address</a>.</b></p>
     * <p>Create a deposit address associated with a virtual account.</p>
     * <p>You can create multiple deposit addresses for one virtual account. When you have multiple deposit addresses created for the same virtual account, you aggregate various blockchain transactions from different addresses under a single account.<br/>You can deposit funds from another blockchain address to a deposit address associated with the virtual account, and the funds will be credited to that virtual account.</p>
     * <p><b>Scanning for incoming deposits</b><br/>
     * By default, deposit addresses are scanned for incoming deposits. Deposit addresses are automatically synchronized with the associated virtual account, and you can see incoming deposits on the virtual account.<br/>Scanning deposit addresses for incoming deposits consumes <b>20 credits per address per day</b>.</p>
     * <p>If you want to be notified about certain events occurring on the deposit addresses, <a href="https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription" target="_blank">subscribe for notifications</a>.</p>
     * <p><b>Virtual account cryptocurrency</b></p>
     * <p>Depending on the cryptocurrency of the virtual account, this API generates:</p>
     * <ul>
     * <li><b>Public address</b> for BTC, BCH, ETH, or LTC</li>
     * <li><b>DestinationTag</b> for XRP</li>
     * <li><b>Message</b> for XLM</li>
     * </ul>
     * <p>For fore information about supported blockchains and address types, see the <a href="https://apidoc.tatum.io/tag/Account#operation/createAccount" target="_blank">API for creating virtual accounts</a>.</p>
     * <p>Deposit addresses are generated in the natural order of the extended public key provided in the virtual account. The derivation index is the representation of that order; it starts from 0 and ends at 2^31.</p>
     * <p>When a new deposit address is generated, the last not used index is used to generate the address. You can skip some addresses to a different index, which means all the skipped addresses will no longer be used.</p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get all deposit addresses for a virtual account
     * <p><b>1 credit per API call</b></p>
     * <p>Get all deposit addresses generated for a virtual account.</p>
     *
     * @param id The ID of the virtual account to get deposit addresses for
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Create multiple deposit addresses for a virtual account
     * <p><b>2 credits per API call + 1 credit for each created address<br/>
     * On Flow, additional 3000 credits are consumed for <a href="https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateAddress" target="_blank">each created address</a>.</b></p>
     * <p>Create multiple deposit addresses associated with a virtual account.</p>
     * <p>When you have multiple deposit addresses created for the same virtual account, you aggregate various blockchain transactions from different addresses under a single account.<br/>You can deposit funds from another blockchain address to a deposit address associated with the virtual account, and the funds will be credited to that virtual account.</p>
     * <p><b>Scanning for incoming deposits</b><br/>
     * By default, deposit addresses are scanned for incoming deposits. Deposit addresses are automatically synchronized with the associated virtual account, and you can see incoming deposits on the virtual account.<br/>Scanning deposit addresses for incoming deposits consumes <b>20 credits per address per day</b>.</p>
     * <p>If you want to be notified about certain events occurring on the deposit addresses, <a href="https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription" target="_blank">subscribe for notifications</a>.</p>
     * <p><b>Virtual account cryptocurrency</b></p>
     * <p>Depending on the cryptocurrency of the virtual account, this API generates:</p>
     * <ul>
     * <li><b>Public address</b> for BTC, BCH, ETH, or LTC</li>
     * <li><b>DestinationTag</b> for XRP</li>
     * <li><b>Message</b> for XLM</li>
     * </ul>
     * <p>For fore information about supported blockchains and address types, see the <a href="https://apidoc.tatum.io/tag/Account#operation/createAccount" target="_blank">API for creating virtual accounts</a>.</p>
     * <p>Deposit addresses are generated in the natural order of the extended public key provided in the virtual account. The derivation index is the representation of that order; it starts from 0 and ends at 2^31.</p>
     * <p>When a new deposit address is generated, the last not used index is used to generate the address. You can skip some addresses to a different index, which means all the skipped addresses will no longer be used.</p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Check whether a blockchain address is assigned to a virtual account
     * <p><b>1 credit per API call</b></p>
     * <p>Check whether a blockchain address with the specified cryptocurrency is registered within Tatum and is assigned to a virtual account (that is, whether this blockchain address is a deposit address associated with the virtual account).</p>
     * <p>If the blockchain address is assigned to a virtual account, information about this account is returned. Otherwise, an error message is returned.</p>
     *
     * @param currency The cryptocurrency of the blockchain address to check
     * @param address The blockchain address to check
     * @param index Only for BNB Beacon Chain, Stellar, or XRPL<ul><li>For <b>BNB Beacon Chain</b>, specify the memo.</li><li>For <b>Stellar</b>, specify the message.</li><li>For <b>XRPL</b>, specify the DestinationTag.</li></ul>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Assign a blockchain address to a virtual account
     * <p><b>2 credits per API call</b></p>
     * <p>Assign an existing blockchain address to a virtual account. The blockchain address becomes a deposit address associated with this account.</br>Use this API when the <a href="https://apidoc.tatum.io/tag/Account#operation/createAccount" target="_blank">virtual account has no default extended public key</a> (<code>xpub</code>) and deposit addresses are handled manually.</p>
     * <p>You can assign multiple blockchain addresses to one virtual account. When you have multiple blockchain addresses assigned to the same virtual account, you aggregate various blockchain transactions from different addresses under a single account.<br/>You can deposit funds from another blockchain address to a deposit address associated with the virtual account, and the funds will be credited to that virtual account.</p>
     * <p><b>Scanning for incoming deposits</b><br/>
     * By default, deposit addresses are scanned for incoming deposits. Deposit addresses are automatically synchronized with the associated virtual account, and you can see incoming deposits on the virtual account.<br/>Scanning deposit addresses for incoming deposits consumes <b>20 credits per address per day</b>.</p>
     * <p>If you want to be notified about certain events occurring on the deposit addresses, <a href="https://apidoc.tatum.io/tag/Notification-subscriptions#operation/createSubscription" target="_blank">subscribe for notifications</a>.</p>
     *
     * @param id The ID of the virtual account to assign a blockchain address to
     * @param address The blockchain address to assign to the virtual account
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Remove a deposit address from a virtual account
     * <p><b>1 credit per API call</b></p>
     * <p>Remove a deposit address from the virtual account.</p>
     * <p>The deposit address will no longer be scanned for incoming deposits. You will no longer be able to generate this address again.</p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
