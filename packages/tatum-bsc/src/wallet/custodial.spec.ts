import { ApproveCustodialTransfer, ContractType, Currency, GenerateCustodialAddress, TransferFromCustodialAddress, TransferFromCustodialAddressBatch } from '@tatumio/tatum-core';
import {bscBroadcast} from '../blockchain';
import {
    sendBscGenerateCustodialWalletSignedTransaction,
} from '../transaction';
import {prepareApproveFromCustodialWallet, prepareBatchTransferFromCustodialWallet, prepareTransferFromCustodialWallet} from './custodial';

describe('Custodial wallet tests', () => {
    jest.setTimeout(9999);

    describe('Deploy address', () => {
        it('should create on BSC batch', async () => {
            const body = new GenerateCustodialAddress()
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
            body.chain = Currency.BSC
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = true
            body.enableBatchTransactions = true
            const txData = await sendBscGenerateCustodialWalletSignedTransaction(body, 'https://data-seed-prebsc-2-s1.binance.org:8545')
            expect(txData.txId).toContain('0x')
            console.log(txData.txId)
        })
    })

    describe('Transfer from address BSC', () => {
        it('should transfer BSC on BSC', async () => {
            const body = new TransferFromCustodialAddress()
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
            body.chain = Currency.BSC
            body.contractType = ContractType.NATIVE_ASSET
            body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4'
            body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.amount = '0.0000001'
            const txData = await prepareTransferFromCustodialWallet(true, body)
            expect(txData).toContain('0x')
            console.log(await bscBroadcast(txData))
        })

        it('should transfer 20 on BSC', async () => {
            const body = new TransferFromCustodialAddress()
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
            body.chain = Currency.BSC
            body.contractType = ContractType.FUNGIBLE_TOKEN
            body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4'
            body.tokenAddress = '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867'
            body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.amount = '1'
            const txData = await prepareTransferFromCustodialWallet(true, body)
            expect(txData).toContain('0x')
            console.log(await bscBroadcast(txData))
        })

        it('should transfer 721 on BSC', async () => {
            const body = new TransferFromCustodialAddress()
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
            body.chain = Currency.BSC
            body.contractType = ContractType.NON_FUNGIBLE_TOKEN
            body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4'
            body.tokenAddress = '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698'
            body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.tokenId = '20'
            const txData = await prepareTransferFromCustodialWallet(true, body)
            expect(txData).toContain('0x')
            console.log(await bscBroadcast(txData))
        })

        it('should transfer 1155 on BSC', async () => {
            const body = new TransferFromCustodialAddress()
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
            body.chain = Currency.BSC;
            body.contractType = ContractType.SEMI_FUNGIBLE_TOKEN;
            body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4';
            body.tokenAddress = '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3';
            body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            body.tokenId = '1';
            body.amount = '1';
            const txData = await prepareTransferFromCustodialWallet(true, body);
            expect(txData).toContain('0x');
            console.log(await bscBroadcast(txData));
        })

        it('should approve 20 on BSC', async () => {
            const body = new ApproveCustodialTransfer();
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
            body.chain = Currency.BSC;
            body.contractType = ContractType.FUNGIBLE_TOKEN;
            body.custodialAddress = '0x95abdd7406a6aca49797e833bacc3edaa394853a';
            body.tokenAddress = '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867';
            body.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            body.amount = '1';
            const txData = await prepareApproveFromCustodialWallet(true, body);
            expect(txData).toContain('0x');
            console.log(await bscBroadcast(txData));
        });

        it('should approve 721 on BSC', async () => {
            const body = new ApproveCustodialTransfer();
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
            body.chain = Currency.BSC;
            body.contractType = ContractType.NON_FUNGIBLE_TOKEN;
            body.custodialAddress = '0x95abdd7406a6aca49797e833bacc3edaa394853a';
            body.tokenAddress = '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698';
            body.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            body.tokenId = '10';
            const txData = await prepareApproveFromCustodialWallet(true, body);
            expect(txData).toContain('0x');
            console.log(await bscBroadcast(txData));
        });

        it('should approve 1155 on BSC', async () => {
            const body = new ApproveCustodialTransfer();
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
            body.chain = Currency.BSC;
            body.contractType = ContractType.SEMI_FUNGIBLE_TOKEN;
            body.custodialAddress = '0x95abdd7406a6aca49797e833bacc3edaa394853a';
            body.tokenAddress = '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3';
            body.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA';
            body.tokenId = '1';
            body.amount = '1';
            const txData = await prepareApproveFromCustodialWallet(true, body);
            expect(txData).toContain('0x');
            console.log(await bscBroadcast(txData));
        });

        it('should transfer all batch on BSC', async () => {
            const body = new TransferFromCustodialAddressBatch();
            body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab';
            body.chain = Currency.BSC;
            body.contractType = [ContractType.FUNGIBLE_TOKEN, ContractType.NON_FUNGIBLE_TOKEN, ContractType.SEMI_FUNGIBLE_TOKEN, ContractType.NATIVE_ASSET];
            body.custodialAddress = '0x009bc01b990e2781e8a961fd792f4ebb12a683b4';
            body.tokenAddress = ['0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867', '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698', '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3', '0'];
            body.recipient = ['0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA', '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA', '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA', '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'];
            body.tokenId = ['0', '200', '1', '0']
            body.amount = ['1', '0', '1', '0.00001']
            const txData = await prepareBatchTransferFromCustodialWallet(true, body)
            expect(txData).toContain('0x')
            console.log(await bscBroadcast(txData))
        })

    })

})
