"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const eth_1 = require("./eth");
describe('ETH transactions', () => {
    it('should test valid transaction ETH data', async () => {
        const body = new model_1.TransferEthErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.currency = model_1.Currency.ETH;
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        const txData = await eth_1.prepareEthOrErc20SignedTransaction(true, body);
        expect(txData).toContain('0x');
    });
    it('should test valid transaction ERC20 data', async () => {
        const body = new model_1.TransferEthErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.currency = model_1.Currency.PLTC;
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        const txData = await eth_1.prepareEthOrErc20SignedTransaction(true, body);
        expect(txData).toContain('0x');
    });
    it('should test valid custom transaction ERC20 data', async () => {
        const body = new model_1.TransferCustomErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.contractAddress = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        body.digits = 10;
        const txData = await eth_1.prepareCustomErc20SignedTransaction(true, body);
        expect(txData).toContain('0x');
    });
    it('should test valid custom deployment ERC20', async () => {
        const body = new model_1.DeployEthErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.symbol = 'SYMBOL';
        body.name = 'Test_ERC20';
        body.supply = '100';
        body.address = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        body.digits = 10;
        const txData = await eth_1.prepareDeployErc20SignedTransaction(true, body);
        expect(txData).toContain('0x');
    });
    it('should test invalid custom deployment ERC20, missing supply', async () => {
        const body = new model_1.DeployEthErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.symbol = 'SYMBOL';
        body.name = 'Test_ERC20';
        body.address = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        body.digits = 10;
        try {
            await eth_1.prepareDeployErc20SignedTransaction(true, body);
            fail('Validation did not pass.');
        }
        catch (e) {
            console.error(e);
        }
    });
    it('should test invalid custom transaction ERC20 data, missing digits', async () => {
        const body = new model_1.TransferCustomErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.contractAddress = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        try {
            await eth_1.prepareCustomErc20SignedTransaction(true, body);
            fail('Validation did not pass.');
        }
        catch (e) {
            console.error(e);
        }
    });
    it('should not test valid transaction data, missing currency', async () => {
        const body = new model_1.TransferEthErc20();
        body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb';
        body.amount = '0';
        body.to = '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea';
        try {
            await eth_1.prepareEthOrErc20SignedTransaction(true, body);
            fail('Validation did not pass.');
        }
        catch (e) {
            console.error(e);
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdHJhbnNhY3Rpb24vZXRoLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBeUY7QUFDekYsK0JBSWU7QUFFZixRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNwRCxNQUFNLElBQUksR0FBRyxJQUFJLHdCQUFnQixFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxvRUFBb0UsQ0FBQztRQUMzRixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFRLENBQUMsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxFQUFFLEdBQUcsNENBQTRDLENBQUM7UUFDdkQsTUFBTSxNQUFNLEdBQUcsTUFBTSx3Q0FBa0MsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN0RCxNQUFNLElBQUksR0FBRyxJQUFJLHdCQUFnQixFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxvRUFBb0UsQ0FBQztRQUMzRixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFRLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsNENBQTRDLENBQUM7UUFDdkQsTUFBTSxNQUFNLEdBQUcsTUFBTSx3Q0FBa0MsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLE1BQU0s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