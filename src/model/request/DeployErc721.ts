import {IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class DeployErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(1, 100)
    public name: string;

    @IsNotEmpty()
    @Length(1, 30)
    public symbol: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
