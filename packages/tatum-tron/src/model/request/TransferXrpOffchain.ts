import {IsNotEmpty, IsOptional, Length, Min} from 'class-validator'
import {CreateWithdrawal} from './CreateWithdrawal'

export class TransferXrpOffchain extends CreateWithdrawal {
    @IsNotEmpty()
    @Length(33, 34)
    public account: string;

    @IsNotEmpty()
    @Length(29, 29)
    public secret: string;

    @IsOptional()
    @Min(0)
    public sourceTag?: number;
}
