import {
    CustodialFullTokenWallet,
    CustodialFullTokenWalletWithBatch, Custodial_1155_TokenWallet,
    Custodial_1155_TokenWalletWithBatch,
    Custodial_20_1155_TokenWallet,
    Custodial_20_1155_TokenWalletWithBatch,
    Custodial_20_721_TokenWallet,
    Custodial_20_721_TokenWalletWithBatch,
    Custodial_20_TokenWallet,
    Custodial_20_TokenWalletWithBatch,
    Custodial_721_1155_TokenWallet,
    Custodial_721_1155_TokenWalletWithBatch,
    Custodial_721_TokenWallet,
    Custodial_721_TokenWalletWithBatch
} from '../contracts/custodial';
import {
    GenerateCustodialAddress
} from '../model';
import { obtainCustodialAddressType } from './custodial';

describe('Custodial wallet tests', () => {

    process.env.TRON_PRO_API_KEY = 'b35409b4-7d11-491e-8760-32d2506a90b5';
    jest.setTimeout(9999);

    describe('Feature enablement logic', () => {
        it('should deploy all batch', () => {
            const body = new GenerateCustodialAddress();
            body.enableBatchTransactions = true;
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = true
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(CustodialFullTokenWalletWithBatch.abi)
        })

        it('should deploy all', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = false
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = true
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(CustodialFullTokenWallet.abi)
        })

        it('should deploy 20 batch', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = true
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = false
            body.enableSemiFungibleTokens = false
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_20_TokenWalletWithBatch.abi)
        })

        it('should deploy 20', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = false
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = false
            body.enableSemiFungibleTokens = false
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_20_TokenWallet.abi)
        })

        it('should deploy 721 batch', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = true
            body.enableFungibleTokens = false
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = false
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_721_TokenWalletWithBatch.abi)
        })

        it('should deploy 721', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = false
            body.enableFungibleTokens = false
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = false
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_721_TokenWallet.abi)
        })

        it('should deploy 1155 batch', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = true
            body.enableFungibleTokens = false
            body.enableNonFungibleTokens = false
            body.enableSemiFungibleTokens = true
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_1155_TokenWalletWithBatch.abi)
        })

        it('should deploy 1155', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = false
            body.enableFungibleTokens = false
            body.enableNonFungibleTokens = false
            body.enableSemiFungibleTokens = true
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_1155_TokenWallet.abi)
        })

        it('should deploy 20_721 batch', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = true
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = false
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_20_721_TokenWalletWithBatch.abi)
        })

        it('should deploy 20_721', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = false
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = false
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_20_721_TokenWallet.abi)
        })

        it('should deploy 20_1155 batch', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = true
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = false
            body.enableSemiFungibleTokens = true
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_20_1155_TokenWalletWithBatch.abi)
        })

        it('should deploy 20_1155', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = false
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = false
            body.enableSemiFungibleTokens = true
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_20_1155_TokenWallet.abi)
        })

        it('should deploy 721_1155 batch', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = true
            body.enableFungibleTokens = false
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = true
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_721_1155_TokenWalletWithBatch.abi)
        })

        it('should deploy 721_1155', () => {
            const body = new GenerateCustodialAddress()
            body.enableBatchTransactions = false
            body.enableFungibleTokens = false
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = true
            const {abi} = obtainCustodialAddressType(body)
            expect(abi).toBe(Custodial_721_1155_TokenWallet.abi)
        })
    })
})
