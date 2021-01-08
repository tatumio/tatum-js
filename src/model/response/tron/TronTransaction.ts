export interface TronTransaction {
    ret: { contractRet: string }[];
    signature: string[];
    txID: string;
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
        timestamp: number
    };
}
