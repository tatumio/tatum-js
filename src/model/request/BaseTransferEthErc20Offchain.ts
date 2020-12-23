import {IsBoolean, IsInt, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, Min,} from 'class-validator';

export abstract class BaseTransferEthErc20Offchain {

    @IsNotEmpty()
    @Length(24, 24)
    public senderAccountId: string;

    @IsNotEmpty()
    @Length(42, 42)
    public address: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsOptional()
    @IsBoolean()
    public compliant?: boolean;

    @Length(1, 100)
    @IsOptional()
    public paymentId?: string;

    @Length(1, 500)
    @IsOptional()
    public senderNote?: string;

    @Min(0)
    @IsOptional()
    @IsInt()
    public nonce?: number;

    @IsOptional()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public gasPrice?: string;

    @IsOptional()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public gasLimit?: string;
}
