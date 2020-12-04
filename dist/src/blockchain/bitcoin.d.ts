import { BlockHash, BtcBlock, BtcInfo, BtcTx, BtcUTXO, TransactionHash } from '../model';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcBroadcast" target="_blank">Tatum API documentation</a>
 */
export declare const btcBroadcast: (txData: string, signatureId?: string | undefined) => Promise<TransactionHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export declare const btcGetCurrentBlock: () => Promise<BtcInfo>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBlock" target="_blank">Tatum API documentation</a>
 */
export declare const btcGetBlock: (hash: string) => Promise<BtcBlock>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export declare const btcGetBlockHash: (i: number) => Promise<BlockHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetUTXO" target="_blank">Tatum API documentation</a>
 */
export declare const btcGetUTXO: (hash: string, i: number) => Promise<BtcUTXO>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export declare const btcGetTxForAccount: (address: string, pageSize?: number, offset?: number) => Promise<BtcTx[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export declare const btcGetTransaction: (hash: string) => Promise<BtcTx>;
