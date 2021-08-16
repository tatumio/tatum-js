import {Type} from 'class-transformer'
import {IsNotEmpty, ValidateNested} from 'class-validator'
import {CreateAccount} from './CreateAccount'

export class CreateAccountsBatch {

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => CreateAccount)
    public accounts: CreateAccount[];
}
