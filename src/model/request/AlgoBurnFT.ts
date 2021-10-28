import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId';
import { IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, } from 'class-validator';

export class AlgoBurnFT extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(58, 58)
    public from: string;

    @IsNotEmpty()
    @IsNumberString()
    public contractAddress: string;
}