export interface TronTransaction {
    ret: { contractRet: string, fee: number }[];
    signature: string[];
    txID: string;
    blockNumber: number;
    netFee?: number;
    netUsage?: number;
    energyFee?: number;
    energyUsage?: number;
    energyUsageTotal?: number;
    internalTransactions?: any[];
    rawData: {
        contract: {
            parameter: {
                value: any;
                type_url: string
            };
            type: string
        }[];
        ref_block_bytes: string;
        ref_block_hash: string;
        expiration: number;
        fee_limit: number;
        timestamp: number;
    };
}
