import {IsNotEmpty, IsNumberString, IsOptional, IsUUID, Length, Matches, ValidateIf, MaxLength, IsBoolean} from 'class-validator';

export class TransferAlgoOffchain {
    @Length(1, 500)
    @ValidateIf(o => !o.signatureId && !o.privateKey)
    @IsNotEmpty()
    public mnemonic: string;

    @ValidateIf(o => !o.mnemonic && !o.signatureId)
    @Length(66, 66)
    @IsNotEmpty()
    public privateKey: string;

    @ValidateIf(o => !o.mnemonic && !o.privateKey)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;

    @IsNumberString()
    @IsOptional()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public fee: string;

    @IsNotEmpty()
    @Length(24, 24)
    public senderAccountId: string;

    @IsNotEmpty()
    @Length(1, 10000)
    public address: string;

    @IsNotEmpty()
    @IsNumberString()
    @MaxLength(38)
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

    @IsOptional()
    public multipleAmounts?: string[];

    @MaxLength(256)
    @Matches(/^[ -~]{1,256}$/)
    @IsOptional()
    public attr?: string;
}
