import {Type} from 'class-transformer';
import {ArrayNotEmpty, IsNotEmpty, IsNumberString, ValidateNested} from 'class-validator';
import {FromUTXO, To} from './TransferBtcBasedBlockchain';

export class FromUTXODoge extends FromUTXO {
    @IsNotEmpty()
    @IsNumberString()
    public value: string;
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
}
