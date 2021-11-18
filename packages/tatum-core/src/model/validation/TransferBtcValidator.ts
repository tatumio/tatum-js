import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { TransferBtcBasedBlockchain } from '../index'

@ValidatorConstraint({ name: 'fromAddressFromUTXO', async: false })
export class TransferBtcValidator implements ValidatorConstraintInterface {
  public defaultMessage(_validationArguments?: ValidationArguments) {
    return 'Either fromAddress, or fromUTXO must be present.'
  }

  public validate(_value: any, validationArguments?: ValidationArguments) {
    const data = validationArguments?.object as TransferBtcBasedBlockchain
    return !(data.fromAddress && data.fromUTXO)
  }
}
