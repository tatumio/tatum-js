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
    Currency,
    GenerateCustodialAddress
} from '../model';

export const obtainCustodialAddressType = (body: GenerateCustodialAddress) => {
    if (body.chain === Currency.TRON && body.enableSemiFungibleTokens) {
        throw new Error('MultiToken not supported for TRON.');
    }
    let abi;
    let code;
    if (body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = CustodialFullTokenWalletWithBatch.bytecode;
        abi = CustodialFullTokenWalletWithBatch.abi;
    } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = CustodialFullTokenWallet.bytecode;
        abi = CustodialFullTokenWallet.abi;
    } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_20_721_TokenWalletWithBatch.bytecode;
        abi = Custodial_20_721_TokenWalletWithBatch.abi;
    } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_20_721_TokenWallet.bytecode;
        abi = Custodial_20_721_TokenWallet.abi;
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_20_1155_TokenWalletWithBatch.bytecode;
        abi = Custodial_20_1155_TokenWalletWithBatch.abi;
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_20_1155_TokenWallet.bytecode;
        abi = Custodial_20_1155_TokenWallet.abi;
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_721_1155_TokenWalletWithBatch.bytecode;
        abi = Custodial_721_1155_TokenWalletWithBatch.abi;
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_721_1155_TokenWallet.bytecode;
        abi = Custodial_721_1155_TokenWallet.abi;
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_20_TokenWalletWithBatch.bytecode;
        abi = Custodial_20_TokenWalletWithBatch.abi;
    } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_20_TokenWallet.bytecode;
        abi = Custodial_20_TokenWallet.abi;
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_721_TokenWalletWithBatch.bytecode;
        abi = Custodial_721_TokenWalletWithBatch.abi;
    } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_721_TokenWallet.bytecode;
        abi = Custodial_721_TokenWallet.abi;
    } else if (!body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
        code = Custodial_1155_TokenWalletWithBatch.bytecode;
        abi = Custodial_1155_TokenWalletWithBatch.abi;
    } else if (!body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
        code = Custodial_1155_TokenWallet.bytecode;
        abi = Custodial_1155_TokenWallet.abi;
    } else {
        throw new Error('Unsupported combination of inputs.');
    }
    return {abi, code};
};