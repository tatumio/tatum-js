import {
  IsNumberString,
  IsOptional,
  Length, Validate,
} from 'class-validator'
import {TransferBtcBasedBlockchain} from './'
import {FeeChangeValidator} from "../validation/FeeChangeValidator";

export class TransferBtcLtcBlockchain extends TransferBtcBasedBlockchain {
  /**
   * The fee to be paid for the transaction (in BCH);
   * if you are using this parameter, you have to also use the <code>changeAddress</code> parameter
   * because these two parameters only work together.
   */
  @Validate(FeeChangeValidator)
  @IsOptional()
  @IsNumberString()
  public fee?: string;

  /**
   * The blockchain address to send any extra assets remaning after covering the fee;
   * if you are using this parameter, you have to also use the <code>fee</code> parameter
   * because these two parameters only work together.
   */
  @Validate(FeeChangeValidator)
  @IsOptional()
  @Length(30, 110)
  public changeAddress?: string;
}
