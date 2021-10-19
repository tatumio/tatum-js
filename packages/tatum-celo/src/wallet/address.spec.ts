import { Currency } from '@tatumio/tatum-core'
import {generateAddressFromXPub} from './address'

describe('Address tests', () => {
    it('should generate address 1 for CELO mainnet', () => {
        const address = generateAddressFromXPub(Currency.CELO, false, 'xpub6F2PSwHVww3pw4NE7hbrNLNBYL87eYTEqXTF6Aw5FACuQTBHPtCUbqG39LqXv81NLXhjb4ECFA19h8jGhKtdQNVvxm4Md1xtiiKCnxp9Jq1', 1)
        expect(address).toBe('0xfc2d2698ffd1bcf31c950d61d5c517e28fd739f9')
    })

    it('should generate address 1 for CELO testnet', () => {
        const address = generateAddressFromXPub(Currency.CELO, true, 'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25', 1)
        expect(address).toBe('0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea')
    })
})
