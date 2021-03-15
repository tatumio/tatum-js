import { Type } from 'class-transformer'
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {Currency} from './Currency';
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class MintErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 42)
    public to: string;

    @IsNotEmpty()
    @MaxLength(256)
    public url: string;

    @IsNotEmpty()
    @MaxLength(256)
    public tokenId: string;

    @IsNotEmpty()
    @Length(42, 42)
    public contractAddress: string;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
