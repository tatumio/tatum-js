export interface TronAccount {
    address: string;
    freeNetUsage: number;
    balance: number;
    trc10: { key: string, value: number }[];
    trc20: { [key: string]: string }[];
    assetIssuedId?: string;
    assetIssuedName?: string;
    createTime: number;
}
