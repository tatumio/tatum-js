import {IsInt, IsNotEmpty, Length, Max, Min, ValidateIf} from 'class-validator';
import {CreateWithdrawal} from './CreateWithdrawal';

export class TransferTrxOffchain extends CreateWithdrawal {
    @Length(1, 500)
    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.fromPrivateKey) || (o.index >= 0 && o.fromPrivateKey))
    @IsNotEmpty()
    public mnemonic: string;

    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.fromPrivateKey) || o.mnemonic)
    @Min(0)
    @IsNotEmpty()
    @IsInt()
    @Max(2147483647)
    public index: number;

    @ValidateIf(o => (o.mnemonic && o.index >= 0 && o.fromPrivateKey) || (!o.mnemonic && !o.index))
    @Length(66, 66)
    @IsNotEmpty()
    public fromPrivateKey: string;

}
