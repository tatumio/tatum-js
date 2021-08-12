import {IsNotEmpty, Length, Min, ValidateIf} from 'class-validator'
import {ApproveMarketplaceErc20Spending} from './ApproveMarketplaceErc20Spending'
import {Currency} from './Currency'

export class ApproveTronMarketplaceErc20Spending extends ApproveMarketplaceErc20Spending {

    @ValidateIf(o => o.signatureId && o.chain === Currency.TRON)
    @IsNotEmpty()
    @Length(34, 34)
    public from?: string;

    @ValidateIf(o => o.chain === Currency.TRON)
    @IsNotEmpty()
    @Min(0)
    public feeLimit: number;
}
