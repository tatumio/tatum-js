import {Type} from 'class-transformer';
import {
    IsIn,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    Length,
    Matches,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';
import {Currency, ETH_BASED_CURRENCIES} from './Currency';
import {Fee} from './Fee';
import { PrivateKeyOrSignatureId } from './PrivateKeyOrSignatureId'

export class TransferEthErc20 extends PrivateKeyOrSignatureId {

    @IsNotEmpty()
    @Length(42, 43)
    public to: string;

    @IsNotEmpty()
    @IsNumberString()
    @Matches(/^[+]?((\d+(\.\d*)?)|(\.\d+))$/)
    public amount: string;

    @MaxLength(130000)
    @IsOptional()
    public data?: string;

    @IsNotEmpty()
    @IsIn(ETH_BASED_CURRENCIES)
    public currency: Currency;

    @IsOptional()
    @Type(() => Fee)
    @ValidateNested()
    public fee?: Fee;

    @Min(0)
    @IsOptional()
    public nonce?: number;
}
