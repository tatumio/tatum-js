import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Currency } from '../request'
import { SignatureIdValidator } from './SignatureIdValidator'

@ValidatorConstraint({ name: 'builtInPrivateKey', async: false })
export class Mint721BuiltInPrivateKeyValidator implements ValidatorConstraintInterface {
  private message: string | null = null

  public defaultMessage() {
    if (this.message) {
      return this.message
    }
    return 'If you fill signatureId or privateKey/secret/fromPrivateKey, then tokenId, contractAddress must be present.'
  }

  public validate(_: any, validationArguments?: ValidationArguments) {
    const data = validationArguments?.object as any
    const chains = [Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC, Currency.KLAY]
    const isAllowedChain = chains.includes(data.chain)

    if (data.minter) {
      if (data.fromPrivateKey || data.signatureId) {
        this.message = `If minter is present, no private key or signatureId must be entered. Minter is available only on these chains - ${chains}`
        return false
      }
      if (!this.validateRequiredFields(data)) {
        return false
      }
    }

    if (!data.fromPrivateKey && !data.signatureId) {
      if (isAllowedChain) {
        return true
      } else {
        if (!this.validateNonBuiltInPrivateKey(data, validationArguments)) {
          return false
        }
      }
    } else {
      if (!this.validateNonBuiltInPrivateKey(data, validationArguments)) {
        return false
      }
    }

    return true
  }

  private validateNonBuiltInPrivateKey(data: any, validationArguments?: ValidationArguments) {
    if (!this.validateRequiredFields(data)) {
      return false
    }
    if (!data.fromPrivateKey && !data.signatureId) {
      this.message = 'Field fromPrivateKey or signatureId must be filled.'
      return false
    }

    const signatureIdValidation = new SignatureIdValidator()
    return signatureIdValidation.validate(data, validationArguments)
  }

  private validateRequiredFields(data: any) {
    if (data.chain === Currency.CELO && (!data.feeCurrency || ![Currency.CELO, Currency.CUSD, Currency.CEUR].includes(data.feeCurrency))) {
      this.message = 'CELO chain must have assigned feeCurrency field.'
      return false
    }

    if (!data.tokenId) {
      this.message = 'Field tokenId must be present.'
      return false
    }

    if (!data.contractAddress) {
      this.message = 'Field contractAddress must be present.'
      return false
    }
    return true
  }
}
