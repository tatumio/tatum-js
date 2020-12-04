import { TransactionHash } from '../model';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmGetAccountInfo" target="_blank">Tatum API documentation</a>
 */
export declare const xlmGetAccountInfo: (account: string) => Promise<{
    sequence: string;
}>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmBroadcast" target="_blank">Tatum API documentation</a>
 */
export declare const xlmBroadcast: (txData: string, signatureId?: string | undefined) => Promise<TransactionHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmGetLastClosedLedger" target="_blank">Tatum API documentation</a>
 */
export declare const xlmGetCurrentLedger: () => Promise<any>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmGetFee" target="_blank">Tatum API documentation</a>
 */
export declare const xlmGetFee: () => Promise<any>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmGetLedger" target="_blank">Tatum API documentation</a>
 */
export declare const xlmGetLedger: (i: number) => Promise<any>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmGetLedgerTx" target="_blank">Tatum API documentation</a>
 */
export declare const xlmGetLedgerTx: (i: number) => Promise<any>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmGetTransaction" target="_blank">Tatum API documentation</a>
 */
export declare const xlmGetTransaction: (hash: string) => Promise<any>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmGetAccountTx" target="_blank">Tatum API documentation</a>
 */
export declare const xlmGetAccountTransactions: (address: string) => Promise<any>;
