import { IsNotEmpty, IsUUID, Length, ValidateIf } from 'class-validator'
import {CreateWithdrawal} from './CreateWithdrawal'

export class TransferXlmOffchain extends CreateWithdrawal {

    @IsNotEmpty()
    @Length(56, 56)
    public secret: string;
}
