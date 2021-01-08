export interface TronTransactionInBlock {
    logs: { address: string; data: string; topics: string[] }[];
    fee: number;
    blockNumber: number;
    contractResult: string[]
    blockTimeStamp: number;
    receipt: {
        result?: string;
        energyUsage?: number;
        energyFee?: number;
        energyUsageTotal?: number;
        originEnergyUsage?: number;
        netUsage: number
    };
    id: string;
    contractAddress: string;

}
