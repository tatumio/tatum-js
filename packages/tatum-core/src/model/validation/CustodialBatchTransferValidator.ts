import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { TransferFromCustodialAddressBatch } from '../request'

@ValidatorConstraint({ name: 'signatureId', async: false })
export class CustodialBatchTransferValidator implements ValidatorConstraintInterface {
  public defaultMessage(validationArguments?: ValidationArguments) {
    return 'tokenID, amount, contractType, tokenAddress and recipients must have same value. For optional parameters set 0 as a default value.'
  }

  public validate(value: any, validationArguments?: ValidationArguments) {
    const data = validationArguments?.object as TransferFromCustodialAddressBatch
    if (data.recipient.length !== data.contractType.length) return false
    if (data.recipient.length !== data.tokenAddress.length) return false
    if (data.recipient.length !== data.tokenId.length) return false
    return data.recipient.length === data.amount.length
  }
}
