import {IsAlphanumeric, IsNotEmpty, MaxLength} from 'class-validator';
import {EsdtToken} from './EsdtToken';

export class EsdtCreateNftOrSft extends EsdtToken {
    @IsNotEmpty()
    @IsAlphanumeric()
    public nftName: string;

    @IsNotEmpty()
    public quantity: number;

    @IsNotEmpty()
    public royalties: number;

    @IsNotEmpty()
    @MaxLength(128)
    public hash: string;

    @IsNotEmpty()
    @MaxLength(10240)
    public attributes: string;

    @IsNotEmpty()
    public uri: string[];
}
