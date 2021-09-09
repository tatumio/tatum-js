import { PrivateKeyOrSignatureId } from "./PrivateKeyOrSignatureId";
import { IsNotEmpty, IsNumberString, Length, Matches, } from 'class-validator';

export class AlgoTransaction extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsNotEmpty()
    @Length(58, 58)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public fee: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

}