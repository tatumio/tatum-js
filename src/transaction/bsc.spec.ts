import Web3 from 'web3';
import { Currency, DeployErc20, TransferBscBep20, TransferErc20 } from '../model';
import {
    bscGetGasPriceInWei,
    prepareBscOrBep20SignedTransaction,
    prepareCustomBep20SignedTransaction,
    prepareDeployBep20SignedTransaction,
    sendBep721Transaction,
    sendBscSmartContractMethodInvocationTransaction,
    sendBscSmartContractReadMethodInvocationTransaction,
    sendBurnBep721Transaction,
    sendDeployBep721Transaction,
    sendMintBep721Transaction,
    sendMintMultipleBep721Transaction,
    prepareBscTransferBep721SignedTransaction,
    prepareBscDeployBep721SignedTransaction,
    prepareBscMintMultipleBep721ProvenanceSignedTransaction,
    prepareBscMintBep721ProvenanceSignedTransaction
} from './bsc';
import { SmartContractReadMethodInvocation } from '../model/request/SmartContractReadMethodInvocation';
import erc721Provenance_abi from '../contracts/erc721Provenance/erc721Provenance_abi';
describe('BSC transactions', () => {
    jest.setTimeout(19999)
    const broadcast = async (txData: string) => {
        const client = new Web3('https://data-seed-prebsc-2-s1.binance.org:8545')
        const result: { txId: string } = await new Promise((resolve, reject) => {
            client.eth.sendSignedTransaction(txData)
                .once('transactionHash', txId => resolve({ txId }))
                .on('error', e => reject(new Error(`Unable to broadcast transaction due to ${e.message}.`)))
        })
        return result
    }
    it('should test valid transaction BSC data', async () => {
        const body = new TransferBscBep20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.currency = Currency.BSC
        body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        const txData = await prepareBscOrBep20SignedTransaction(body)
        expect(txData).toContain('0x')

        console.log(await broadcast(txData))
    })

    it('should test valid transaction ERC20 data', async () => {
        const body = new TransferBscBep20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.currency = Currency.BADA
        body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        const txData = await prepareBscOrBep20SignedTransaction(body)
        expect(txData).toContain('0x')

        console.log(await broadcast(txData))
    })

    it('should test valid custom transaction ERC20 data', async () => {
        const body = new TransferErc20();
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.contractAddress = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.digits = 10
        const txData = await prepareCustomBep20SignedTransaction(body)
        expect(txData).toContain('0x')

        console.log(await broadcast(txData))
    })

    it('should test valid custom deployment ERC20', async () => {
        const body = new DeployErc20()
        body.fromPrivateKey = '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564'
        body.symbol = 'SYMBOL'
        body.name = 'Test_ERC20'
        body.supply = '100'
        body.address = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.digits = 10
        const txData = await prepareDeployBep20SignedTransaction(body)
        expect(txData).toContain('0x')

        console.log(await broadcast(txData))
    })

    it('should test invalid custom deployment ERC20, missing supply', async () => {
        const body = new DeployErc20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.symbol = 'SYMBOL'
        body.name = 'Test_ERC20'
        body.address = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.digits = 10
        try {
            await prepareDeployBep20SignedTransaction(body)
            fail('Validation did not pass.')
        } catch (e) {
            console.error(e)
        }
    })

    it('should test invalid custom transaction ERC20 data, missing digits', async () => {
        const body = new TransferErc20();
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.contractAddress = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        try {
            await prepareCustomBep20SignedTransaction(body)
            fail('Validation did not pass.')
        } catch (e) {
            console.error(e)
        }
    })

    it('should not test valid transaction data, missing currency', async () => {
        const body = new TransferBscBep20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        try {
            await prepareBscOrBep20SignedTransaction(body)
            fail('Validation did not pass.')
        } catch (e) {
            console.error(e)
        }
    })

    it('should test ethGetGasPriceInWei', async () => {
        const gasPrice = await bscGetGasPriceInWei()
        expect(gasPrice).not.toBeNull()
    })

    it('should test read smart contract method invocation', async () => {
        const result = await sendBscSmartContractReadMethodInvocationTransaction({
            contractAddress: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
            methodName: 'balanceOf',
            methodABI: {
                constant: true,
                inputs: [
                    {
                        name: 'owner',
                        type: 'address',
                    },
                ],
                name: 'balanceOf',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            params: ['0x9ac64cc6e4415144c455bd8e4837fea55603e5c3'],
        }, 'https://data-seed-prebsc-2-s1.binance.org:8545')
        console.log(result)
        expect(result).not.toBeNull()
    })

    it('should test write smart contract method invocation', async () => {
        const result = await sendBscSmartContractMethodInvocationTransaction({
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            contractAddress: '0xd7d3e5e2174b530fdfb6d680c07c8b34495e2195',
            fee: { gasLimit: '40000', gasPrice: '200' },
            methodName: 'transferFrom',
            methodABI: {
                constant: false,
                inputs: [
                    {
                        name: 'from',
                        type: 'address',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                    },
                ],
                name: 'transferFrom',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            params: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x8c76887d2e738371bd750362fb55887343472346', '1'],
        })
        expect(result).not.toBeNull()
    })

    it('should test bep 721 mint transaction', async () => {
        try {
            const tokenId = new Date().getTime().toString()
            const mintedToken = await sendMintBep721Transaction({
                to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
                tokenId,
                url: 'https://www.seznam.cz',
                fromPrivateKey: '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564',
                chain: Currency.BSC,
                contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85'
            })
            console.log(tokenId)
            expect(mintedToken).not.toBeNull()
        } catch (e) {
            console.log(e)
        }
    })

    it('should test bep 721 mint multiple transaction', async () => {
        const firstTokenId = new Date().getTime()
        const secondTokenId = firstTokenId + 1
        const mintedTokens = await sendMintMultipleBep721Transaction({
            to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
            tokenId: [firstTokenId.toString(), secondTokenId.toString()],
            url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.BSC,
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
            fee: {
                gasLimit: '50000',
                gasPrice: '100'
            }
        })
        expect(mintedTokens).not.toBeNull()
    })

    it('should test bep 721 burn transaction', async () => {
        const burnBep721Token = await sendBurnBep721Transaction({
            tokenId: '1615552558810',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.BSC,
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
            fee: {
                gasLimit: '5000000',
                gasPrice: '110'
            },
        })
        expect(burnBep721Token).not.toBeNull()
    })

    it('should test bep 721 send transaction', async () => {
        const sendBep721Token = await sendBep721Transaction({
            to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
            tokenId: '1615546122766',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.BSC,
            contractAddress: '0x687422eEA2cB73B5d3e242bA5456b782919AFc85',
            fee: {
                gasLimit: '5000000',
                gasPrice: '100'
            }
        })
        expect(sendBep721Token).not.toBeNull()
    })

    it('should test bep 721 deploy transaction', async () => {
        const deployBep721Token = await sendDeployBep721Transaction({
            symbol: '1oido3id3',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.BSC,
            name: '2123kd',
        })
        expect(deployBep721Token).not.toBeNull()
    })

    // BEP-721 Provenance
    it('should test bep 721 deploy transaction', async () => {
        const deployBep721Token = await prepareBscDeployBep721SignedTransaction({
            symbol: 'test123',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.BSC,
            name: 'test123',
            provenance: true,
        })
        console.log(deployBep721Token)
        expect(deployBep721Token).not.toBeNull()
    })
    it('should test bep 721 mint transaction', async () => {
        try {
            const mintedToken = await prepareBscMintBep721ProvenanceSignedTransaction({
                to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
                tokenId: '100',
                url: 'https://www.seznam.cz',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                chain: Currency.BSC,
                contractAddress: '0x5ef08fba01e8d80ff18f4d98e31a43fbb01e7f8a'
            })
            console.log(mintedToken)
            expect(mintedToken).not.toBeNull()
        } catch (e) {
            console.log(e)
        }
    })
    it('should test bep 721 mint multiple provenance token with cashback transaction', async () => {
        const firstTokenId = new Date().getTime()
        const secondTokenId = firstTokenId + 1
        const thirdTokenId = firstTokenId + 2
        const mintedTokens = await prepareBscMintMultipleBep721ProvenanceSignedTransaction({
            to: ['0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF', '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF', '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF'],
            tokenId: [firstTokenId.toString(), secondTokenId.toString(), thirdTokenId.toString()],
            url: ['https://www.seznam.cz', 'https://www.seznam.cz', 'https://www.seznam.cz'],
            cashbackValues: [['3'], ['4'], ['5']],
            authorAddresses: [['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be'], ['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be'], ['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be']],
            fixedValues: [['10'], ['10'], ['10']],
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.BSC,
            contractAddress: '0x5ef08fba01e8d80ff18f4d98e31a43fbb01e7f8a',
        })
        console.log(mintedTokens)
        expect(mintedTokens).not.toBeNull()
    })
    it('should test bep 721 provenance send transaction', async () => {
        const sendBep721Token = await prepareBscTransferBep721SignedTransaction({
            to: '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF',
            tokenId: '100',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.BSC,
            provenanceData: "send token X",
            tokenPrice: "123",
            provenance: true,
            contractAddress: '0x5ef08fba01e8d80ff18f4d98e31a43fbb01e7f8a',
        })
        expect(sendBep721Token).not.toBeNull()
    })
    it('should test valid transfer data 721 transaction', async () => {
        const body = new SmartContractReadMethodInvocation()
        body.contractAddress = '0x5ef08fba01e8d80ff18f4d98e31a43fbb01e7f8a'
        body.params = ['10']
        body.methodName = 'getTokenData'
        body.methodABI = erc721Provenance_abi.find((a: any) => a.name === 'getTokenData')
        const response = await sendBscSmartContractReadMethodInvocationTransaction(body);
        // @ts-ignore
        console.log(JSON.stringify(response))
    })


})
