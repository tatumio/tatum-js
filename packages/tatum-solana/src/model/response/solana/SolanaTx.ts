export interface SolanaTx {
    signatures: string[];
    message: {
        accountKeys: string[];
        header:{
            numRequiredSignatures: number;
            numReadonlySignedAccounts: number;
            numReadonlyUnsignedAccounts: number;
        }
        recentBlockhash: string;
        instructions: Array<{
            programIdIndex: number;
            accounts: number;
            data: string;
        }>
    }
}
