import {EsdtToken} from './EsdtToken'
import {IsString, IsNotEmpty, Length, Min} from 'class-validator'

export class EsdtFreezeOrWipeNft extends EsdtToken {
    @IsNotEmpty()
    @Min(0)
    public nonce: number;

    @IsNotEmpty()
    @IsString()
    @Length(62, 62)
    public account: string;
}
