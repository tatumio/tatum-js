"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("./wallet");
describe('Address tests', () => {
    it('should generate wallet for BTC mainnet', async () => {
        const wallet = await wallet_1.generateBtcWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6DtevPxud8AJUCqddtVqpqxAJvjFrYYvtt4co2kZF7ifPW3d5FJ3B9i5x7xL4CZirb2eNDEVqCtBgiGZR6Kkee5RdHsDoJVbtxi946axjXJ');
    });
    it('should generate wallet for ADA', async () => {
        const wallet = await wallet_1.generateAdaWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('abdaffa9c626a49652b94aa7d26fbad0b04354bb7e8f37021d89034314b10637a97a31003cba4617b75d65f72ac8cfa07edb80a4d38270a0c27f80125c70c337');
    });
    it('should generate wallet for BTC testnet', async () => {
        const wallet = await wallet_1.generateBtcWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a');
    });
    it('should generate wallet for LTC mainnet', async () => {
        const wallet = await wallet_1.generateLtcWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('Ltub2aXe9g8RPgAcY6jb6FftNJfQXHMV6UNBeZwrWH1K3vjpua9u8uj95xkZyCC4utdEbfYeh9TwxcUiFy2mGzBCJVBwW3ezHmLX2fHxv7HUt8J');
    });
    it('should generate wallet for LTC testnet', async () => {
        const wallet = await wallet_1.generateLtcWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('ttub4giastL5S3AicjXRBEJt7uq22b611rJvVfTgJSRfYeyZkwXwKnZcctK3tEjMpqrgiNSnYAzkKPJDxGoKNWQzkzTJxSryHbaYxsYW9Vr6AYQ');
    });
    it('should generate wallet for BCH mainnet', async () => {
        const wallet = await wallet_1.generateBchWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6EafivSZvqR8ysLKS52NDKfn16sB9uhCEfCKdYi7PpGqqK3fJGdd53DzUnWYvFRZKAC7pB8FVnvuJKkJparfjjfVPTQTmC7dfC6aVvw6f98');
    });
    it('should generate wallet for BCH testnet', async () => {
        const wallet = await wallet_1.generateBchWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('tpubDExJFAGFe7NbFfXAtG1TRF19LDxq9JCFnHncz6mFjj2jabiNNVUiDUtpipbLSkNo74j2Rke82tkwzWEvDShudB7nT49mSimsF9gzFwTf4nw');
    });
    it('should generate wallet for ETH mainnet', async () => {
        const wallet = await wallet_1.generateEthWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6DtR524VQx3ENj2E9pNZnjqkVp47YN5sRCP5y4Gs6KZTwDhH9HTVX8shJPt74WaPZRftRXFfnsyPbMPh6DMEmrQ2WBxDJzGxriStAB36bQM');
    });
    it('should generate wallet for ETH testnet', async () => {
        const wallet = await wallet_1.generateEthWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25');
    });
    it('should generate wallet for VET mainnet', async () => {
        const wallet = await wallet_1.generateVetWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6EzJLu3Hi5hEFAkiZAxCTaXqXoS95seTnG1tdYdF8fBcVZCfR8GQP8UGvfF52szpwZqiiGHJw5694emxSpYBE5qDxAZUgiHLzbVhb5ErRMa');
    });
    it('should generate wallet for VET testnet', async () => {
        const wallet = await wallet_1.generateVetWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25');
    });
    it('should generate wallet for BNB mainnet', async () => {
        const wallet = await wallet_1.generateBnbWallet(false);
        expect(wallet.address).not.toBe('');
        expect(wallet.privateKey).not.toBe('');
    });
    it('should generate wallet for BNB testnet', async () => {
        const wallet = await wallet_1.generateBnbWallet(true);
        expect(wallet.address).not.toBe('');
        expect(wallet.privateKey).not.toBe('');
    });
    it('should generate wallet for XLM', async () => {
        const wallet = await wallet_1.generateXlmWallet();
        expect(wallet.address).not.toBe('');
        expect(wallet.secret).not.toBe('');
    });
    it('should generate wallet for Neo', async () => {
        const wallet = await wallet_1.generateNeoWallet();
        expect(wallet.address).not.toBe('');
        expect(wallet.privateKey).not.toBe('');
    });
    it('should generate wallet for XRP', async () => {
        const wallet = await wallet_1.generateXrpWallet();
        expect(wallet.address).not.toBe('');
        expect(wallet.secret).not.toBe('');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2FsbGV0L3dhbGxldC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBV2tCO0FBRWxCLFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO0lBRTNCLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLDBCQUFpQixDQUFDLEtBQUssRUFBRSxvSkFBb0osQ0FBQyxDQUFDO1FBQ3BNLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLG9KQUFvSixDQUFDLENBQUM7UUFDbkwsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsaUhBQWlILENBQUMsQ0FBQztJQUNoSixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLElBQUksRUFBRTtRQUM1QyxNQUFNLE1BQU0sR0FBRyxNQUFNLDBCQUFpQixDQUFDLEtBQUssRUFBRSxvSkFBb0osQ0FBQyxDQUFDO1FBQ3BNLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLG9KQUFvSixDQUFDLENBQUM7UUFDbkwsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsa0lBQWtJLENBQUMsQ0FBQztJQUNqSyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLDBCQUFpQixDQUFDLElBQUksRUFBRSxvSkFBb0osQ0FBQyxDQUFDO1FBQ25NLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLG9KQUFvSixDQUFDLENBQUM7UUFDbkwsTUFBTSxDQUFDLE1BQU0s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