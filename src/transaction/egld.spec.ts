import {Currency, EgldSendTransaction, EgldEsdtTransaction, EsdtToken, EsdtIssue, EsdtIssueNftOrSft} from '../model'
import {generateAddressFromPrivatekey} from '../wallet/address'
import {
    egldGetConfig, egldGetGasPrice, signEgldTransaction, prepareEgldDeployEsdtSignedTransaction,
    prepareEgldDeployNftOrSftSignedTransaction, prepareEgldStopNftCreateSignedTransaction,
} from './egld'

describe('Elrond EGLD tests', () => {

    jest.setTimeout(99999)

    it('should get address from private key', async () => {
        const address = await generateAddressFromPrivatekey(Currency.EGLD, false, '1da12bfa82725be308f79b2c313358be5a215ca6b405b00f28750560a1febb90')
        // console.log(address);
        expect(address.length).toBe(62)
        expect(address).toBe('erd17kyxnqn8hma5kdd5hd4mx08ynjvaz9q47tw7w2htygwmalt3959s2wvqmr')
    })

    it('should get network config', async () => {
        const {data} = await egldGetConfig()
        // console.log(data.config['erd_chain_id']);
        expect(data.config['erd_chain_id']).toBeDefined()
    })

    it.skip('should get gas price', async () => {
        const result = await egldGetGasPrice()
        // console.log(result);
        expect(result).toBeDefined()
    })

    it('should sign transaction', async () => {
        const body: EgldSendTransaction = {
            nonce: 123,
            value: '0',
            receiver: 'erd1pnvwvgtmfgscspactrlm2zzg8nwd4kah5ggevunlwe99zznfyasq5m7fz2',
            sender: 'erd17kyxnqn8hma5kdd5hd4mx08ynjvaz9q47tw7w2htygwmalt3959s2wvqmr',
            gasPrice: 1000000000,
            gasLimit: 60000000,
            // data: transaction.data,
            chainID: '1',
            version: 1, 
        }
        const result = await signEgldTransaction(body, '1da12bfa82725be308f79b2c313358be5a215ca6b405b00f28750560a1febb90')
        // console.log(result);
        expect(result).toBeDefined()
    })

    it('should prepare issuance of fungible ESDT token', async () => {
        const data: EsdtIssue = {
            service: 'issue',
            tokenName: 'testName',
            tokenTicker: 'TEST1',
            initialSupply: 1000,
            decimals: 6,
        }
        const body: EgldEsdtTransaction = {
            fromPrivateKey: '1da12bfa82725be308f79b2c313358be5a215ca6b405b00f28750560a1febb90',
            nonce: 1,
            data,
        }
        const result = await prepareEgldDeployEsdtSignedTransaction(body)
        // console.log(result);
        expect(result).toBeDefined()
    })

    it('should prepare issuance of NFT/SFT ESDT token', async () => {
        const data: EsdtIssueNftOrSft = {
            service: 'issueNonFungible',
            tokenName: 'testNFTName',
            tokenTicker: 'TEST1NFT',
        }
        const body: EgldEsdtTransaction = {
            fromPrivateKey: '1da12bfa82725be308f79b2c313358be5a215ca6b405b00f28750560a1febb90',
            nonce: 1,
            data,
        }
        const result = await prepareEgldDeployNftOrSftSignedTransaction(body)
        // console.log(result);
        expect(result).toBeDefined()
    })

    it('should prepare stop NFT creation transaction', async () => {
        const data: EsdtToken = {
            service: 'stopNFTCreate',
            tokenId: 'TEST1NFT-123456',
        }
        const body: EgldEsdtTransaction = {
            fromPrivateKey: '1da12bfa82725be308f79b2c313358be5a215ca6b405b00f28750560a1febb90',
            nonce: 1,
            data,
        }
        const result = await prepareEgldStopNftCreateSignedTransaction(body)
        console.log(result)
        expect(result).toBeDefined()
    })
})
