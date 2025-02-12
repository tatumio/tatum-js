import {tronBroadcast} from '../blockchain'

import token_bytecode from '../contracts/trc20/token_bytecode'
import {
    CreateTronTrc10,
    CreateTronTrc20,
    Currency,
    FreezeTron,
    TransferTron,
    TransferTronTrc10,
    TransferTronTrc20,
    TronBurnTrc721,
    TronDeployTrc721,
    TronMintMultipleTrc721,
    TronMintTrc721,
    TronTransferTrc721,
    TronUpdateCashbackTrc721
} from '../model'
import {
    prepareTronBurnTrc721SignedTransaction,
    prepareTronCreateTrc10SignedTransaction,
    prepareTronCreateTrc20SignedTransaction,
    prepareTronDeployTrc721SignedTransaction,
    prepareTronFreezeTransaction,
    prepareTronMintCashbackTrc721SignedTransaction,
    prepareTronMintMultipleTrc721SignedTransaction,
    prepareTronMintTrc721SignedTransaction,
    prepareTronSignedTransaction,
    prepareTronTransferTrc721SignedTransaction,
    prepareTronTrc10SignedTransaction,
    prepareTronTrc20SignedTransaction,
    prepareTronUpdateCashbackForAuthorTrc721SignedTransaction,
} from './tron'

const IS_TESTNET = true
const PRIVATE_KEY = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
const RECEIVER_ADDR = 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh'
const SENDER_ADDR = 'TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW'
const TRC20_TOKEN = 'TWgHeettKLgq1hCdEUPaZNCM6hPg8JkG2X'

