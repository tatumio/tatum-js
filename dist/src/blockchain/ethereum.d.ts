import { EthBlock, EthTx, TransactionHash } from '../model';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthBroadcast" target="_blank">Tatum API documentation</a>
 */
export declare const ethBroadcast: (txData: string, signatureId?: string | undefined) => Promise<TransactionHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export declare const ethGetTransactionsCount: (address: string) => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export declare const ethGetCurrentBlock: () => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetBlock" target="_blank">Tatum API documentation</a>
 */
export declare const ethGetBlock: (hash: string) => Promise<EthBlock>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetBalance" target="_blank">Tatum API documentation</a>
 */
export declare const ethGetAccountBalance: (address: string) => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthErc20GetBalance" target="_blank">Tatum API documentation</a>
 */
export declare const ethGetAccountErc20Address: (address: string, contractAddress: string) => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetTransaction" target="_blank">Tatum API documentation</a>
 */
export declare const ethGetTransaction: (hash: string) => Promise<EthTx>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export declare const ethGetAccountTransactions: (address: string, pageSize?: number, offset?: number) => Promise<EthTx[]>;
