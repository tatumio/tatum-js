import { GenerateCustodialAddress, Currency, TransferFromCustodialAddress, ContractType } from '@tatumio/tatum-core';
import {
    sendCeloGenerateCustodialWalletSignedTransaction,
} from '../transaction';
import {prepareTransferFromCustodialWallet} from './custodial';
import {CeloProvider} from '@celo-tools/celo-ethers-wrapper';

describe('Custodial wallet tests', () => {
    jest.setTimeout(9999);

    describe('Deploy address', () => {
        it('should create on CELO no batch', async () => {
            const body = new GenerateCustodialAddress()
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
            body.chain = Currency.CELO
            body.feeCurrency = Currency.CUSD
            body.enableFungibleTokens = true
            body.enableNonFungibleTokens = true
            body.enableSemiFungibleTokens = false
            body.enableBatchTransactions = false
            const txData = await sendCeloGenerateCustodialWalletSignedTransaction(true, body, 'https://alfajores-forno.celo-testnet.org')
            expect(txData.txId).toContain('0x')
            console.log(txData.txId)
        })
    })

    describe('Transfer from address CELO', () => {
        it('should transfer CEUR no batch', async () => {
            const body = new TransferFromCustodialAddress()
            body.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
            body.chain = Currency.CELO
            body.feeCurrency = Currency.CELO
            body.contractType = ContractType.FUNGIBLE_TOKEN
            body.custodialAddress = '0xA16B57eaFA0Ae9d3E57D6b513E9f353eb40dbBB5'
            body.tokenAddress = '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f' // CEUR ERC20
            body.recipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
            body.amount = '1'
            const txData = await prepareTransferFromCustodialWallet(true, body)
            expect(txData).toContain('0x')
            const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
            await provider.ready
            console.log(await provider.sendTransaction(txData))
        })

    })
})
