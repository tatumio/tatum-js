import Web3 from 'web3';
import {CreateRecord, Currency, DeployErc20, TransferErc20} from '../model';
import {
    polygonGetGasPriceInWei,
    preparePolygonBurnErc721SignedTransaction,
    preparePolygonDeployErc20SignedTransaction,
    preparePolygonDeployErc721SignedTransaction,
    preparePolygonMintErc721SignedTransaction,
    preparePolygonMintMultipleErc721SignedTransaction,
    preparePolygonSignedTransaction,
    preparePolygonSmartContractWriteMethodInvocation,
    preparePolygonStoreDataTransaction,
    preparePolygonTransferErc20SignedTransaction,
    preparePolygonTransferErc721SignedTransaction,
    sendPolygonSmartContractReadMethodInvocationTransaction
} from './polygon';

describe('MATIC transactions', () => {
    jest.setTimeout(19999)
    const broadcast = async (txData: string) => {
        const client = new Web3('https://matic-mumbai.chainstacklabs.com/')
        return await new Promise((resolve, reject) => {
            client.eth.sendSignedTransaction(txData)
                .once('transactionHash', txId => resolve({txId}))
                .on('error', e => reject(new Error(`Unable to broadcast transaction due to ${e.message}.`)))
        })
    }

    describe('MATIC common transactions', () => {
        it('should test valid transaction MATIC data', async () => {
            const body = new TransferErc20();
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            body.amount = '0.0001';
            body.currency = Currency.MATIC;
            body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9';
            const txData = await preparePolygonSignedTransaction(true, body, 'https://matic-mumbai.chainstacklabs.com/');
            expect(txData).toContain('0x');

            console.log(await broadcast(txData));
        })

        it('should test valid transaction MATIC store data', async () => {
            const body = new CreateRecord();
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29';
            body.data = 'Hello hi';
            body.chain = Currency.MATIC;
            const txData = await preparePolygonStoreDataTransaction(true, body, 'https://matic-mumbai.chainstacklabs.com/');
            expect(txData).toContain('0x');

            console.log(await broadcast(txData));
        });

        it('should test ethGetGasPriceInWei', async () => {
            const gasPrice = await polygonGetGasPriceInWei();
            expect(gasPrice).not.toBeNull();
        });

        it('should test read smart contract method invocation', async () => {
            const result = await sendPolygonSmartContractReadMethodInvocationTransaction(true, {
                contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
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
            }, 'https://matic-mumbai.chainstacklabs.com/')
            console.log(result)
            expect(result).not.toBeNull()
        })

        it('should test write smart contract method invocation', async () => {
            const result = await preparePolygonSmartContractWriteMethodInvocation(true, {
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
                fee: {gasLimit: '100000', gasPrice: '3'},
                methodName: 'transfer',
                methodABI: {
                    constant: false,
                    inputs: [
                        {
                            name: 'to',
                            type: 'address',
                        },
                        {
                            name: 'value',
                            type: 'uint256',
                        },
                    ],
                    name: 'transfer',
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
                params: ['0x8c76887d2e738371bd750362fb55887343472346', '1'],
            }, 'https://matic-mumbai.chainstacklabs.com/')
            expect(result).not.toBeNull()
            console.log(await broadcast(result))
        })
    })

    describe('MATIC ERC20 transactions', () => {
        it('should test valid custom transaction ERC20 data', async () => {
            const body = new TransferErc20();
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
            body.amount = '10'
            body.contractAddress = '0x0b9808fce74030c87aae334a30f6c8f6c66b090d'
            body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
            body.digits = 10
            const txData = await preparePolygonTransferErc20SignedTransaction(true, body, 'https://matic-mumbai.chainstacklabs.com/')
            expect(txData).toContain('0x')

            console.log(await broadcast(txData))
        })

        it('should test valid custom deployment ERC20', async () => {
            const body = new DeployErc20()
            body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
            body.symbol = 'SYMBOL'
            body.name = 'Test_ERC20'
            body.supply = '100'
            body.address = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
            body.digits = 10
            const txData = await preparePolygonDeployErc20SignedTransaction(true, body, 'https://matic-mumbai.chainstacklabs.com/')
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
                await preparePolygonDeployErc20SignedTransaction(true, body, 'https://matic-mumbai.chainstacklabs.com/')
                fail('Validation did not pass.')
            } catch (e) {
                console.error(e)
            }
        })
    })

    describe('MATIC 721 transactions', () => {

        it('should test 721 deploy transaction', async () => {
            const deployBep721Token = await preparePolygonDeployErc721SignedTransaction(true, {
                symbol: '1oido3id3',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                chain: Currency.MATIC,
                name: '2123kd',
            }, 'https://matic-mumbai.chainstacklabs.com/')
            expect(deployBep721Token).not.toBeNull()
            console.log(await broadcast(deployBep721Token))
        })

        it('should test 721 mint transaction', async () => {
            try {
                const tokenId = new Date().getTime().toString()
                const mintedToken = await preparePolygonMintErc721SignedTransaction(true, {
                    to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
                    tokenId,
                    url: 'https://www.seznam.cz',
                    fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                    chain: Currency.MATIC,
                    contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a'
                }, 'https://matic-mumbai.chainstacklabs.com/')
                console.log(tokenId)
                expect(mintedToken).not.toBeNull()
                console.log(await broadcast(mintedToken))
            } catch (e) {
                console.log(e)
            }
        })

        it('should test 721 mint multiple transaction', async () => {
            const firstTokenId = new Date().getTime()
            const secondTokenId = firstTokenId + 1
            const mintedTokens = await preparePolygonMintMultipleErc721SignedTransaction(true, {
                to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
                tokenId: [firstTokenId.toString(), secondTokenId.toString()],
                url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                chain: Currency.MATIC,
                contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a'
            }, 'https://matic-mumbai.chainstacklabs.com/')
            expect(mintedTokens).not.toBeNull()
            console.log(await broadcast(mintedTokens))
        })

        it('should test 721 burn transaction', async () => {
            const burnBep721Token = await preparePolygonBurnErc721SignedTransaction(true, {
                tokenId: '1626437687633',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                chain: Currency.MATIC,
                contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a'
            }, 'https://matic-mumbai.chainstacklabs.com/')
            expect(burnBep721Token).not.toBeNull()
            console.log(await broadcast(burnBep721Token))
        })

        it('should test 721 send transaction', async () => {
            const sendBep721Token = await preparePolygonTransferErc721SignedTransaction(true, {
                to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
                tokenId: '1626437745973',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                chain: Currency.MATIC,
                contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a'
            }, 'https://matic-mumbai.chainstacklabs.com/')
            expect(sendBep721Token).not.toBeNull()
            console.log(await broadcast(sendBep721Token))
        })
    })

})
