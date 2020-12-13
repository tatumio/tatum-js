import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    IsOptional,
    Length,
    Matches,
    MaxLength,
    Min,
} from 'class-validator';

export class BlockageTransaction {

    @IsNotEmpty()
    @Length(24, 24)
    public recipientAccountId: string;

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

    @IsNumber()
    @Min(0)
    @IsOptional()
    public baseRate?: number;

    @IsOptional()
    @IsBoolean()
    public anonymous?: boolean;

    @IsOptional()
    @IsBoolean()
    public compliant?: boolean;
}
