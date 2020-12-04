import {Currency} from '../model';
import {generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic} from './address';

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

    it('should generate address 1 for ADA mainnet', () => {
        const address = generateAddressFromXPub(Currency.ADA, false, 'abdaffa9c626a49652b94aa7d26fbad0b04354bb7e8f37021d89034314b10637a97a31003cba4617b75d65f72ac8cfa07edb80a4d38270a0c27f80125c70c337', 1);
        expect(address).toBe('Ae2tdPwUPEZCRLFAmiVB3wye4P6BYeSRSETEFxE87HeCjxuqneYiiD9AGaB');
    });

    it('should generate address 1 for ADA testnet', () => {
        const address = generateAddressFromXPub(Currency.ADA, true, 'abdaffa9c626a49652b94aa7d26fbad0b04354bb7e8f37021d89034314b10637a97a31003cba4617b75d65f72ac8cfa07edb80a4d38270a0c27f80125c70c337', 1);
        expect(address).toBe('2cWKMJemoBakgWvdiKj1b2dXRvdpPWt1qNAEaGEvhQwqRa9LG6hiR2vrSYmx5WbvTPNHJ');
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

    it('should generate private key 1 for ADA', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.ADA, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('e005602357a4265f6fc58745344c86a0260064f51712ea23e4dbf3f3795e564b83c29f3e4f84ea23a3868cd215bfe68954a6369d59bf2999b0e0e3f601778ca3c958ff0de05b645c8192022caaf6d2ae49668708a0cbc3d7e9f6f6b59fb9c4aa');
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

    it('should generate an address from a mainnet BTC private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.BTC, false, 'KwREvx76g7QAp5dow1ab2Mg8K6Ta4SH5kR5ASjhwoDcNj2bPvgG3');
        expect(address).toBe('18w9N93bAn13wDnEXFKLGTGeYN9CQoJAqV');
    });

    it('should generate an address from a testnet BTC private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.BTC, true, 'cNvyq4JM4DnPyXNNkkxf47baCuyVesCrw5AtkALKy7ELTrBLrGBK');
        expect(address).toBe('n4EUn9z1zXK1824mTHj9hEV91L3KdNPnpY');
    });

    it('should generate an address from a mainnet LYRA private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.BTC, false, 'SqhJUqY2quSoBBittiKB6U9kSeUccGTBGHsj2jQuh3Uk7AH9H5u7');
        expect(address).toBe('LNrkvwa8RGCyaeh733K4p7hnFm4p5NWDkq');
    });

    it('should generate an address from a testnet LYRA private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.BTC, true, 'Snb6yv7H3YJ5jzbHZNFRTj3YQ1a6GjDFwPxuPbFEhUg6eniQyopJ');
        expect(address).toBe('tJJKy2c3mqXjpWDKdBADQJY6p5pBr5qvpn');
    });

    it('should generate an address from a mainnet ETH private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.ETH, false, '0xac12f9a2d0d1f06c7dc33a3e9c18f60fe1ca65c592d1e9345c994740f9e1971e');
        expect(address).toBe('0xefc395c295a90023d3e9afacb4399da3d332947b');
    });

    it('should generate an address from a testnet ETH private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.ETH, true, '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1');
        expect(address).toBe('0x8acbcfbc8ce37f6f674f4b9861d3efe89288d89f');
    });
});