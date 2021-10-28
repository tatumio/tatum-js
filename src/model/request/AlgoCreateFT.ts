import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId';
import { IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, } from 'class-validator';

export class AlgoCreateFT extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsNotEmpty()
    @IsNumberString()
    public supply: string;

    @IsNotEmpty()
    @IsNumberString()
    public decimals: string;

    @IsOptional()
    public symbol: string;

    @IsOptional()
    public name: string;

    @IsOptional()
    public url: string;
}