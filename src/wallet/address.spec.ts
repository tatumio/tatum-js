import {Currency} from '../model';
import {generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address';

describe('Address tests', () => {

    it('should generate address 1 for BTC mainnet', () => {
        const address = generateAddressFromXPub(Currency.BTC, false, 'xpub6EsCk1uU6cJzqvP9CdsTiJwT2rF748YkPnhv5Qo8q44DG7nn2vbyt48YRsNSUYS44jFCW9gwvD9kLQu9AuqXpTpM1c5hgg9PsuBLdeNncid', 1);
        expect(address).toBe('1HWYaP13JKtaW2Mhq69NVeSLjRYGpD3aKv');
    });

    it('should generate address 1 for BTC testnet', () => {
        const address = generateAddressFromXPub(Currency.BTC, true, 'tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a', 1);
        expect(address).toBe('mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5');
    });

    it('should generate address 1 for LTC mainnet', () => {
        const address = generateAddressFromXPub(Currency.LTC, false, 'Ltub2aXe9g8RPgAcY6jb6FftNJfQXHMV6UNBeZwrWH1K3vjpua9u8uj95xkZyCC4utdEbfYeh9TwxcUiFy2mGzBCJVBwW3ezHmLX2fHxv7HUt8J', 1);
        expect(address).toBe('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b');
    });

    it('should generate address 1 for LTC testnet', () => {
        const address = generateAddressFromXPub(Currency.LTC, true, 'ttub4giastL5S3AicjXRBEJt7uq22b611rJvVfTgJSRfYeyZkwXwKnZcctK3tEjMpqrgiNSnYAzkKPJDxGoKNWQzkzTJxSryHbaYxsYW9Vr6AYQ', 1);
        expect(address).toBe('mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5');
    });

    it('should generate address 1 for BCH mainnet', () => {
        const address = generateAddressFromXPub(Currency.BCH, false, 'xpub6EafivSZvqR8ysLKS52NDKfn16sB9uhCEfCKdYi7PpGqqK3fJGdd53DzUnWYvFRZKAC7pB8FVnvuJKkJparfjjfVPTQTmC7dfC6aVvw6f98', 1);
        expect(address).toBe('bitcoincash:qr9wgjtyjd4q60323gd2ytsv5w3thl92rclzrklply');
    });

    it('should generate address 1 for BCH testnet', () => {
        const address = generateAddressFromXPub(Currency.BCH, true, 'tpubDExJFAGFe7NbFfXAtG1TRF19LDxq9JCFnHncz6mFjj2jabiNNVUiDUtpipbLSkNo74j2Rke82tkwzWEvDShudB7nT49mSimsF9gzFwTf4nw', 1);
        expect(address).toBe('bchtest:qr9wgjtyjd4q60323gd2ytsv5w3thl92rcms83akcc');
    });

    it('should generate address 1 for ETH mainnet', () => {
        const address = generateAddressFromXPub(Currency.ETH, false, 'xpub6DtR524VQx3ENj2E9pNZnjqkVp47YN5sRCP5y4Gs6KZTwDhH9HTVX8shJPt74WaPZRftRXFfnsyPbMPh6DMEmrQ2WBxDJzGxriStAB36bQM', 1);
        expect(address).toBe('0xaac8c73348f1f92b2f9647e1e4f3cf14e2a8b3cb');
    });

    it('should generate address 1 for ETH testnet', () => {
        const address = generateAddressFromXPub(Currency.ETH, true, 'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25', 1);
        expect(address).toBe('0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea');
    });

    it('should generate address 1 for VET mainnet', () => {
        const address = generateAddressFromXPub(Currency.VET, false, 'xpub6EzJLu3Hi5hEFAkiZAxCTaXqXoS95seTnG1tdYdF8fBcVZCfR8GQP8UGvfF52szpwZqiiGHJw5694emxSpYBE5qDxAZUgiHLzbVhb5ErRMa', 1);
        expect(address).toBe('0x5b70c58cb71712e2d4d3519e065bbe196546877d');
    });

    it('should generate address 1 for VET testnet', () => {
        const address = generateAddressFromXPub(Currency.VET, true, 'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25', 1);
        expect(address).toBe('0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea');
    });

    it('should generate private key 1 for BTC mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BTC, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('KwrYonf8pFfyQR87NTn124Ep9zoJsZMBCoVUi7mjMc1eTHDyLyBN');
    });

    it('should generate private key 1 for BTC testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BTC, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV');
    });

    it('should generate private key 1 for LTC mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.LTC, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('T63MUovVt5GN5rmfwYMr4M6YqFmisjbrZrfZYZ53qWmCwiP6xCHa');
    });

    it('should generate private key 1 for LTC testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.LTC, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV');
    });

    it('should generate private key 1 for BCH mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BCH, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('KzqM77kK7zqZGockuB2Tov1FXoH6BTMaT3ixeqTPXLAYp838W3KT');
    });

    it('should generate private key 1 for BCH testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BCH, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('cRCLa2kAZ4XpSF62HaqbBEWKA2aVquTGX5sRmFuu2SpZ4s72vi5Y');
    });

    it('should generate private key 1 for ETH mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.ETH, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('0xbc93ab7d2dbad88e64879569a9e3ceaa12d119c70d6dda4d1fc6e73765794a8d');
    });

    it('should generate private key 1 for ETH testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.ETH, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb');
    });

    it('should generate private key 1 for VET mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.VET, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('0xd2a4c2f89f58e50f2e29ed1e68552680417a0534c47bebf18f2f5f3a27817251');
    });

    it('should generate private key 1 for VET testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.VET, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb');
    });
});