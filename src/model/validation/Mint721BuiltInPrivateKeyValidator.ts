import {
    isUUID,
    maxLength,
    minLength,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'
import { Currency } from '../request'
import { SignatureIdValidator } from './SignatureIdValidator'

@ValidatorConstraint({ name: 'builtInPrivateKey', async: false })
export class Mint721BuiltInPrivateKeyValidator implements ValidatorConstraintInterface {
    public defaultMessage(validationArguments?: ValidationArguments) {
        return 'If you fill signatureId or privateKey/secret/fromPrivateKey, then tokenId, contractAddress must be present.'
    }

    public validate(value: any, validationArguments?: ValidationArguments) {
        const data = validationArguments?.object as any
        const isAllowedChain = [Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC].includes(data.chain)

        if (!data.fromPrivateKey && !data.signatureId) {
            if (isAllowedChain) {
                return true
            } else {
                if(!this.validateNonBuiltInPrivateKey(data, validationArguments)) {
                    return false
                }
            }
        } else {
            if(!this.validateNonBuiltInPrivateKey(data, validationArguments)) {
                return false
            }
        }

        return true
    }

    private validateNonBuiltInPrivateKey(data: any, validationArguments?: ValidationArguments) {
        if (data.chain === Currency.CELO && (!data.feeCurrency || ![Currency.CELO, Currency.CUSD, Currency.CEUR].includes(data.feeCurrency) )) {
            return false
        }

        if (!data.tokenId || !maxLength(data.tokenId, 256)) {
            return false
        }

        if (!data.contractAddress || !maxLength(data.contractAddress, 43) || !minLength(data.contractAddress, 42)) {
            return false
        }

        if(!data.fromPrivateKey || !maxLength(data.fromPrivateKey, 66) || !minLength(data.fromPrivateKey, 64)) {
            return false
        }

        if(!data.signatureId || !maxLength(data.signatureId, 36) || !minLength(data.signatureId, 36) || !isUUID(4)) {
            return false
        }

        const signatureIdValidation = new SignatureIdValidator()
        return signatureIdValidation.validate(data, validationArguments)
    }

}
