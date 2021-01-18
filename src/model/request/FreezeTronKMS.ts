import {IsIn, IsNotEmpty, IsNumberString, Length, Matches, Min} from 'class-validator';

export class FreezeTronKMS {

    @IsNotEmpty()
    @Length(34, 34)
    public from: string;

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
