import {Type} from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty, IsUUID,
  Length,
  Max,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { SignatureIdValidator } from '../validation/SignatureIdValidator'
import {TransferBtcValidator} from '../validation/TransferBtcValidator';

class PrivateKeyOrSignatureIdBtcBased {
  @ValidateIf(o => o.privateKey || !o.signatureId)
  @IsNotEmpty()
  @Length(52, 256)
  public privateKey?: string;

  @ValidateIf(o => o.signatureId || !o.privateKey)
  @Validate(SignatureIdValidator)
  @IsNotEmpty()
  @Length(36, 36)
  @IsUUID('4')
  public signatureId?: string;
}

export class FromAddress extends PrivateKeyOrSignatureIdBtcBased {
    @IsNotEmpty()
    @Length(30, 110)
    public address: string;
}

export class FromUTXO extends PrivateKeyOrSignatureIdBtcBased {

    @IsNotEmpty()
    @Length(64, 64)
    public txHash: string;

    @IsNotEmpty()
    @Min(0)
    @Max(4294967295)
    public index: number;
}

export class To {
    @IsNotEmpty()
    @Length(30, 110)
    public address: string;

    @IsNotEmpty()
    @Min(0)
    public value: number;
}

export class TransferBtcBasedBlockchain {

    @ValidateIf(o => (o.fromUTXO && o.fromAddress) || !o.fromUTXO)
    @Validate(TransferBtcValidator)
    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => FromAddress)
    public fromAddress?: FromAddress[];

    @ValidateIf(o => (o.fromUTXO && o.fromAddress) || !o.fromAddress)
    @Validate(TransferBtcValidator)
    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => FromUTXO)
    public fromUTXO?: FromUTXO[];

    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => To)
    public to: To[];
}
