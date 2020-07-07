import {Type} from 'class-transformer';
import {ArrayNotEmpty, IsNotEmpty, ValidateNested} from 'class-validator';
import {FromUTXO, To} from './TransferBtcBasedBlockchain';

export class TransferBchBlockchain {

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => FromUTXO)
    public fromUTXO: FromUTXO[];

    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => To)
    public to: To[];
}
