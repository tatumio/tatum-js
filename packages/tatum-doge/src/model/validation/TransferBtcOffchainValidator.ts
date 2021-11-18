import { TransferBtcBasedOffchain } from '@tatumio/tatum-core'
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'mnemonicKeypair', async: false })
export class TransferBtcOffchainValidator implements ValidatorConstraintInterface {
  public defaultMessage(_validationArguments?: ValidationArguments) {
    return 'Either mnemonic, keyPair or signatureId must be present.'
  }

  public validate(_value: any, validationArguments?: ValidationArguments) {
    const { mnemonic, keyPair, signatureId, xpub } = validationArguments?.object as TransferBtcBasedOffchain
    if (mnemonic && keyPair) {
      return false
    }
    if (mnemonic && signatureId) {
      return false
    }
    if (signatureId && keyPair) {
      return false
    }
    if (xpub && keyPair) {
      return false
    }
    return true
  }
}
