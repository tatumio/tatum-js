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
} from 'class-validator'
import {SignatureIdValidator} from '../validation/SignatureIdValidator'
import {Currency} from './Currency'
import { Fee } from './Fee'
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'
import { TransferErc721 } from './TransferErc721'

export class EthTransferErc721 extends TransferErc721 {
    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;
}
