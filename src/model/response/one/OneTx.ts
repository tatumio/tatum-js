/**
 *
 * @export
 * @interface OneTx
 */
export interface OneTx {
    blockHash: string;
    blockNumber: number,
    ethHash: string,
    from: string,
    gas: number,
    gasPrice: number,
    hash: string,
    input: string,
    nonce: number,
    shardID: number,
    timestamp: number,
    to: string,
    toShardID: number,
    transactionIndex: number,
    value: number,
    contractAddress: string,
    cumulativeGasUsed: number,
    gasUsed: number,
    logs: [
        {
            address: string,
            blockHash: string,
            blockNumber: number,
            data: string,
            logIndex: number,
            removed: false,
            topics: string[],
            transactionHash: string,
            transactionIndex: number
        }
    ],
    logsBloom: string,
    root: string,
    status: boolean,
    transactionHash: string
}
