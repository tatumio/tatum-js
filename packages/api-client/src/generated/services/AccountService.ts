/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { AccountBalance } from '../models/AccountBalance';
import type { Blockage } from '../models/Blockage';
import type { BlockAmount } from '../models/BlockAmount';
import type { CreateAccount } from '../models/CreateAccount';
import type { CreateAccountBatch } from '../models/CreateAccountBatch';
import type { CreateAccountXpub } from '../models/CreateAccountXpub';
import type { EntitiesCount } from '../models/EntitiesCount';
import type { Id } from '../models/Id';
import type { TransactionResult } from '../models/TransactionResult';
import type { UnblockAmount } from '../models/UnblockAmount';
import type { UpdateAccount } from '../models/UpdateAccount';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class AccountService {

    /**
     * Create a virtual account
     * <p><b>2 credits per API call</b></p>
     * <p>Create a new virtual account for a customer.</p>
     * <ul>
     * <li>If the customer that you specified in the request body already exists, the newly created virtual account is added to this customer's list of accounts.</li>
     * <li>If the customer that you specified in the request body does not exist yet, a new customer is created together with the virtual account, and the virtual account is added to this customer.</li>
     * </ul>
     * <p>You can create a virtual account for any supported cryptocurrency, fiat currency, Tatum virtual currency, or fungible tokens created within Tatum. Once the currency/asset is set for a virtual account, it cannot be changed.</p>
     * <p><b>Virtual account balance</b></p>
     * <p>A virtual account has its own balance. The balance can be logically presented by the account balance and available balance:</p>
     * <ul>
     * <li>The <b>account balance</b> (<code>accountBalance</code>) represents all assets on the account, both available and blocked.</li>
     * <li>The <b>available balance</b> (<code>availableBalance</code>) represents the account balance minus the blocked assets. Use the available balance to determine how much a customer can send or withdraw from their virtual account.</li>
     * </ul>
     * <p><b>Cryptocurrency virtual accounts</b></p>
     * <p>When you create a virtual account based on a cryptocurrency (for example, BTC or ETH), you have to provide the extended public key (<code>xpub</code>) of the blockchain wallet that will be connected to this account.</p>
     * <p><b>NOTE:</b> Adding <code>xpub</code> to the virtual account does <b>not</b> connect any specific blockchain address to this account. <code>xpub</code> is a generator of addresses, not an address itself.</p>
     * <p>Not all blockchains provide <code>xpub</code> for wallets, or Tatum may not support wallets on some blockchains. In such cases, use the wallet address or the account address instead.</p>
     * <ul>
     * <li><b>ALGO:</b> No <code>xpub</code> provided; use <code>address</code> from the <a href="https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet" target="_blank">generated wallet</a> instead.</li>
     * <li><b>BCH:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>BNB:</b> No <code>xpub</code> provided; use <code>address</code> from the <a href="https://apidoc.tatum.io/tag/BNB-Beacon-Chain#operation/BnbGenerateWallet" target="_blank">generated wallet</a> instead.</li>
     * <li><b>BSC:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateWallet" target="_blank">generated wallet</a> instead.</li>
     * <li><b>BTC:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Bitcoin#operation/BtcGenerateWallet" target="_blank">generated wallet</a> instead.</li>
     * <li><b>CELO:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>DOGE:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>EGLD:</b> No <code>xpub</code> provided; use <code>address</code> from the <a href="https://apidoc.tatum.io/tag/Elrond#operation/EgldGenerateAddress" target="_blank">generated blockchain address</a> instead.<br />Blockchain addresses on Elrond are generated based on the mnemonic of an Elrond wallet. If you do not have an Elrond wallet, <a href="https://apidoc.tatum.io/tag/Elrond/#operation/EgldGenerateWallet" target="_blank">create one</a>.</li>
     * <li><b>ETH:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>FLOW:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Flow#operation/FlowGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>KCS:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>KLAY:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>LTC:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>MATIC:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>SOL:</b> No <code>xpub</code> provided; use <code>address</code> from the <a href="https://apidoc.tatum.io/tag/Solana#operation/SolanaGenerateWallet" target="_blank">generated wallet</a> instead.</li>
     * <li><b>TRON:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/Tron#operation/GenerateTronwallet" target="_blank">generated wallet</a>.</li>
     * <li><b>XDC:</b> Obtain <code>xpub</code> from the <a href="https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateWallet" target="_blank">generated wallet</a>.</li>
     * <li><b>XLM:</b> No <code>xpub</code> provided; use <code>address</code> from the <a href="https://apidoc.tatum.io/tag/Stellar#operation/XlmWallet" target="_blank">generated account</a> instead.</li>
     * <li><b>XRP:</b> No <code>xpub</code> provided; use <code>address</code> from the <a href="https://apidoc.tatum.io/tag/XRP#operation/XrpWallet" target="_blank">generated account</a> instead.</li>
     * </ul>
     * <p><b>Connect a virtual account to the blockchain</b></p>
     * <ul>
     * <li>If the virtual account was created with the wallet's <code>xpub</code>, <a href="https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress" target="_blank">generate a new blockchain address</a> for this account.</li>
     * <li>If the virtual account was created with the wallet's or account's address instead of the wallet's <code>xpub</code>, <a href="https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress" target="_blank">assign an existing blockchain address</a> to this account.</li>
     * </ul>
     * <p>You can connect multiple blockchain addresses to one virtual account.</p>
     * <p>Digital assets:</p>
     * <ul>
     * <li><b>USDC_MATIC</b> refers to contract <code>0x2791bca1f2de4661ed88a30c99a7a9449aa84174</code> on Polygon mainnet.</li>
     * <li><b>USDC_MATIC_NATIVE</b> refers to contract <code>0x3c499c542cef5e3811e1192ce70d8cc03d5c3359</code> on Polygon mainnet.</li>
     * </ul>
     *
     * @param requestBody
     * @returns Account OK
     * @throws ApiError
     */
    public static createAccount(
        requestBody: (CreateAccountXpub | CreateAccount),
    ): CancelablePromise<Account> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/account`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * List all accounts
     * <h4>1 credit per API call.</h4><br/><p>Lists all accounts. Inactive accounts are also visible.</p>
     * @param pageSize Max number of items per page is 50.
     * @param page Page number
     * @param sort Direction of sorting. Can be asc or desc
     * @param sortBy Sort by
     * @param active Filter only active or non active accounts
     * @param onlyNonZeroBalance Filter only accounts with non zero balances
     * @param frozen Filter only frozen or non frozen accounts
     * @param currency Filter by currency
     * @param accountNumber Filter by account number
     * @returns Account OK
     * @throws ApiError
     */
    public static getAccounts(
        pageSize?: number,
        page?: number,
        sort?: 'asc' | 'desc',
        sortBy?: 'id' | 'account_number' | 'account_balance' | 'available_balance',
        active?: boolean,
        onlyNonZeroBalance?: boolean,
        frozen?: boolean,
        currency?: string,
        accountNumber?: string,
    ): CancelablePromise<Array<Account>> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/account`,
            query: {
                'pageSize': pageSize,
                'page': page,
                'sort': sort,
                'sortBy': sortBy,
                'active': active,
                'onlyNonZeroBalance': onlyNonZeroBalance,
                'frozen': frozen,
                'currency': currency,
                'accountNumber': accountNumber,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Count of found entities for get accounts request
     * <h4>1 credit per API call.</h4><br/><p>Count of accounts that were found from /v3/ledger/account</p>
     * @param pageSize Max number of items per page is 50.
     * @param page Page number
     * @param sort Direction of sorting. Can be asc or desc
     * @param sortBy Sort by
     * @param active Filter only active or non active accounts
     * @param onlyNonZeroBalance Filter only accounts with non zero balances
     * @param frozen Filter only frozen or non frozen accounts
     * @param currency Filter by currency
     * @param accountNumber Filter by account number
     * @returns EntitiesCount OK
     * @throws ApiError
     */
    public static getAccountsCount(
        pageSize?: number,
        page?: number,
        sort?: 'asc' | 'desc',
        sortBy?: '_id' | 'account_number' | 'account_balance' | 'available_balance',
        active?: boolean,
        onlyNonZeroBalance?: boolean,
        frozen?: boolean,
        currency?: string,
        accountNumber?: string,
    ): CancelablePromise<EntitiesCount> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/account/count`,
            query: {
                'pageSize': pageSize,
                'page': page,
                'sort': sort,
                'sortBy': sortBy,
                'active': active,
                'onlyNonZeroBalance': onlyNonZeroBalance,
                'frozen': frozen,
                'currency': currency,
                'accountNumber': accountNumber,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Create multiple accounts in a batch call
     * <h4>2 credits per API call + 1 credit for every account created.</h4><br/>
     * <p>Creates new accounts for the customer in a batch call.</p>
     *
     * @param requestBody
     * @returns Account OK
     * @throws ApiError
     */
    public static createAccountBatch(
        requestBody: CreateAccountBatch,
    ): CancelablePromise<Array<Account>> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/account/batch`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * List all customer accounts
     * <h4>1 credit per API call.</h4><br/><p>Lists all accounts associated with a customer. Only active accounts are visible.</p>
     * @param pageSize Max number of items per page is 50.
     * @param id Internal customer ID
     * @param offset Offset to obtain the next page of data.
     * @param accountCode For bookkeeping to distinct account purpose.
     * @returns Account OK
     * @throws ApiError
     */
    public static getAccountsByCustomerId(
        pageSize: number,
        id: string,
        offset?: number,
        accountCode?: string,
    ): CancelablePromise<Array<Account>> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/account/customer/${id}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
                'accountCode': accountCode,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get account by ID
     * <h4>1 credit per API call.</h4><br/><p>Gets active account by ID. Displays all information regarding the given account.</p>
     * @param id Account ID
     * @returns Account OK
     * @throws ApiError
     */
    public static getAccountByAccountId(
        id: string,
    ): CancelablePromise<Account> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/account/${id}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Update account
     * <h4>2 credits per API call.</h4><br/><p>Update account by ID. Only a small number of fields can be updated.</p>
     * @param id Account ID
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateAccountByAccountId(
        id: string,
        requestBody: UpdateAccount,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/account/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get account balance
     * <h4>1 credit per API call.</h4><br/><p>Get balance for the account.</p>
     * @param id Account ID
     * @returns AccountBalance OK
     * @throws ApiError
     */
    public static getAccountBalance(
        id: string,
    ): CancelablePromise<AccountBalance> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/account/${id}/balance`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Block an amount in an account
     * <h4>2 credits per API call.</h4><br/>
     * <p>Blocks an amount in an account. Any number of distinct amounts can be blocked in one account.
     * Every new blockage has its own distinct ID, which is used as a reference. When the amount is blocked, it is debited from the available balance of the account.
     * The account balance remains the same. The account balance represents the total amount of funds in the account. The available balance represents the total amount of funds that can be used to perform transactions. When an account is frozen, the available balance is set to 0 minus all blockages for the account.</p>
     *
     * @param id Account ID
     * @param requestBody
     * @returns Id OK
     * @throws ApiError
     */
    public static blockAmount(
        id: string,
        requestBody: BlockAmount,
    ): CancelablePromise<Id> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/account/block/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Unblock an amount in an account and perform a transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Unblocks a previously blocked amount in an account and invokes a ledger transaction from that account to a different recipient.
     * If the request fails, the amount is not unblocked.</p>
     *
     * @param id Blockage ID
     * @param requestBody
     * @returns TransactionResult OK
     * @throws ApiError
     */
    public static unblockAmountWithTransaction(
        id: string,
        requestBody: UnblockAmount,
    ): CancelablePromise<TransactionResult> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/account/block/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Unblock a blocked amount in an account
     * <h4>1 credit per API call.</h4><br/><p>Unblocks a previously blocked amount in an account. Increases the available balance in the account where the amount was blocked.</p>
     * @param id Blockage ID
     * @returns void
     * @throws ApiError
     */
    public static deleteBlockAmount(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/v3/ledger/account/block/${id}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get blocked amounts in an account
     * <h4>1 credit per API call.</h4><br/><p>Gets blocked amounts for an account.</p>
     * @param id Account ID
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain the next page of data.
     * @returns Blockage OK
     * @throws ApiError
     */
    public static getBlockAmount(
        id: string,
        pageSize: number,
        offset?: number,
    ): CancelablePromise<Array<Blockage>> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/account/block/${id}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get blocked amount by ID
     * <h4>1 credit per API call.</h4><br/><p>Gets blocked amount by id.</p>
     * @param id Blocked amount ID
     * @returns Blockage OK
     * @throws ApiError
     */
    public static getBlockAmountById(
        id: string,
    ): CancelablePromise<Blockage> {
        return __request({
            method: 'GET',
            path: `/v3/ledger/account/block/${id}/detail`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Unblock all blocked amounts in an account
     * <h4>1 credit per API call, 1 credit for each deleted blockage. 1 API call + 2 blockages  = 3 credits.</h4><br/><p>Unblocks previously blocked amounts in an account. Increases the available balance in the account where the amount was blocked.</p>
     * @param id Account ID
     * @returns void
     * @throws ApiError
     */
    public static deleteAllBlockAmount(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/v3/ledger/account/block/account/${id}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Activate account
     * <h4>2 credits per API call.</h4><br/><p>Activates an account.</p>
     * @param id Account ID
     * @returns void
     * @throws ApiError
     */
    public static activateAccount(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/account/${id}/activate`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due a to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Deactivate account
     * <h4>2 credits per API call.</h4><br/><p>Deactivates an account. Only accounts with account and available balances of zero can be deactivated. Deactivated accounts are not visible in the list of accounts, it is not possible to send funds to these accounts or perform transactions. However, they are still present in the ledger and all transaction histories.</p>
     * @param id Account ID
     * @returns void
     * @throws ApiError
     */
    public static deactivateAccount(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/account/${id}/deactivate`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Freeze account
     * <h4>2 credits per API call.</h4><br/><p>Disables all outgoing transactions. Incoming transactions to the account are available. When an account is frozen, its available balance is set to 0. This operation will create a new blockage of type ACCOUNT_FROZEN, which is automatically deleted when the account is unfrozen.</p>
     * @param id Account ID
     * @returns void
     * @throws ApiError
     */
    public static freezeAccount(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/account/${id}/freeze`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Unfreeze account
     * <h4>2 credits per API call.</h4><br/><p>Unfreezes a previously frozen account. Unfreezing a non-frozen account not affect the account.</p>
     * @param id Account ID
     * @returns void
     * @throws ApiError
     */
    public static unfreezeAccount(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'PUT',
            path: `/v3/ledger/account/${id}/unfreeze`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}