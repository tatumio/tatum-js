import {
    generateBchWallet,
    generateBnbWallet,
    generateBtcWallet,
    generateEthWallet,
    generateLtcWallet,
    generateNeoWallet,
    generateVetWallet,
    generateXlmWallet,
    generateXrpWallet
} from './wallet';

describe('Address tests', () => {

    it('should generate wallet for BTC mainnet', async () => {
        const wallet = await generateBtcWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6DtevPxud8AJUCqddtVqpqxAJvjFrYYvtt4co2kZF7ifPW3d5FJ3B9i5x7xL4CZirb2eNDEVqCtBgiGZR6Kkee5RdHsDoJVbtxi946axjXJ');
    });

    it('should generate wallet for BTC testnet', async () => {
        const wallet = await generateBtcWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a');
    });

    it('should generate wallet for LTC mainnet', async () => {
        const wallet = await generateLtcWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('Ltub2aXe9g8RPgAcY6jb6FftNJfQXHMV6UNBeZwrWH1K3vjpua9u8uj95xkZyCC4utdEbfYeh9TwxcUiFy2mGzBCJVBwW3ezHmLX2fHxv7HUt8J');
    });

    it('should generate wallet for LTC testnet', async () => {
        const wallet = await generateLtcWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('ttub4giastL5S3AicjXRBEJt7uq22b611rJvVfTgJSRfYeyZkwXwKnZcctK3tEjMpqrgiNSnYAzkKPJDxGoKNWQzkzTJxSryHbaYxsYW9Vr6AYQ');
    });

    it('should generate wallet for BCH mainnet', async () => {
        const wallet = await generateBchWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6EafivSZvqR8ysLKS52NDKfn16sB9uhCEfCKdYi7PpGqqK3fJGdd53DzUnWYvFRZKAC7pB8FVnvuJKkJparfjjfVPTQTmC7dfC6aVvw6f98');
    });

    it('should generate wallet for BCH testnet', async () => {
        const wallet = await generateBchWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('tpubDExJFAGFe7NbFfXAtG1TRF19LDxq9JCFnHncz6mFjj2jabiNNVUiDUtpipbLSkNo74j2Rke82tkwzWEvDShudB7nT49mSimsF9gzFwTf4nw');
    });

    it('should generate wallet for ETH mainnet', async () => {
        const wallet = await generateEthWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6DtR524VQx3ENj2E9pNZnjqkVp47YN5sRCP5y4Gs6KZTwDhH9HTVX8shJPt74WaPZRftRXFfnsyPbMPh6DMEmrQ2WBxDJzGxriStAB36bQM');
    });

    it('should generate wallet for ETH testnet', async () => {
        const wallet = await generateEthWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25');
    });

    it('should generate wallet for VET mainnet', async () => {
        const wallet = await generateVetWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6EzJLu3Hi5hEFAkiZAxCTaXqXoS95seTnG1tdYdF8fBcVZCfR8GQP8UGvfF52szpwZqiiGHJw5694emxSpYBE5qDxAZUgiHLzbVhb5ErRMa');
    });

    it('should generate wallet for VET testnet', async () => {
        const wallet = await generateVetWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25');
    });

    it('should generate wallet for BNB mainnet', async () => {
        const wallet = await generateBnbWallet(false);
        expect(wallet.address).not.toBe('');
        expect(wallet.privateKey).not.toBe('');
    });

    it('should generate wallet for BNB testnet', async () => {
        const wallet = await generateBnbWallet(true);
        expect(wallet.address).not.toBe('');
        expect(wallet.privateKey).not.toBe('');
    });

    it('should generate wallet for XLM', async () => {
        const wallet = await generateXlmWallet();
        expect(wallet.address).not.toBe('');
        expect(wallet.secret).not.toBe('');
    });

    it('should generate wallet for Neo', async () => {
        const wallet = await generateNeoWallet();
        expect(wallet.address).not.toBe('');
        expect(wallet.privateKey).not.toBe('');
    });

    it('should generate wallet for XRP', async () => {
        const wallet = await generateXrpWallet();
        expect(wallet.address).not.toBe('');
        expect(wallet.secret).not.toBe('');
    });
});
