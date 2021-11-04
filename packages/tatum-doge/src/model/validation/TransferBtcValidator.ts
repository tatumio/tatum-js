import { TransferBtcBasedBlockchain } from '@tatumio/tatum-core'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'fromAddressFromUTXO', async: false })
export class TransferBtcValidator implements ValidatorConstraintInterface {
  public defaultMessage(validationArguments?: ValidationArguments) {
    return 'Either fromAddress, or fromUTXO must be present.'
  }

  public validate(value: any, validationArguments?: ValidationArguments) {
    const data = validationArguments?.object as TransferBtcBasedBlockchain
    return !(data.fromAddress && data.fromUTXO)
  }
}
