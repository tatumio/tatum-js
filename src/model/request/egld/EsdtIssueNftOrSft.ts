import {EsdtToken} from './EsdtToken'
import {IsAlphanumeric, IsNotEmpty, IsOptional, IsUppercase, Length} from 'class-validator'

export class EsdtPropertiesNftOrSft {
    @IsOptional()
    public canFreeze?: boolean;

    @IsOptional()
    public canWipe?: boolean;
    
    @IsOptional()
    public canPause?: boolean;
    
    @IsOptional()
    public canTransferNFTCreateRole?: boolean;
}

export class EsdtIssueNftOrSft extends EsdtToken {
    @IsNotEmpty()
    @IsAlphanumeric()
    @Length(3, 20)
    public tokenName: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @IsUppercase()
    @Length(3, 10)
    public tokenTicker: string;

    @IsOptional()
    public properties?: EsdtPropertiesNftOrSft;
}
