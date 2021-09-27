import {isUUID, maxLength, minLength, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface,} from 'class-validator';
import {Currency} from '../request';
import {SignatureIdValidator} from './SignatureIdValidator';

@ValidatorConstraint({name: 'builtInPrivateKey', async: false})
export class Mint721BuiltInPrivateKeyValidator implements ValidatorConstraintInterface {

    private message: string | null = null;

    public defaultMessage(validationArguments?: ValidationArguments) {
        if (this.message) {
            return this.message;
        }
        return 'If you fill signatureId or privateKey/secret/fromPrivateKey, then tokenId, contractAddress must be present.';
    }

    public validate(value: any, validationArguments?: ValidationArguments) {
        const data = validationArguments?.object as any;
        const isAllowedChain = [Currency.BSC, Currency.ETH, Currency.CELO, Currency.ONE, Currency.MATIC].includes(data.chain);

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
        if (data.chain === Currency.CELO && (!data.feeCurrency || ![Currency.CELO, Currency.CUSD, Currency.CEUR].includes(data.feeCurrency))) {
            this.message = 'CELO chain must have assigned feeCurrency field.'
            return false
        }

        if (!data.tokenId || !maxLength(data.tokenId, 256)) {
            this.message = 'Field tokenId must have 256 digits maximum.';
            return false
        }

        if (!data.contractAddress || !maxLength(data.contractAddress, 43) || !minLength(data.contractAddress, 42)) {
            this.message = 'Field contractAddress must have between 42 and 43 characters.';
            return false
        }


        if (!data.fromPrivateKey && !data.signatureId) {
            this.message = 'Field fromPrivateKey or signatureId must be filled.';
            return false
        }

        if (data.fromPrivateKey) {
            if (!maxLength(data.fromPrivateKey, 66) || !minLength(data.fromPrivateKey, 64)) {
                this.message = 'Field fromPrivateKey must have between 64 and 66 characters.';
                return false
            }
        }

        if (data.signatureId) {
            if (!maxLength(data.signatureId, 36) || !minLength(data.signatureId, 36) || !isUUID(data.signatureId, 4)) {
                this.message = 'Field fromPrivateKey must have 36 characters and must be in form of UUID.';
                return false;
            }
        }

        const signatureIdValidation = new SignatureIdValidator()
        return signatureIdValidation.validate(data, validationArguments)
    }

}
