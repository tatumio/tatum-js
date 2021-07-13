/**
 *
 * @export
 * @interface QtumBlock
 */
export interface QtumBlock {
        hash: string,
        confirmations: number,
        strippedsize: number,
        size: number,
        weight: number,
        height: number,
        version: number,
        versionHex: string,
        merkleroot: string,
        hashStateRoot: string,
        hashUTXORoot: string,
        prevoutStakeHash: string,
        prevoutStakeVoutN: number,
        tx: string[],
        time: number,
        mediantime: number,
        nonce: number,
        bits: string,
        difficulty: string,
        chainwork: string,
        nTx: number,
        previousblockhash: string,
        nextblockhash: string,
        flags: string,
        proofhash: string,
        modifier: string,
        signature: string
}