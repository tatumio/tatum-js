import { Type } from 'class-transformer'
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
  MaxLength,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {SignatureIdValidator} from '../validation/SignatureIdValidator';
import {Currency} from './Currency';
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class TransferErc721 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 42)
    public to: string;

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
