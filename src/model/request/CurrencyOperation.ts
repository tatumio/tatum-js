import {IsNotEmpty, IsNumberString, IsOptional, Length, Matches, MaxLength} from 'class-validator';

export class CurrencyOperation {

    @IsNotEmpty()
    @Length(24, 24)
    public accountId: string;

    @IsNotEmpty()
    @IsNumberString()
    @MaxLength(38)
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @Length(1, 100)
    @IsOptional()
    public paymentId?: string;

    @Length(1, 100)
    @IsOptional()
    public transactionCode?: string;

    @Length(1, 500)
    @IsOptional()
    public senderNote?: string;

    @Length(1, 500)
    @IsOptional()
    public recipientNote?: string;

    @Length(24, 24)
    @IsOptional()
    public counterAccount?: string;

    @Length(1, 50)
    @IsOptional()
    public reference?: string;
}
