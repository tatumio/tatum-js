import {
    CreateTronTrc10,
    CreateTronTrc20,
    FreezeTron,
    TransferTron,
    TransferTronTrc10,
    TransferTronTrc20
} from '../model';
import {
    prepareTronCreateTrc10SignedTransaction,
    prepareTronCreateTrc20SignedTransaction,
    prepareTronFreezeTransaction,
    prepareTronSignedTransaction,
    prepareTronTrc10SignedTransaction,
    prepareTronTrc20SignedTransaction
} from './tron';

import token_bytecode from '../contracts/trc20/token_bytecode';

describe('Tron transactions', () => {
    it('should test valid transaction data', async () => {
        const body = new TransferTron();
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
        body.amount = '0.000001';
        body.to = 'TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW';
        const txData = await prepareTronSignedTransaction(true, body);
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.amount).toBe(1);
    });

    it('should test valid freeze transaction data', async () => {
        const body = new FreezeTron();
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
        body.amount = '100';
        body.resource = 'ENERGY';
        body.duration = 3;
        body.receiver = 'TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW';
        const txData = await prepareTronFreezeTransaction(true, body);
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.frozen_balance).toBe(100000000);
    });

    it('should test valid TRC20 create transaction data', async () => {
        const body = new CreateTronTrc20();
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
        body.decimals = 18;
        body.symbol = 'TTM';
        body.recipient = 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh';
        body.name = 'TatumToken';
        body.totalSupply = 1000000;
        const txData = await prepareTronCreateTrc20SignedTransaction(true, body);
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.new_contract.bytecode).toContain(token_bytecode);
    });

    it('should test valid TRC10 transaction data', async () => {
        const body = new TransferTronTrc10();
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
        body.amount = '0.000001';
        body.tokenId = '1000538';
        body.to = 'TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW';
        const txData = await prepareTronTrc10SignedTransaction(true, body);
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.amount).toBe(1);
    });

     it('should test valid TRC20 transaction data', async () => {
        const body = new TransferTronTrc20();
        body.tokenAddress = 'TWgHeettKLgq1hCdEUPaZNCM6hPg8JkG2X';
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
        body.amount = '10';
        body.feeLimit = 100000000;
        body.to = 'TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW';
        const txData = await prepareTronTrc20SignedTransaction(true, body);
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.data).toBe('a9059cbb000000000000000000000000d2803f9c22aa429d71554c9427e97ffedcec17c70000000000000000000000000000000000000000000000008ac7230489e80000');
    });

    it.skip('should test valid trc10 create data', async () => {
        const body = new CreateTronTrc10();
        // 1 account can issue only 1 asset
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701';
        body.totalSupply = 1000000;
        body.abbreviation = 'TTM';
        body.url = 'TTM';
        body.name = 'TTM';
        body.description = 'TTM';
        body.decimals = 5;
        const txData = await prepareTronCreateTrc10SignedTransaction(true, body);
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.amount).toBe(1);
    });

    it('should not test valid transaction data, to private key assigned', async () => {
        const body = new TransferTron();
        body.amount = '0';
        body.amount = '100';
        body.to = 'TFnpwE8jCgtq3QpAhFfF2QpXzdBGmKvKMe';
        try {
            await prepareTronSignedTransaction(true, body);
            fail('Validation did not pass.');
        } catch (e) {
            console.error(e);
        }
    });
});
