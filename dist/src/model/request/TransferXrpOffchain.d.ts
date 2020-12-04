import { CreateWithdrawal } from './CreateWithdrawal';
export declare class TransferXrpOffchain extends CreateWithdrawal {
    account: string;
    secret: string;
    sourceTag?: number;
}
