/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { AccountBalance } from '../models/AccountBalance';
import type { Blockage } from '../models/Blockage';
import type { BlockAmount } from '../models/BlockAmount';
import type { CreateAccount } from '../models/CreateAccount';
import type { CreateAccountBatch } from '../models/CreateAccountBatch';
import type { EntitiesCount } from '../models/EntitiesCount';
import type { Id } from '../models/Id';
import type { TransactionResult } from '../models/TransactionResult';
import type { UnblockAmount } from '../models/UnblockAmount';
import type { UpdateAccount } from '../models/UpdateAccount';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class AccountService {

    /**
     * Create new account
     * <h4>2 credits per API call.</h4><br/>
     * <p>Creates a new account for the customer. This will create an account on Tatum Private Ledger. It is possible to create an account for every supported cryptocurrency, FIAT, any ERC20 token created within a Tatum instance, and Tatum virtual currencies. When the customer field is already present, the account is added to the customer's list of accounts. If the customer field is not present, a new customer is created along with the account.<br/>
     * Every account has its own balance. Tatum supports 2 types of balances - accountBalance and availableBalance. The account balance represents all assets in the account, both available and blocked. The available balance in the account represents account balance minus the blocked amount in the account. The available balance should be used to determine how much a customer can send or withdraw from the account.<br/>
     * An account is always created with a specific currency. Once the currency is set, it cannot be changed.<br/>
     * When an account's currency is blockchain-based, like BTC or ETH, the account is usually created with xpub. Xpub represents an extended public key of the blockchain wallet, which will be connected to this account. Adding xpub to the account does not connect any specific blockchain address to this account. Xpub is just a generator of addresses, not an address itself.
     * Every blockchain has different types of xpubs:
     * <ul>
     * <li><b>BTC</b> - xpub can be obtained from <a href="#operation/BtcGenerateWallet">generate wallet</a></li>
     * <li><b>LTC</b> - xpub can be obtained from <a href="#operation/LtcGenerateWallet">generate wallet</a></li>
     * <li><b>DOGE</b> - xpub can be obtained from <a href="#operation/DogeGenerateWallet">generate wallet</a></li>
     * <li><b>BCH</b> - xpub can be obtained from <a href="#operation/BchGenerateWallet">generate wallet</a></li>
     * <li><b>ADA</b> - xpub can be obtained from <a href="#operation/AdaGenerateWallet">generate wallet</a></li>
     * <li><b>ETH and ERC20</b> - xpub can be obtained from <a href="#operation/EthGenerateWallet">generate wallet</a></li>
     * <li><b>XRP</b> - xpub is the address field from <a href="#operation/XrpWallet">generate account</a></li>
     * <li><b>XLM</b> - xpub is the address field from <a href="#operation/XlmWallet">generate account</a></li>
     * <li><b>BNB</b> - xpub is the address field from <a href="#operation/BnbGenerateWallet">generate account</a></li>
     * <li><b>LUNA</b> - xpub is the address field from <a href="#operation/TerraGenerateWallet">generate account</a></li>
     * <li><b>BSC</b> - xpub can be obtained from <a href="#operation/BscGenerateWallet">generate wallet</a></li>
     * <li><b>EGLD</b> - no xpub, use address field from <a href="#operation/EgldGenerateWallet">generate wallet</a></li>
     * <li><b>ALGO</b> - no xpub, use address field from <a href="#operation/AlgoGenerateWallet">generate wallet</a></li>
     * <li><b>SOL</b> - no xpub, use address field from <a href="#operation/SolanaGenerateWallet">generate wallet</a></li>
     * <li><b>MATIC</b> - xpub can be obtained from <a href="#operation/PolygonGenerateWallet">generate wallet</a></li>
     * <li><b>KLAY</b> - xpub can be obtained from <a href="#operation/KlaytnGenerateWallet">generate wallet</a></li>
     * <li><b>XDC</b> - xpub can be obtained from <a href="#operation/XdcGenerateWallet">generate wallet</a></li>
     * <li><b>KCS</b> - xpub can be obtained from <a href="#operation/KcsGenerateWallet">generate wallet</a></li>
     * <li><b>CELO, cEUR, cUSD and ERC20</b> - xpub can be obtained from <a href="#operation/CeloGenerateWallet">generate wallet</a></li>
     * <li><b>TRON and TRC tokens</b> - xpub can be obtained from <a href="#operation/GenerateTronwallet">generate wallet</a></li>
     * <li><b>FLOW and FUSD</b> - xpub can be obtained from <a href="#operation/GenerateFlowwallet">generate wallet</a></li>
     * </ul>
     * There are 2 options for connecting an account to a blockchain:
     * <ul>
     * <li>If xpub is present in the account, addresses are generated for the account via <a href="#operation/generateDepositAddress">Create new deposit address</a>. This is the preferred mechanism.</li>
     * <li>If xpub is not present in the account, addresses for this account are assigned manually via <a href="#operation/assignAddress">Assign address</a>. This feature is used when there are already existing addresses to be used in Tatum.</li>
     * </ul></p>
     *
     * @param requestBody
     * @returns Account OK
     * @throws ApiError
     */
    public static createAccount(
        requestBody: CreateAccount,
    ): CancelablePromise<Account> {
        return __request({
            method: 'POST',
            path: `/v3/ledger/account`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
     * @param accountCode Filter by account code
     * @param accountNumber Filter by account number
     * @param customerId Filter by customer id
     * @returns Account OK
     * @throws ApiError
     */
    public static getAccounts(
        pageSize?: number,
        page?: number,
        sort?: 'asc' | 'desc',
        sortBy?: '_id' | 'account_code' | 'customer_id' | 'account_balance' | 'available_balance',
        active?: boolean,
        onlyNonZeroBalance?: boolean,
        frozen?: boolean,
        currency?: string,
        accountCode?: string,
        accountNumber?: string,
        customerId?: string,
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
                'accountCode': accountCode,
                'accountNumber': accountNumber,
                'customerId': customerId,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
     * @param accountCode Filter by account code
     * @param accountNumber Filter by account number
     * @param customerId Filter by customer id
     * @returns EntitiesCount OK
     * @throws ApiError
     */
    public static getAccountsCount(
        pageSize?: number,
        page?: number,
        sort?: 'asc' | 'desc',
        sortBy?: '_id' | 'account_code' | 'customer_id' | 'account_balance' | 'available_balance',
        active?: boolean,
        onlyNonZeroBalance?: boolean,
        frozen?: boolean,
        currency?: string,
        accountCode?: string,
        accountNumber?: string,
        customerId?: string,
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
                'accountCode': accountCode,
                'accountNumber': accountNumber,
                'customerId': customerId,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due a to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}