import {Currency} from '../model'
import {generateAddressFromPrivatekey, generateAddressFromXPub, generateFlowPublicKeyFromPrivateKey, generatePrivateKeyFromMnemonic} from './address'
import {generateBnbWallet, generateTronWallet} from './wallet'
// tslint:disable-next-line:no-var-requires
const TronWeb = require('tronweb')
describe('Address tests', () => {
    it('should generate private key for QTUM testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.QTUM, true, 'unable stone luggage syrup soul country hammer fee private coyote phrase brisk', 1)
        expect(privateKey).toBe('cPtkzH8zCxWgyaqMiLJ7sJmZBgmLUb2kBMBrWzhKP9BVUHJfbg5w')
    })
    it('should generate address from private key for QTUM testnet', async () => {
        const address = await generateAddressFromPrivatekey(Currency.QTUM, true, 'cNR1n1EuzzaWHD7xcmAo71mwxyVV3uJUbLoamQFiXzaJhjTfCF2P')
        expect(address).toBe('qWpEineYmtc2Ea25GqDYhvuzCjTiu5hMYA')
    })
    it('should generate address from XPub for QTUM testnet', async () => {
        const address = await generateAddressFromXPub(Currency.QTUM, true, 'tpubDEPswwDHtxcS3q3K81iRgcxRKinjdEBM6dKer3HjeVPRgL44fFpJpttdDxQLLAxLoZLu69c6bMeyGqCPihUdCZedYu9vqah2gbP1wkLUvzB', 1)
        console.log(address)
        expect(address).toBe('qZ4oBnNAyQBEsy5G7VRUCJXZsiQKkTU3KL')
    })

    it('should generate address 1 for ONE mainnet', () => {
        const address = generateAddressFromXPub(Currency.ONE, false, 'xpub6EiLaLx7QvbzXKLr8AmyHCEDss5gM5mW3XuTEFCYVH7HHCVA7dyrbzE7YawQ4yTxRtZyjgX1sTgbjEWaMKxYMrhhk8rjtVvhbhPH3wrw8Ei', 1)
        expect(address).toBe('0x209f1ecead1c7096669e65f2ab21fca280b7de32')
    })

    it('should generate address 1 for ONE testnet', () => {
        const address = generateAddressFromXPub(Currency.ONE, true, 'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25', 2)
        expect(address).toBe('0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a')
    })

    it('should generate address 1 for TRON mainnet', () => {
        const address = generateAddressFromXPub(Currency.TRON, false, '0244b3f40c6e570ae0032f6d7be87737a6c4e5314a4a1a82e22d0460a0d0cd794936c61f0c80dc74ace4cd04690d4eeb1aa6555883be006e1748306faa7ed3a26a', 1)
        expect(address).toBe('TFFBpkRNro4Pe4154ayGWx7C6Ev7BvQZ6t')
    })

    it('should generate public key 1 for FLOW mainnet', () => {
        const address = generateAddressFromXPub(Currency.FLOW, false, 'xpub6EVKqCYcoa9DXpjAACsdyQTUZ5tgx3DUyt5Yy8xx9kmVKMCsn3vtLictDQMjdEtpo5CpwVwipVxThFKwh49xNJ5Fy752ifnM5mwYy28AtVv', 1)
        expect(address).toBe('968c3ce11e871cb2b7161b282655ee5fcb051f3c04894705d771bf11c6fbebfc6556ab8a0c04f45ea56281312336d0668529077c9d66891a6cad3db877acbe90')
    })

    it('should generate address 1 for BTC testnet', () => {
        const address = generateAddressFromXPub(Currency.BTC, true, 'tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a', 1)
        expect(address).toBe('mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5')
    })

    it('should generate address 1 for LTC mainnet', () => {
        const address = generateAddressFromXPub(Currency.LTC, false, 'Ltub2aXe9g8RPgAcY6jb6FftNJfQXHMV6UNBeZwrWH1K3vjpua9u8uj95xkZyCC4utdEbfYeh9TwxcUiFy2mGzBCJVBwW3ezHmLX2fHxv7HUt8J', 1)
        expect(address).toBe('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b')
    })

    it('should generate address 1 for LTC testnet', () => {
        const address = generateAddressFromXPub(Currency.LTC, true, 'ttub4giastL5S3AicjXRBEJt7uq22b611rJvVfTgJSRfYeyZkwXwKnZcctK3tEjMpqrgiNSnYAzkKPJDxGoKNWQzkzTJxSryHbaYxsYW9Vr6AYQ', 1)
        expect(address).toBe('mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5')
    })

    it('should generate address 1 for DOGE mainnet', () => {
        const address = generateAddressFromXPub(Currency.DOGE, false, 'xpub6EKTDXEVtTZR3sZoujGEnp9arodxCxHzTrN6G1PEFV7d8bt7CER3fLg8sz8G81LLAkz5C46FCtj4tppA7zd592gs4kCyKvqrMoQK6DQnD5r', 1)
        expect(address).toBe('DJKAJhzMzvCezBjfAzdSKrTykbQB5kNCgv')
    })

    it('should generate address 1 for DOGE testnet', () => {
        const address = generateAddressFromXPub(Currency.DOGE, true, 'tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a', 1)
        expect(address).toBe('nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W')
    })

    it('should generate address 1 for BCH mainnet', () => {
        const address = generateAddressFromXPub(Currency.BCH, false, 'xpub6EafivSZvqR8ysLKS52NDKfn16sB9uhCEfCKdYi7PpGqqK3fJGdd53DzUnWYvFRZKAC7pB8FVnvuJKkJparfjjfVPTQTmC7dfC6aVvw6f98', 1)
        expect(address).toBe('bitcoincash:qr9wgjtyjd4q60323gd2ytsv5w3thl92rclzrklply')
    })

    it('should generate address 1 for BCH testnet', () => {
        const address = generateAddressFromXPub(Currency.BCH, true, 'tpubDExJFAGFe7NbFfXAtG1TRF19LDxq9JCFnHncz6mFjj2jabiNNVUiDUtpipbLSkNo74j2Rke82tkwzWEvDShudB7nT49mSimsF9gzFwTf4nw', 1)
        expect(address).toBe('bchtest:qr9wgjtyjd4q60323gd2ytsv5w3thl92rcms83akcc')
    })

    it('should generate address 1 for ETH mainnet', () => {
        const address = generateAddressFromXPub(Currency.ETH, false, 'xpub6DtR524VQx3ENj2E9pNZnjqkVp47YN5sRCP5y4Gs6KZTwDhH9HTVX8shJPt74WaPZRftRXFfnsyPbMPh6DMEmrQ2WBxDJzGxriStAB36bQM', 1)
        expect(address).toBe('0xaac8c73348f1f92b2f9647e1e4f3cf14e2a8b3cb')
    })

    it('should generate address 1 for ETH testnet', () => {
        const address = generateAddressFromXPub(Currency.ETH, true, 'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25', 1)
        expect(address).toBe('0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea')
    })

    it('should generate address 1 for XDC testnet', () => {
        const address = generateAddressFromXPub(Currency.XDC, true, 'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25', 1)
        expect(address).toBe('xdc8cb76aed9c5e336ef961265c6079c14e9cd3d2ea')
    })

    it('should generate address 1 for CELO mainnet', () => {
        const address = generateAddressFromXPub(Currency.CELO, false, 'xpub6F2PSwHVww3pw4NE7hbrNLNBYL87eYTEqXTF6Aw5FACuQTBHPtCUbqG39LqXv81NLXhjb4ECFA19h8jGhKtdQNVvxm4Md1xtiiKCnxp9Jq1', 1)
        expect(address).toBe('0xfc2d2698ffd1bcf31c950d61d5c517e28fd739f9')
    })

    it('should generate address 1 for CELO testnet', () => {
        const address = generateAddressFromXPub(Currency.CELO, true, 'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25', 1)
        expect(address).toBe('0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea')
    })

    it('should generate address 1 for VET mainnet', () => {
        const address = generateAddressFromXPub(Currency.VET, false, 'xpub6EzJLu3Hi5hEFAkiZAxCTaXqXoS95seTnG1tdYdF8fBcVZCfR8GQP8UGvfF52szpwZqiiGHJw5694emxSpYBE5qDxAZUgiHLzbVhb5ErRMa', 1)
        expect(address).toBe('0x5b70c58cb71712e2d4d3519e065bbe196546877d')
    })

    it('should generate address 1 for VET testnet', () => {
        const address = generateAddressFromXPub(Currency.VET, true, 'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25', 1)
        expect(address).toBe('0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea')
    })

    it('should generate private key 1 for BTC mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BTC, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('KwrYonf8pFfyQR87NTn124Ep9zoJsZMBCoVUi7mjMc1eTHDyLyBN')
    })

    it('should generate private key 1 for BTC testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BTC, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV')
    })

    it('should generate address from private key for BNB testnet', async () => {
        const {address, privateKey} = await generateBnbWallet(true)
        expect(address).toBe(await generateAddressFromPrivatekey(Currency.BNB, true, privateKey))
    })

    it('should generate private key 1 for DOGE mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.DOGE, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('QTWSvxHz3FgohMiqfjfZpctvodANr7eQcpjuvdXtw6QRgxFL1PzK')
    })

    it('should generate private key 1 for DOGE testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.DOGE, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1')
    })

    it('should generate private key 1 for TRON mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.TRON, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('e75d702ce00987633f8009fbb1eabb5b187cb5b50fe9179a8d6cee6bab076b66')
    })

    it('should generate private key and address 1 for TRON mainnet', async () => {
        const wallet = await generateTronWallet('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        const address = await generateAddressFromXPub(Currency.TRON, false, wallet.xpub, 1)
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.TRON, false, wallet.mnemonic, 1)
        expect(address).toBe(TronWeb.address.fromPrivateKey(privateKey))
    })

    it('should generate private key 1 for LTC mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.LTC, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('T63MUovVt5GN5rmfwYMr4M6YqFmisjbrZrfZYZ53qWmCwiP6xCHa')
    })

    it('should generate private key 1 for LTC testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.LTC, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV')
    })

    it('should generate private key 1 for BCH mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BCH, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('KzqM77kK7zqZGockuB2Tov1FXoH6BTMaT3ixeqTPXLAYp838W3KT')
    })

    it('should generate private key 1 for FLOW mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.FLOW, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8')
    })

    it('should generate public key from private key for FLOW mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.FLOW, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8')
        expect(generateFlowPublicKeyFromPrivateKey('37afa218d41d9cd6a2c6f2b96d9eaa3ad96c598252bc50e4d45d62f9356a51f8')).toBe(generateAddressFromXPub(Currency.FLOW, false, 'xpub6EVKqCYcoa9DXpjAACsdyQTUZ5tgx3DUyt5Yy8xx9kmVKMCsn3vtLictDQMjdEtpo5CpwVwipVxThFKwh49xNJ5Fy752ifnM5mwYy28AtVv', 1))
    })

    it('should generate private key 1 for BCH testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.BCH, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('cRCLa2kAZ4XpSF62HaqbBEWKA2aVquTGX5sRmFuu2SpZ4s72vi5Y')
    })

    it('should generate private key 1 for ETH mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.ETH, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0xbc93ab7d2dbad88e64879569a9e3ceaa12d119c70d6dda4d1fc6e73765794a8d')
    })

    it('should generate private key 1 for ETH testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.ETH, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
    })

    it('should generate private key 1 for XDC testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.XDC, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
    })

    it('should generate private key 1 for ONE testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.ONE, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
    })

    it('should generate private key 1 for ONE mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.ONE, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0xe271a071aaa5e8abfcb02ce12758ae90eeb324dd6b9267778ef7990f2266429e')
    })

    it('should generate private key 1 for MATIC testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.MATIC, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
    })

    it('should generate private key 1 for MATIC mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.MATIC, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0x4bc3706c9fa5345f61d8186b817f3ba2c44581ce40fae86bec84dd9b079bc40a')
    })

    it('should generate private key 1 for VET mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.VET, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0xd2a4c2f89f58e50f2e29ed1e68552680417a0534c47bebf18f2f5f3a27817251')
    })

    it('should generate private key 1 for VET testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.VET, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
    })

    it('should generate an address from a mainnet BTC private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.BTC, false, 'KwREvx76g7QAp5dow1ab2Mg8K6Ta4SH5kR5ASjhwoDcNj2bPvgG3')
        expect(address).toBe('18w9N93bAn13wDnEXFKLGTGeYN9CQoJAqV')
    })

    it('should generate an address from a testnet BTC private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.BTC, true, 'cNvyq4JM4DnPyXNNkkxf47baCuyVesCrw5AtkALKy7ELTrBLrGBK')
        expect(address).toBe('n4EUn9z1zXK1824mTHj9hEV91L3KdNPnpY')
    })

    it('should generate an address from a mainnet LYRA private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.LYRA, false, 'SqhJUqY2quSoBBittiKB6U9kSeUccGTBGHsj2jQuh3Uk7AH9H5u7')
        expect(address).toBe('LNrkvwa8RGCyaeh733K4p7hnFm4p5NWDkq')
    })

    it.skip('should generate an address from a testnet LYRA private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.LTC, true, 'Snb6yv7H3YJ5jzbHZNFRTj3YQ1a6GjDFwPxuPbFEhUg6eniQyopJ')
        expect(address).toBe('tJJKy2c3mqXjpWDKdBADQJY6p5pBr5qvpn')
    })

    it('should generate an address from a TRON private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.TRON, true, '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701')
        expect(address).toBe('TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh')
    })

    it('should generate an address from a mainnet ETH private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.ETH, false, '0xac12f9a2d0d1f06c7dc33a3e9c18f60fe1ca65c592d1e9345c994740f9e1971e')
        expect(address).toBe('0xefc395c295a90023d3e9afacb4399da3d332947b')
    })

    it('should generate an address from a testnet ETH private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.ETH, true, '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1')
        expect(address).toBe('0x8acbcfbc8ce37f6f674f4b9861d3efe89288d89f')
    })

    it('should generate an address from a mainnet ONE private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.ONE, false, '0xac12f9a2d0d1f06c7dc33a3e9c18f60fe1ca65c592d1e9345c994740f9e1971e')
        expect(address).toBe('0xefc395c295a90023d3e9afacb4399da3d332947b')
    })

    it('should generate an address from a testnet ONE private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.ONE, true, '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1')
        expect(address).toBe('0x8acbcfbc8ce37f6f674f4b9861d3efe89288d89f')
    })

    it('should generate an address from a testnet XDC private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.XDC, true, '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1')
        expect(address).toBe('xdc8acbcfbc8ce37f6f674f4b9861d3efe89288d89f')
    })

    it('should generate private key 0!!!1 for EGLD mainnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.EGLD, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 0)
        expect(privateKey).toBe('1da12bfa82725be308f79b2c313358be5a215ca6b405b00f28750560a1febb90')
    })

    it ('should generate private key for EGLD testnet', async () => {
        const privateKey = await generatePrivateKeyFromMnemonic(Currency.EGLD, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 0)
        expect(privateKey).toBe('74ecd7fbab10383652083f503eec77fa356a7665982c1b76f526e8fd332f4747')
    })

    it('should generate address 0!!!1 for EGLD mainnet', () => {
        const address = generateAddressFromXPub(Currency.EGLD, false, 'f588698267befb4b35b4bb6bb33ce49c99d11415f2dde72aeb221dbefd712d0b', 0)
        expect(address.length).toBe(62)
        expect(address).toBe('erd17kyxnqn8hma5kdd5hd4mx08ynjvaz9q47tw7w2htygwmalt3959s2wvqmr')
    })

    it('should generate address for EGLD testnet', () => {
        const address = generateAddressFromXPub(Currency.EGLD, true, '0cd8e6217b4a218807b858ffb508483cdcdadbb7a21196727f764a510a692760', 0)
        expect(address.length).toBe(62)
        expect(address).toBe('erd1pnvwvgtmfgscspactrlm2zzg8nwd4kah5ggevunlwe99zznfyasq5m7fz2')
    })

    it('should generate an address from a mainnet EGLD private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.EGLD, false, '1da12bfa82725be308f79b2c313358be5a215ca6b405b00f28750560a1febb90')
        expect(address.length).toBe(62)
        expect(address).toBe('erd17kyxnqn8hma5kdd5hd4mx08ynjvaz9q47tw7w2htygwmalt3959s2wvqmr')
    })

    it('should generate an address from a testnet EGLD private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.EGLD, true, '74ecd7fbab10383652083f503eec77fa356a7665982c1b76f526e8fd332f4747')
        expect(address.length).toBe(62)
        expect(address).toBe('erd1pnvwvgtmfgscspactrlm2zzg8nwd4kah5ggevunlwe99zznfyasq5m7fz2')
    })
})
