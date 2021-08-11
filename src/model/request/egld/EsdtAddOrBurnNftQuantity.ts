import {EsdtToken} from './EsdtToken';
import {IsNotEmpty, Min} from 'class-validator';

export class EsdtAddOrBurnNftQuantity extends EsdtToken {
    @IsNotEmpty()
    @Min(0)
    public nonce: number;

    @IsNotEmpty()
    @Min(0)
    public quantity: number;
}
