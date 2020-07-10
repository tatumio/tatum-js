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
        expect(wallet.xpriv).toBe('xprv9zuJWtS1nkc1FimAXrxqTi1RkttmT5q5Xf91zeLwgnBgWhiUXhyndMPc6oEoKR8EjC8wMSH5vGHKSFGJooby97TKsvEstSV9BWwPqz9smin');
    });

    it('should generate wallet for BTC testnet', async () => {
        const wallet = await generateBtcWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a');
        expect(wallet.xpriv).toBe('tprv8j3JndwWdgtWECE6FSazS25LDuNHi8r3FCFLythjpXHcBrBP7QKiVs8YFX7S2o8eSvBNFRUJCLo666ax3A8a2KGAjApgkvMDzh8Ek8yP2Bu');
    });

    it('should generate wallet for LTC mainnet', async () => {
        const wallet = await generateLtcWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('Ltub2aXe9g8RPgAcY6jb6FftNJfQXHMV6UNBeZwrWH1K3vjpua9u8uj95xkZyCC4utdEbfYeh9TwxcUiFy2mGzBCJVBwW3ezHmLX2fHxv7HUt8J');
        expect(wallet.xpriv).toBe('Ltpv79MJYtht9XdevE2kqeBWHiqC5ifJ2DoXa3qpqJF27jxEKCxpozgi5MeJipE46xw3JXnhPzJ5aSpEwTm76r8mrDPj8CNv8UNc3AsdFTD4Niq');
    });

    it('should generate wallet for LTC testnet', async () => {
        const wallet = await generateLtcWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('ttub4giastL5S3AicjXRBEJt7uq22b611rJvVfTgJSRfYeyZkwXwKnZcctK3tEjMpqrgiNSnYAzkKPJDxGoKNWQzkzTJxSryHbaYxsYW9Vr6AYQ');
        expect(wallet.xpriv).toBe('ttpv9FYFH6uYBtdkzrpavcpW3Kzob2PowbkGR9MedTfNcUByAaLrzsXBcHCndrERL4k4cbyXhafrXV1HgaqU3iWkHY2TQ1L86UwctLAMW39Um6G');
    });

    it('should generate wallet for BCH mainnet', async () => {
        const wallet = await generateBchWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6EafivSZvqR8ysLKS52NDKfn16sB9uhCEfCKdYi7PpGqqK3fJGdd53DzUnWYvFRZKAC7pB8FVnvuJKkJparfjjfVPTQTmC7dfC6aVvw6f98');
        expect(wallet.xpriv).toBe('xprvA1bKKQug6TrqmPFrL3VMrBj3T52gkSyLsSGiqAJVqUjrxWiWkjKNXEuWdYArtYQxusEry65cmsQ47nR7Pckbg9uRKtx7BfS6uBC5ph4cEXX');
    });

    it('should generate wallet for BCH testnet', async () => {
        const wallet = await generateBchWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('tpubDExJFAGFe7NbFfXAtG1TRF19LDxq9JCFnHncz6mFjj2jabiNNVUiDUtpipbLSkNo74j2Rke82tkwzWEvDShudB7nT49mSimsF9gzFwTf4nw');
        expect(wallet.xpriv).toBe('tprv8iGG6kE1VjgvNCVNzcLs1qM2mCStyy1MCzBqhaixKTELk7Tbk6f82zGxYiLWtuoHHJmdyBhNwDyradxrWq6YVDB1rYAQr2A9pGwWGPFz8yw');
    });

    it('should generate wallet for ETH mainnet', async () => {
        const wallet = await generateEthWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6DtR524VQx3ENj2E9pNZnjqkVp47YN5sRCP5y4Gs6KZTwDhH9HTVX8shJPt74WaPZRftRXFfnsyPbMPh6DMEmrQ2WBxDJzGxriStAB36bQM');
        expect(wallet.xpriv).toBe('xprv9zu4fWXbaaUwAEwm3nqZRbu1wnDd8uN23yTVAfsFXz2V4RN8bk9EyLZDT5wXdx5ArLon1FMn2mWPNWu3D8CekTEMc26MaV4QSgCpbuoDMti');
    });

    it('should generate wallet for ETH testnet', async () => {
        const wallet = await generateEthWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25');
        expect(wallet.xpriv).toBe('xprvA2NN1JdBER4RdNzZasjVGNTLumx5Ucp2ueLE7UHHLYo8QFSJ82yxz7m6LLwn2RkL5UebFKrY2zDHdF3CuwndDFzaCXcP6ZdB5bNpJSWVHuE');
    });

    it('should generate wallet for VET mainnet', async () => {
        const wallet = await generateVetWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6EzJLu3Hi5hEFAkiZAxCTaXqXoS95seTnG1tdYdF8fBcVZCfR8GQP8UGvfF52szpwZqiiGHJw5694emxSpYBE5qDxAZUgiHLzbVhb5ErRMa');
        expect(wallet.xpriv).toBe('xprvA1zwwPWPsi8w2ggFT9RC6Sb6ymbegQvcR36HqADdaKedcksWsax9qL9o5Pu8QMT3nR91jJwnDLwVzY9fkqTtt8Fgj62htPrdJzboKdq1seX');
    });

    it('should generate wallet for VET testnet', async () => {
        const wallet = await generateVetWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25');
        expect(wallet.xpriv).toBe('xprvA2NN1JdBER4RdNzZasjVGNTLumx5Ucp2ueLE7UHHLYo8QFSJ82yxz7m6LLwn2RkL5UebFKrY2zDHdF3CuwndDFzaCXcP6ZdB5bNpJSWVHuE');
    });

    it('should generate wallet for BNB mainnet', async () => {
        const wallet = await generateBnbWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('xpub6EGRttvAUHfDHnwPfrQC9NdHuVpkYmrNGyRVBq5XTQyaCB4GaKgo9xNe4A1iP2uCTpDFnfH9PP5xeCnZC2Baqe88pbR2JJ1ofZ5efp7Xz8d');
        expect(wallet.xpriv).toBe('46c65d711fcc41b4da4b6a14f18462a11cdeaf27fca742a203c8c9b4afe6ed57');
    });

    it('should generate wallet for BNB testnet', async () => {
        const wallet = await generateBnbWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten');
        expect(wallet.xpub).toBe('tpubDEe4R8jrBZcfZb8F83PHMHxfEcvQYAMRpc1nYP8foKjTwTiyeYXtJQ3UJC6VuXrSFikAQEo1vUv1LPHAat2pj5aRtCAKypg3FWg4RqpqrJj');
        expect(wallet.xpriv).toBe('46c65d711fcc41b4da4b6a14f18462a11cdeaf27fca742a203c8c9b4afe6ed57');
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
