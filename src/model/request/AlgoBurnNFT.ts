import { AlgoBurnFT } from './AlgoBurnFT';
import {Currency} from './Currency'
import { IsNotEmpty, IsNumberString, IsOptional, Length, MaxLength, IsIn} from 'class-validator';

export class AlgoBurnNFT extends AlgoBurnFT {

    @IsNotEmpty()
    @IsIn([Currency.ALGO])
    public chain: Currency;
}