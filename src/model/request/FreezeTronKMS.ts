import {IsIn, IsNotEmpty, IsNumberString, IsUUID, Length, Matches, Min} from 'class-validator';

export class FreezeTronKMS {

    @IsNotEmpty()
    @Length(34, 34)
    public from: string;

    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId: string;

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
