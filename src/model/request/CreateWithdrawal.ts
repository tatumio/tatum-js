import {IsBoolean, IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength} from 'class-validator';

export class CreateWithdrawal {

    @IsNotEmpty()
    @Length(24, 24)
    public senderAccountId: string;

    @IsNotEmpty()
    @Length(1, 100)
    public address: string;

    @IsNotEmpty()
    @IsNumberString()
    @MaxLength(38)
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsNumberString()
    @IsOptional()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public fee?: string;

    @IsOptional()
    @IsBoolean()
    public compliant?: boolean;

    @Length(1, 100)
    @IsOptional()
    public paymentId?: string;

    @Length(1, 500)
    @IsOptional()
    public senderNote?: string;

    @Length(1, 100)
    @IsOptional()
    public senderBlockchainAddress?: string;

    // TODO: unify across different blockchains
    @MaxLength(64)
    @Matches(/^[ -~]{0,64}$/)
    @IsOptional()
    public attr?: string;
}
