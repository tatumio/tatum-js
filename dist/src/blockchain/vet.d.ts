import { EstimateGasVet, TransactionHash, VetBlock, VetEstimateGas, VetTx, VetTxReceipt } from '../model';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetBroadcast" target="_blank">Tatum API documentation</a>
 */
export declare const vetBroadcast: (txData: string, signatureId?: string | undefined) => Promise<TransactionHash>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetEstimateGas" target="_blank">Tatum API documentation</a>
 */
export declare const vetEstimateGas: (body: EstimateGasVet) => Promise<VetEstimateGas>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export declare const vetGetCurrentBlock: () => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetBlock" target="_blank">Tatum API documentation</a>
 */
export declare const vetGetBlock: (hash: string) => Promise<VetBlock>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetBalance" target="_blank">Tatum API documentation</a>
 */
export declare const vetGetAccountBalance: (address: string) => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetEnergy" target="_blank">Tatum API documentation</a>
 */
export declare const vetGetAccountEnergy: (address: string) => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetTransaction" target="_blank">Tatum API documentation</a>
 */
export declare const vetGetTransaction: (hash: string) => Promise<VetTx>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/VetGetTransactionReceipt" target="_blank">Tatum API documentation</a>
 */
export declare const vetGetTransactionReceipt: (hash: string) => Promise<VetTxReceipt>;
