import {IsAlphanumeric, IsIn, IsNotEmpty, IsOptional, IsUppercase, Length, ValidateIf} from 'class-validator';

export class EsdtToken {
    @IsNotEmpty()
    @Length(1, 63)
    @IsIn([
        'issue', 'issueNonFungible', 'issueSemiFungible', 'ESDTNFTCreate', 'stopNFTCreate',
        'ESDTTransfer', 'mint', 'ESDTBurn', 'pause', 'unPause', 'freeze', 'unFreeze', 'wipe', 
        'setSpecialRole', 'unSetSpecialRole', 'transferOwnership', 'controlChanges',
        'transferNFTCreateRole', 'ESDTNFTAddQuantity', 'ESDTNFTBurn', 'freezeSingleNFT', 'unFreezeSingleNFT', 'ESDTNFTTransfer'])
    public service: string;

    @ValidateIf(o => !['issue', 'issueNonFungible', 'issueSemiFungible'].includes(o.service))
    @IsOptional()
    @IsUppercase()
    @Length(10, 17)
    public tokenId?: string;
}
