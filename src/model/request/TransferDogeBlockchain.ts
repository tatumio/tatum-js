import {Type} from 'class-transformer'
import {ArrayNotEmpty, IsNotEmpty, IsNumberString, IsOptional, Length, Validate, ValidateNested} from 'class-validator'
import {FromUTXO, To} from './TransferBtcBasedBlockchain'
import {FeeChangeValidator} from "../validation/FeeChangeValidator";

export class FromUTXODoge extends FromUTXO {
    @IsNotEmpty()
    @IsNumberString()
    public value: string;

    @IsNotEmpty()
    @Length(30, 50)
    public address: string;

}

export class TransferDogeBlockchain {

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => FromUTXODoge)
    public fromUTXO: FromUTXODoge[];

    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => To)
    public to: To[];

    @Validate(FeeChangeValidator)
    @IsOptional()
    @IsNumberString()
    public fee?: string;

    @Validate(FeeChangeValidator)
    @IsOptional()
    @Length(30, 50)
    public changeAddress?: string;
}
