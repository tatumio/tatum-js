import {IsInt, IsNotEmpty, Length, Min} from 'class-validator';

export class TransferXtz {
    @IsNotEmpty()
    @Length(256, 256)
    public privateKey: string; // 128-bit extended private key

    @IsNotEmpty()
    public to: string; // address

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    public amount: number; // mutez
}
