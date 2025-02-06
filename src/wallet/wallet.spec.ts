import {Currency} from '../model'
import {generatePrivateKeyFromMnemonic} from './address'
import {
    generateBchWallet,
    generateBtcWallet,
    generateCeloWallet,
    generateDogeWallet,
    generateEthWallet,
    generateFlowWallet,
    generateLtcWallet,
    generateOneWallet,
    generateTronWallet,
    generateVetWallet,
    generateWallet,
    generateXdcWallet,
    generateXlmWallet,
    generateXrpWallet,
    generateEgldWallet,
} from './wallet'

describe('Wallet tests', () => {
    it('should generate wallet for FLOW mainnet', async () => {
        const wallet = await generateFlowWallet('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6EVKqCYcoa9DXpjAACsdyQTUZ5tgx3DUyt5Yy8xx9kmVKMCsn3vtLictDQMjdEtpo5CpwVwipVxThFKwh49xNJ5Fy752ifnM5mwYy28AtVv')
    })

    it('should generate wallet for BTC mainnet', async () => {
        const wallet = await generateBtcWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6DtevPxud8AJUCqddtVqpqxAJvjFrYYvtt4co2kZF7ifPW3d5FJ3B9i5x7xL4CZirb2eNDEVqCtBgiGZR6Kkee5RdHsDoJVbtxi946axjXJ')
    })

    it('should generate wallet for BTC testnet', async () => {
        const wallet = await generateBtcWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a')
    })

    it('should generate wallet for DOGE mainnet', async () => {
        const wallet = await generateDogeWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6EKTDXEVtTZR3sZoujGEnp9arodxCxHzTrN6G1PEFV7d8bt7CER3fLg8sz8G81LLAkz5C46FCtj4tppA7zd592gs4kCyKvqrMoQK6DQnD5r')
    })

    it('should generate wallet for DOGE testnet', async () => {
        const wallet = await generateDogeWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('tpubDFjLw3ykn4aB7fFt96FaqRjSnvtDsU2wpVr8GQk3Eo612LS9jo9JgMkQRfYVG248J3pTBsxGg3PYUXFd7pReNLTeUzxFcUDL3zCvrp3H34a')
    })

    it('should generate wallet for ONE testnet', async () => {
        const wallet = await generateOneWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25')
    })

    it('should generate wallet for ONE mainnet', async () => {
        const wallet = await generateOneWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6EiLaLx7QvbzXKLr8AmyHCEDss5gM5mW3XuTEFCYVH7HHCVA7dyrbzE7YawQ4yTxRtZyjgX1sTgbjEWaMKxYMrhhk8rjtVvhbhPH3wrw8Ei')
    })

    it('should generate wallet for LTC mainnet', async () => {
        const wallet = await generateLtcWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('Ltub2aXe9g8RPgAcY6jb6FftNJfQXHMV6UNBeZwrWH1K3vjpua9u8uj95xkZyCC4utdEbfYeh9TwxcUiFy2mGzBCJVBwW3ezHmLX2fHxv7HUt8J')
    })

    it('should generate wallet for TRON', async () => {
        const wallet = await generateTronWallet('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6Ew238Ncffg3ZtCt27ygZ48RKAgZTqi2qC92xsk1URTxqJqFHBgrG52dG4GJjAwB3DvtdNQonY2bYLs5WJAwhWoHpvKQYzauue9wT91kwgH')
    })

    it('should generate wallet for LTC testnet', async () => {
        const wallet = await generateLtcWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('ttub4giastL5S3AicjXRBEJt7uq22b611rJvVfTgJSRfYeyZkwXwKnZcctK3tEjMpqrgiNSnYAzkKPJDxGoKNWQzkzTJxSryHbaYxsYW9Vr6AYQ')
    })

    it('should generate wallet for BCH mainnet', async () => {
        const wallet = await generateBchWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6EafivSZvqR8ysLKS52NDKfn16sB9uhCEfCKdYi7PpGqqK3fJGdd53DzUnWYvFRZKAC7pB8FVnvuJKkJparfjjfVPTQTmC7dfC6aVvw6f98')
    })

    it('should generate wallet for BCH testnet', async () => {
        const wallet = await generateBchWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('tpubDExJFAGFe7NbFfXAtG1TRF19LDxq9JCFnHncz6mFjj2jabiNNVUiDUtpipbLSkNo74j2Rke82tkwzWEvDShudB7nT49mSimsF9gzFwTf4nw')
    })

    it('should generate wallet for ETH mainnet', async () => {
        const wallet = await generateEthWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6DtR524VQx3ENj2E9pNZnjqkVp47YN5sRCP5y4Gs6KZTwDhH9HTVX8shJPt74WaPZRftRXFfnsyPbMPh6DMEmrQ2WBxDJzGxriStAB36bQM')
    })

    it('should generate wallet for ETH testnet', async () => {
        const wallet = await generateEthWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25')
    })

    it('should generate wallet for XDC testnet', async () => {
        const wallet = await generateXdcWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25')
    })

    it('should generate wallet for Celo mainnet', async () => {
        const wallet = await generateCeloWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6F2PSwHVww3pw4NE7hbrNLNBYL87eYTEqXTF6Aw5FACuQTBHPtCUbqG39LqXv81NLXhjb4ECFA19h8jGhKtdQNVvxm4Md1xtiiKCnxp9Jq1')
    })

    it('should generate wallet for Celo testnet', async () => {
        const wallet = await generateCeloWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25')
    })

    it('should generate private key for Celo mainnet', async () => {
        const wallet = await generatePrivateKeyFromMnemonic(Currency.CELO, false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(wallet).toBe('0x5bdb801c0f22512b46189740c18b7b30204e99a8ee4d91d8da7caad6268bd024')
    })

    it('should generate private key for Celo testnet', async () => {
        const wallet = await generatePrivateKeyFromMnemonic(Currency.CELO, true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten', 1)
        expect(wallet).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
    })

    it('should generate wallet for VET mainnet', async () => {
        const wallet = await generateVetWallet(false, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6EzJLu3Hi5hEFAkiZAxCTaXqXoS95seTnG1tdYdF8fBcVZCfR8GQP8UGvfF52szpwZqiiGHJw5694emxSpYBE5qDxAZUgiHLzbVhb5ErRMa')
    })

    it('should generate wallet for VET testnet', async () => {
        const wallet = await generateVetWallet(true, 'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.xpub).toBe('xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25')
    })

    it('should generate wallet for EGLD', async () => {
        const wallet = await generateEgldWallet('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
        expect(wallet.mnemonic).toBe('quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten')
    })

    it('should generate wallet for XLM', async () => {
        const wallet = await generateXlmWallet()
        expect(wallet.address).not.toBe('')
        expect(wallet.secret).not.toBe('')
    })

    it('should generate wallet for XRP', async () => {
        const wallet = await generateXrpWallet()
        expect(wallet.address).not.toBe('')
        expect(wallet.secret).not.toBe('')
    })
})
