import { Account, Address, BroadcastWithdrawal, TxHash, WithdrawalResponse } from '../model';
import { AddressBatch } from '../model/request/CreateOffchainAddressesBatch';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/generateDepositAddress" target="_blank">Tatum API documentation</a>
 */
export declare const generateDepositAddress: (id: string, index?: number | undefined) => Promise<Address>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/generateDepositAddressesBatch" target="_blank">Tatum API documentation</a>
 */
export declare const generateDepositAddresses: (batch: AddressBatch) => Promise<Address[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/addressExists" target="_blank">Tatum API documentation</a>
 */
export declare const checkAddressExists: (address: string, currency: string, index?: number | undefined) => Promise<Account>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/assignAddress" target="_blank">Tatum API documentation</a>
 */
export declare const assignDepositAddress: (id: string, address: string) => Promise<Address>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/removeAddress" target="_blank">Tatum API documentation</a>
 */
export declare const removeDepositAddress: (id: string, address: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getAllDepositAddresses" target="_blank">Tatum API documentation</a>
 */
export declare const getDepositAddressesForAccount: (id: string) => Promise<Address[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/broadcastBlockchainTransaction" target="_blank">Tatum API documentation</a>
 */
export declare const offchainBroadcast: (data: BroadcastWithdrawal) => Promise<TxHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeWithdrawal" target="_blank">Tatum API documentation</a>
 */
export declare const offchainStoreWithdrawal: (data: any) => Promise<WithdrawalResponse>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/cancelInProgressWithdrawal" target="_blank">Tatum API documentation</a>
 */
export declare const offchainCancelWithdrawal: (id: string, revert?: boolean) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/completeWithdrawal" target="_blank">Tatum API documentation</a>
 */
export declare const offchainCompleteWithdrawal: (id: string, txId: string) => Promise<void>;
