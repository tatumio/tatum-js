import {IsNotEmpty, IsNumberString, Matches} from 'class-validator';

export class Fee {

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public gasLimit: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public gasPrice: string;
}
