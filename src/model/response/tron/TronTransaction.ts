export interface TronTransaction {
    ret: { contractRet: string, fee:number }[];
    signature: string[];
    txID: string;
    netFee?: number;
    netUsage?: number;
    energyFee?: number;
    energyUsage?: number;
    energyUsageTotal?: number;
    internalTransactions?: any[];
    rawData: {
        contract: {
            parameter: {
                value: {
                    data: string;
                    ownerAddress: string;
                    contractAddress: string
                };
                typeUrl: string
            };
            type: string
        }[];
        refBlockBytes: string;
        refBlockHash: string;
        expiration: number;
        feeLimit: number;
        timestamp: number;
    };
}
