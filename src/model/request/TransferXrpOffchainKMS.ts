import {IsNotEmpty, IsOptional, IsUUID, Length, Min} from 'class-validator'
import {CreateWithdrawal} from './CreateWithdrawal'

export class TransferXrpOffchainKMS extends CreateWithdrawal {

    @IsNotEmpty()
    @Length(33, 34)
    public account: string;

    @Length(36, 36)
    @IsUUID('4')
    @IsNotEmpty()
    public signatureId?: string;

    @IsOptional()
    @Min(0)
    public sourceTag?: number;
}
