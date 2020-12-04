import { TransactionHash } from '../model';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetFee" target="_blank">Tatum API documentation</a>
 */
export declare const xrpGetFee: () => Promise<{
    drops: {
        base_fee: number;
    };
}>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetAccountInfo" target="_blank">Tatum API documentation</a>
 */
export declare const xrpGetAccountInfo: (account: string) => Promise<{
    ledger_current_index: number;
    account_data: {
        Sequence: number;
    };
}>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpBroadcast" target="_blank">Tatum API documentation</a>
 */
export declare const xrpBroadcast: (txData: string, signatureId?: string | undefined) => Promise<TransactionHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetLastClosedLedger" target="_blank">Tatum API documentation</a>
 */
export declare const xrpGetCurrentLedger: () => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetLedger" target="_blank">Tatum API documentation</a>
 */
export declare const xrpGetLedger: (i: number) => Promise<any>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetAccountBalance" target="_blank">Tatum API documentation</a>
 */
export declare const xrpGetAccountBalance: (address: string) => Promise<any>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetTransaction" target="_blank">Tatum API documentation</a>
 */
export declare const xrpGetTransaction: (hash: string) => Promise<any>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpGetAccountTx" target="_blank">Tatum API documentation</a>
 */
export declare const xrpGetAccountTransactions: (address: string, min?: number | undefined, marker?: string | undefined) => Promise<any>;
