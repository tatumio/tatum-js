import { BlockHash, LtcBlock, LtcInfo, LtcTx, LtcUTXO, TransactionHash } from '../model';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcBroadcast" target="_blank">Tatum API documentation</a>
 */
export declare const ltcBroadcast: (txData: string, signatureId?: string | undefined) => Promise<TransactionHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export declare const ltcGetCurrentBlock: () => Promise<LtcInfo>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBlock" target="_blank">Tatum API documentation</a>
 */
export declare const ltcGetBlock: (hash: string) => Promise<LtcBlock>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export declare const ltcGetBlockHash: (i: number) => Promise<BlockHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetUTXO" target="_blank">Tatum API documentation</a>
 */
export declare const ltcGetUTXO: (hash: string, i: number) => Promise<LtcUTXO>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export declare const ltcGetTxForAccount: (address: string, pageSize?: number, offset?: number) => Promise<LtcTx[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export declare const ltcGetTransaction: (hash: string) => Promise<LtcTx>;
