import { IsNotEmpty } from 'class-validator';

export class AdaUTxo {
    @IsNotEmpty()
    public txHash: string; // transactionHash

    @IsNotEmpty()
    public index: number;

    @IsNotEmpty()
    public value: string;
}