describe('Tron transactions', () => {
    jest.setTimeout(9999)
    it('should test valid transaction data', async () => {
        const body = new TransferTron()
        body.fromPrivateKey = PRIVATE_KEY
        body.amount = '0.000001'
        body.to = RECEIVER_ADDR
        const txData = await prepareTronSignedTransaction(IS_TESTNET, body)
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.amount).toBe(1)
    })

    it('should test valid freeze transaction data', async () => {
        const body = new FreezeTron()
        body.fromPrivateKey = PRIVATE_KEY
        body.amount = '1'
        body.resource = 'ENERGY'
        body.duration = 3
        body.receiver = SENDER_ADDR
        const txData = await prepareTronFreezeTransaction(IS_TESTNET, body)
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.frozen_balance).toBe(1000000)
    })

    it('should test valid TRC20 create transaction data', async () => {
        const body = new CreateTronTrc20()
        body.fromPrivateKey = PRIVATE_KEY
        body.decimals = 18
        body.symbol = 'TTM'
        body.recipient = RECEIVER_ADDR
        body.name = 'TatumToken'
        body.totalSupply = 10
        const txData = await prepareTronCreateTrc20SignedTransaction(IS_TESTNET, body)
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.new_contract.bytecode).toContain(token_bytecode)
    })

    it.skip('should test valid TRC10 transaction data', async () => {
        const body = new TransferTronTrc10()
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.amount = '0.000001'
        body.tokenId = '1000538'
        body.to = 'TVAEYCmc15awaDRAjUZ1kvcHwQQaoPw2CW'
        const txData = await prepareTronTrc10SignedTransaction(true, body)
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.amount).toBe(1)
    })

    it('should test valid TRC20 transaction data', async () => {
        const body = new TransferTronTrc20()
        body.tokenAddress = TRC20_TOKEN
        body.fromPrivateKey = PRIVATE_KEY
        body.amount = '1'
        body.feeLimit = 100
        body.to = RECEIVER_ADDR
        const txData = await prepareTronTrc20SignedTransaction(IS_TESTNET, body)
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.data).toBe('a9059cbb000000000000000000000000f4a376310e3b26a57b30d5ff230dcbc8758b84bc00000000000000000000000000000000000000000000000000000000000f4240')
    })

    it.skip('should test valid trc10 create data', async () => {
        const body = new CreateTronTrc10()
        // 1 account can issue only 1 asset
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.totalSupply = 1000000
        body.abbreviation = 'TTM'
        body.url = 'TTM'
        body.name = 'TTM'
        body.description = 'TTM'
        body.decimals = 5
        const txData = await prepareTronCreateTrc10SignedTransaction(true, body)
        expect(JSON.parse(txData).raw_data.contract[0].parameter.value.amount).toBe(1)
    })

    it('should not test valid transaction data, to private key assigned', async () => {
        const body = new TransferTron()
        // body.amount = '0';
        body.amount = '1'
        body.to = 'TFnpwE8jCgtq3QpAhFfF2QpXzdBGmKvKMe'
        try {
            await prepareTronSignedTransaction(IS_TESTNET, body)
            fail('Validation did not pass.')
        } catch (e) {
            // console.error(e);
        }
    })

    // ERC-721 tests

    it.skip('should test valid deploy 721 transaction', async () => {
        const body = new TronDeployTrc721()
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.chain = Currency.TRON
        body.name = 'Tatum'
        body.symbol = 'TTM'
        body.feeLimit = 600
        try {
            const txData = await prepareTronDeployTrc721SignedTransaction(true, body)
            expect(JSON.parse(txData).txID).toBeDefined()
            console.log(await tronBroadcast(txData))
        } catch (e) {
            console.error(e)
        }
    })

    it.skip('should test valid mint 721 transaction', async () => {
        const body = new TronMintTrc721()
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.chain = Currency.TRON
        body.to = 'TFnpwE8jCgtq3QpAhFfF2QpXzdBGmKvKMe'
        body.contractAddress = 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ'
        body.tokenId = '3'
        body.url = 'https://google.com'
        body.feeLimit = 50
        const txData = await prepareTronMintTrc721SignedTransaction(true, body)
        expect(JSON.parse(txData).txID).toBeDefined()
        console.log(await tronBroadcast(txData))
    })

    it.skip('should test valid mint 721 with cashback transaction', async () => {
        const body = new TronMintTrc721()
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.chain = Currency.TRON
        body.to = 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh'
        body.contractAddress = 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ'
        body.cashbackValues = ['3']
        body.authorAddresses = ['TFnpwE8jCgtq3QpAhFfF2QpXzdBGmKvKMe']
        body.tokenId = '3000'
        body.url = 'https://google.com'
        body.feeLimit = 50
        const txData = await prepareTronMintCashbackTrc721SignedTransaction(true, body)
        expect(JSON.parse(txData).txID).toBeDefined()
        console.log(await tronBroadcast(txData))
    })

    it.skip('should test valid mint multiple 721 transaction', async () => {
        const body = new TronMintMultipleTrc721()
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.chain = Currency.TRON
        body.to = ['TFnpwE8jCgtq3QpAhFfF2QpXzdBGmKvKMe', 'TYMwiDu22V6XG3yk6W9cTVBz48okKLRczh']
        body.contractAddress = 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ'
        body.tokenId = ['40', '50']
        body.url = ['https://google.com', 'https://google.com']
        body.feeLimit = 50
        const txData = await prepareTronMintMultipleTrc721SignedTransaction(true, body)
        expect(JSON.parse(txData).txID).toBeDefined()
        console.log(await tronBroadcast(txData))
    })

    it.skip('should test valid update 721 cashback transaction', async () => {
        const body = new TronUpdateCashbackTrc721()
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.chain = Currency.TRON
        body.contractAddress = 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ'
        body.cashbackValue = '0'
        body.tokenId = '11'
        body.feeLimit = 50
        const txData = await prepareTronUpdateCashbackForAuthorTrc721SignedTransaction(true, body)
        expect(JSON.parse(txData).txID).toBeDefined()
        console.log(await tronBroadcast(txData))
    })

    it.skip('should test valid burn 721 transaction', async () => {
        const body = new TronBurnTrc721()
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.chain = Currency.TRON
        body.contractAddress = 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ'
        body.tokenId = '3'
        body.feeLimit = 50
        const txData = await prepareTronBurnTrc721SignedTransaction(true, body)
        expect(JSON.parse(txData).txID).toBeDefined()
        console.log(await tronBroadcast(txData))
    })

    it.skip('should test valid transfer 721 transaction without cashback', async () => {
        const body = new TronTransferTrc721()
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.chain = Currency.TRON
        body.contractAddress = 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ'
        body.to = 'TFnpwE8jCgtq3QpAhFfF2QpXzdBGmKvKMe'
        body.tokenId = '50'
        body.value = '0'
        body.feeLimit = 50
        const txData = await prepareTronTransferTrc721SignedTransaction(true, body)
        expect(JSON.parse(txData).txID).toBeDefined()
        console.log(await tronBroadcast(txData))
    })

    it.skip('should test valid transfer 721 transaction with cashback', async () => {
        const body = new TronTransferTrc721()
        body.fromPrivateKey = '842E09EB40D8175979EFB0071B28163E11AED0F14BDD84090A4CEFB936EF5701'
        body.chain = Currency.TRON
        body.contractAddress = 'TCrmdJmvDUPy8qSTgoVStF51yWm6VUh5yQ'
        body.to = 'TFnpwE8jCgtq3QpAhFfF2QpXzdBGmKvKMe'
        body.tokenId = '3000'
        body.value = '30'
        body.feeLimit = 50
        const txData = await prepareTronTransferTrc721SignedTransaction(true, body)
        expect(JSON.parse(txData).txID).toBeDefined()
        console.log(await tronBroadcast(txData))
    })
})
