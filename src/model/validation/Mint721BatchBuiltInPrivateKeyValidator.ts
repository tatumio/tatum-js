import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Currency } from '../request';

@ValidatorConstraint({ name: 'builtInPrivateKey', async: false })
export class Mint721BatchBuiltInPrivateKeyValidator implements ValidatorConstraintInterface {

  private message: string | null = null;

  public defaultMessage(validationArguments?: ValidationArguments) {
    if (this.message) {
      return this.message;
    }
    return 'If you fill signatureId or privateKey/secret/fromPrivateKey, then tokenId, contractAddress must be present.';
  }

  public validate(value: any, validationArguments?: ValidationArguments) {
    const data = validationArguments?.object as any;
    const chains = [Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC, Currency.KLAY]
    const isAllowedChain = chains.includes(data.chain);

    if (data.minter) {
      if (!isAllowedChain) {
        this.message = `Chain is not supported for external minters. Minter is available only on these chains - ${chains}`
        return false
      }
      if (data.fromPrivateKey || data.signatureId) {
        this.message = `If minter is present, no private key or signatureId must be entered. Minter is available only on these chains - ${chains}`
        return false
      }
      if (!this.validateRequiredFields(data)) {
        return false
      }
      return true
    }
    if (!this.validateRequiredFields(data)) {
      return false
    }
    if ((!data.fromPrivateKey && !data.signatureId) || (data.fromPrivateKey && data.signatureId)) {
      this.message = 'Field fromPrivateKey or signatureId must be filled.';
      return false
    }
    return true
  }

  private validateRequiredFields(data: any) {
    if (data.chain === Currency.CELO && (!data.feeCurrency || ![Currency.CELO, Currency.CUSD, Currency.CEUR].includes(data.feeCurrency))) {
      this.message = 'CELO chain must have assigned feeCurrency field.'
      return false
    }
    return true
  }
}
