import {IsIn, IsNotEmpty, IsNumberString, IsUUID, IsInt, Length, Matches, Min, ValidateIf} from 'class-validator';

export class FreezeTron {

    @ValidateIf(o => !(o.from || o.signatureId))
    @IsNotEmpty()
    @Length(64, 64)
    public fromPrivateKey?: string;

    @ValidateIf(o => !o.fromPrivateKey)
    @IsNotEmpty()
    @Length(34, 34)
    public from?: string;

    @ValidateIf(o => !o.fromPrivateKey)
    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;

    @ValidateIf(o => o.signatureId)
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    public index?: number;

    @IsNotEmpty()
    @Length(34, 34)
    public receiver: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @IsNotEmpty()
    @IsIn(['BANDWIDTH', 'ENERGY'])
    public resource: string;

    @IsNotEmpty()
    @Min(3)
    public duration: number;
}
