import { BchBlock, BchInfo, BchTx, BlockHash, TransactionHash } from '../model';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchBroadcast" target="_blank">Tatum API documentation</a>
 */
export declare const bcashBroadcast: (txData: string, signatureId?: string | undefined) => Promise<TransactionHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export declare const bcashGetCurrentBlock: () => Promise<BchInfo>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetBlock" target="_blank">Tatum API documentation</a>
 */
export declare const bcashGetBlock: (hash: string) => Promise<BchBlock>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export declare const bcashGetBlockHash: (i: number) => Promise<BlockHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export declare const bcashGetTxForAccount: (address: string, skip?: number) => Promise<BchTx[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export declare const bcashGetTransaction: (hash: string) => Promise<BchTx>;
