import Web3 from 'web3'
import {Currency, DeployErc20, TransferCustomErc20, TransferErc20} from '../model'
import {
    prepareXdcCustomErc20SignedTransaction,
    prepareXdcDeployErc20SignedTransaction,
    prepareXdcOrErc20SignedTransaction,
    sendXdcBurnErc721Transaction,
    sendXdcDeployErc721Transaction,
    sendXdcErc721Transaction,
    sendXdcMintErc721Transaction,
    sendXdcMintMultipleErc721Transaction,
    sendXdcSmartContractMethodInvocationTransaction,
    sendXdcSmartContractReadMethodInvocationTransaction,
    xdcGetGasPriceInWei
} from './xdc'

describe('XDC transactions', () => {
    jest.setTimeout(19999)
    const providerAddr = 'https://rpc.apothem.network/'
    const broadcast = async (txData: string) => {
        const client = new Web3(providerAddr)
        const result: { txId: string } = await new Promise((resolve, reject) => {
            client.eth.sendSignedTransaction(txData)
                .once('transactionHash', txId => resolve({txId}))
                .on('error', e => reject(new Error(`Unable to broadcast transaction due to ${e.message}.`)))
        })
        return result
    }

    it('should test valid transaction XDC data', async () => {
        const body = new TransferErc20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.to = 'xdc811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        const txData = await prepareXdcOrErc20SignedTransaction(body)
        expect(txData).toContain('0x')

        // console.log(await broadcast(txData));
    })

    it('should test valid transaction ERC20 data', async () => {
        const body = new TransferErc20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.to = 'xdc811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        const txData = await prepareXdcOrErc20SignedTransaction(body)
        expect(txData).toContain('0x')

        // console.log(await broadcast(txData));
    })

    it('should test valid custom transaction ERC20 data', async () => {
        const body = new TransferCustomErc20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.contractAddress = 'xdc811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.to = 'xdc811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.digits = 10
        const txData = await prepareXdcCustomErc20SignedTransaction(body)
        expect(txData).toContain('0x')

        // console.log(await broadcast(txData));
    })

    it('should test valid custom deployment ERC20', async () => {
        const body = new DeployErc20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.symbol = 'SYMBOL'
        body.name = 'Test_ERC20'
        body.supply = '100'
        body.address = 'xdc811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.digits = 10
        const txData = await prepareXdcDeployErc20SignedTransaction(body)
        expect(txData).toContain('0x')

        // console.log(await broadcast(txData));
    })

    it('should test invalid custom deployment ERC20, missing supply', async () => {
        const body = new DeployErc20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.symbol = 'SYMBOL'
        body.name = 'Test_ERC20'
        body.address = 'xdc811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.digits = 10
        try {
            await prepareXdcDeployErc20SignedTransaction(body)
            fail('Validation did not pass.')
        } catch (e) {
            console.error(e)
        }
    })

    it('should test invalid custom transaction ERC20 data, missing digits', async () => {
        const body = new TransferCustomErc20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.contractAddress = 'xdc811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        body.to = 'xdc811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        try {
            await prepareXdcCustomErc20SignedTransaction(body)
            fail('Validation did not pass.')
        } catch (e) {
            console.error(e)
        }
    })

    it('should not test valid transaction data, missing currency', async () => {
        const body = new TransferErc20()
        body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
        body.amount = '0'
        body.to = 'xdc811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
        try {
            await prepareXdcOrErc20SignedTransaction(body)
            fail('Validation did not pass.')
        } catch (e) {
            console.error(e)
        }
    })

    it('should test ethGetGasPriceInWei', async () => {
        const gasPrice = await xdcGetGasPriceInWei()
        expect(gasPrice).not.toBeNull()
    })

    it('should test read smart contract method invocation', async () => {
        const result = await sendXdcSmartContractReadMethodInvocationTransaction({
            contractAddress: 'xdc595bad1621784e9b0161d909be0117f17a5d37ca',
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
            params: ['xdc8c76887d2e738371bd750362fb55887343472346'],
        })
        console.log(result)
        expect(result).not.toBeNull()
    })

    it('should test write smart contract method invocation', async () => {
        const result = await sendXdcSmartContractMethodInvocationTransaction({
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            contractAddress: 'xdcd7d3e5e2174b530fdfb6d680c07c8b34495e2195',
            fee: {gasLimit: '40000', gasPrice: '200'},
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
            params: ['xdc811dfbff13adfbc3cf653dcc373c03616d3471c9', 'xdc8c76887d2e738371bd750362fb55887343472346', '1'],
        })
        expect(result).not.toBeNull()
    })

    it('should test ERC 721 mint transaction', async () => {
        try {
            const tokenId = new Date().getTime().toString()
            const mintedToken = await sendXdcMintErc721Transaction({
                to: 'xdc811dfbff13adfbc3cf653dcc373c03616d3471c9',
                tokenId,
                url: 'https://www.seznam.cz',
                fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
                chain: Currency.XDC,
                contractAddress: 'xdc687422eEA2cB73B5d3e242bA5456b782919AFc85',
                fee: {
                    gasLimit: '50000',
                    gasPrice: '110'
                }
            })
            console.log(tokenId)
            expect(mintedToken).not.toBeNull()
        } catch (e) {
            console.log(e)
        }
    })

    it('should test ERC 721 mint multiple transaction', async () => {
        const firstTokenId = new Date().getTime()
        const secondTokenId = firstTokenId + 1
        const mintedTokens = await sendXdcMintMultipleErc721Transaction({
            to: ['xdc811dfbff13adfbc3cf653dcc373c03616d3471c9', 'xdc811dfbff13adfbc3cf653dcc373c03616d3471c9'],
            tokenId: [firstTokenId.toString(), secondTokenId.toString()],
            url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.XDC,
            contractAddress: 'xdc687422eEA2cB73B5d3e242bA5456b782919AFc85',
            fee: {
                gasLimit: '50000',
                gasPrice: '100'
            }
        })
        expect(mintedTokens).not.toBeNull()
    })

    it('should test ERC 721 burn transaction', async () => {
        const burnErc721Token = await sendXdcBurnErc721Transaction({
            tokenId: '1615552558810',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.XDC,
            contractAddress: 'xdc687422eEA2cB73B5d3e242bA5456b782919AFc85',
            fee: {
                gasLimit: '5000000',
                gasPrice: '110'
            },
        })
        expect(burnErc721Token).not.toBeNull()
    })

    it('should test ERC 721 send transaction', async () => {
        const sendErc721Token = await sendXdcErc721Transaction({
            to: 'xdc811dfbff13adfbc3cf653dcc373c03616d3471c9',
            tokenId: '1615546122766',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.XDC,
            contractAddress: 'xdc687422eEA2cB73B5d3e242bA5456b782919AFc85',
            fee: {
                gasLimit: '5000000',
                gasPrice: '100'
            }
        })
        expect(sendErc721Token).not.toBeNull()
    })

    it('should test ERC 721 deploy transaction', async () => {
        const deployErc721Token = await sendXdcDeployErc721Transaction({
            symbol: '1oido3id3',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            chain: Currency.XDC,
            name: '2123kd',
        })
        expect(deployErc721Token).not.toBeNull()
    })

})
