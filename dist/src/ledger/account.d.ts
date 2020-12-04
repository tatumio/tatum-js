import { Account, AccountBalance, Blockage, BlockAmount, CreateAccount } from '../model';
import { CreateAccountsBatch } from '../model/request/CreateAccountsBatch';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAccountByAccountId" target="_blank">Tatum API documentation</a>
 */
export declare const getAccountById: (id: string) => Promise<Account>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createAccount" target="_blank">Tatum API documentation</a>
 */
export declare const createAccount: (account: CreateAccount) => Promise<Account>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/createAccountBatch" target="_blank">Tatum API documentation</a>
 */
export declare const createAccounts: (accounts: CreateAccountsBatch) => Promise<Account[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getBlockAmount" target="_blank">Tatum API documentation</a>
 */
export declare const getBlockedAmountsByAccountId: (id: string, pageSize?: number, offset?: number) => Promise<Blockage[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/blockAmount" target="_blank">Tatum API documentation</a>
 */
export declare const blockAmount: (id: string, block: BlockAmount) => Promise<{
    id: string;
}>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteBlockAmount" target="_blank">Tatum API documentation</a>
 */
export declare const deleteBlockedAmount: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteAllBlockAmount" target="_blank">Tatum API documentation</a>
 */
export declare const deleteBlockedAmountForAccount: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/activateAccount" target="_blank">Tatum API documentation</a>
 */
export declare const activateAccount: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deactivateAccount" target="_blank">Tatum API documentation</a>
 */
export declare const deactivateAccount: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/freezeAccount" target="_blank">Tatum API documentation</a>
 */
export declare const freezeAccount: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/unfreezeAccount" target="_blank">Tatum API documentation</a>
 */
export declare const unfreezeAccount: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAccountsByCustomerId" target="_blank">Tatum API documentation</a>
 */
export declare const getAccountsByCustomerId: (id: string, pageSize?: number, offset?: number) => Promise<Account[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAllAccounts" target="_blank">Tatum API documentation</a>
 */
export declare const getAllAccounts: (pageSize?: number, offset?: number) => Promise<Account[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAccountBalance" target="_blank">Tatum API documentation</a>
 */
export declare const getAccountBalance: (id: string) => Promise<AccountBalance>;
