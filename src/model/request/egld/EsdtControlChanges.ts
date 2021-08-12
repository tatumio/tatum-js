import {EsdtToken} from './EsdtToken'
import {EsdtProperties} from './EsdtIssue'
import {IsNotEmpty} from 'class-validator'

export class EsdtControlChanges extends EsdtToken {
    @IsNotEmpty()
    public properties?: EsdtProperties;
}
