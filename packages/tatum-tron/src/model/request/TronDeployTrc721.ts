import {IsNotEmpty, Length, Min, ValidateIf} from 'class-validator'
import {DeployErc721} from '@tatumio/tatum-core'

export class TronDeployTrc721 extends DeployErc721 {

    @ValidateIf(o => o.signatureId)
    @IsNotEmpty()
    @Length(34, 34)
    public from?: string;

    @IsNotEmpty()
    @Min(0)
    public feeLimit: number;
}
