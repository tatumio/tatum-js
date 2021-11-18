import { generateAddressFromXPub, generatePrivateKeyFromMnemonic } from './address';

describe('Address tests', () => {
    it('should generate address 1 for LTC mainnet', () => {
        const address = generateAddressFromXPub(false, 'Ltub2aXe9g8RPgAcY6jb6FftNJfQXHMV6UNBeZwrWH1K3vjpua9u8uj95xkZyCC4utdEbfYeh9TwxcUiFy2mGzBCJVBwW3ezHmLX2fHxv7HUt8J', 1);
        expect(address).toBe('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b');
    });

    it('should generate address 1 for LTC testnet', () => {
        const address = generateAddressFromXPub(true, 'ttub4giastL5S3AicjXRBEJt7uq22b611rJvVfTgJSRfYeyZkwXwKnZcctK3tEjMpqrgiNSnYAzkKPJDxGoKNWQzkzTJxSryHbaYxsYW9Vr6AYQ', 1);
        expect(address).toBe('mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5');
    });
    
    it('should generate private key 1 for LTC mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('T63MUovVt5GN5rmfwYMr4M6YqFmisjbrZrfZYZ53qWmCwiP6xCHa');
    });

    it('should generate private key 1 for LTC testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1);
        expect(privateKey).toBe('cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV');
    });
});
