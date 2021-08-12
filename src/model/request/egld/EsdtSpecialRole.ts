import {EsdtToken} from './EsdtToken'
import {IsString, IsNotEmpty, Length, IsIn} from 'class-validator'

export class EsdtSpecialRole extends EsdtToken {
    @IsNotEmpty()
    @IsString()
    @Length(62, 62)
    public account: string;

    @IsNotEmpty()
    @IsIn(['ESDTRoleLocalMint', 'ESDTRoleLocalBurn', 'ESDTRoleNFTCreate', 'ESDTRoleNFTBurn', 'ESDTRoleNFTAddQuantity'])
    public role: string[];
}
