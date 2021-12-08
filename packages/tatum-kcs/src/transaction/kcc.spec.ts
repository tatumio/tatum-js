import { CreateRecord, Currency, DeployErc20, TransferErc20 } from '@tatumio/tatum-core'
import Web3 from 'web3'
import {
  kccGetGasPriceInWei,
  prepareKccBurnErc721SignedTransaction,
  prepareKccDeployErc20SignedTransaction,
  prepareKccDeployErc721SignedTransaction,
  prepareKccMintErc721SignedTransaction,
  prepareKccMintMultipleErc721SignedTransaction,
  prepareKccSignedTransaction,
  prepareKccSmartContractWriteMethodInvocation,
  prepareKccStoreDataTransaction,
  prepareKccTransferErc20SignedTransaction,
  prepareKccTransferErc721SignedTransaction,
  sendKccSmartContractReadMethodInvocationTransaction,
} from './kcc'

describe('KCS transactions', () => {
  jest.setTimeout(19999)
  const broadcast = async (txData: string) => {
    const client = new Web3('https://rpc-testnet.kcc.network')
    return await new Promise((resolve, reject) => {
      client.eth
        .sendSignedTransaction(txData)
        .once('transactionHash', (txId) => resolve({ txId }))
        .on('error', (e) => reject(new Error(`Unable to broadcast transaction due to ${e.message}.`)))
    })
  }

  describe('KCS common transactions', () => {
    it('should test valid transaction KCS data', async () => {
      const body = new TransferErc20()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.amount = '0.0001'
      body.currency = Currency.KCS
      body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      const txData = await prepareKccSignedTransaction(body, 'https://rpc-testnet.kcc.network')
      expect(txData).toContain('0x')

      console.log(await broadcast(txData))
    })

    it('should test valid transaction KCS store data', async () => {
      const body = new CreateRecord()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.data = 'Hello hi'
      body.chain = Currency.KCS
      const txData = await prepareKccStoreDataTransaction(body, 'https://rpc-testnet.kcc.network')
      expect(txData).toContain('0x')

      console.log(await broadcast(txData))
    })

    it('should test ethGetGasPriceInWei', async () => {
      const gasPrice = await kccGetGasPriceInWei()
      expect(gasPrice).not.toBeNull()
    })

    it('should test read smart contract method invocation', async () => {
      const result = await sendKccSmartContractReadMethodInvocationTransaction(
        {
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
        },
        'https://rpc-testnet.kcc.network'
      )
      console.log(result)
      expect(result).not.toBeNull()
    })

    it('should test write smart contract method invocation', async () => {
      const result = await prepareKccSmartContractWriteMethodInvocation(
        {
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0x0b9808fce74030c87aae334a30f6c8f6c66b090d',
          fee: { gasLimit: '100000', gasPrice: '3' },
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
        },
        { provider: 'https://rpc-testnet.kcc.network' }
      )
      expect(result).not.toBeNull()
      console.log(await broadcast(result))
    })
  })

  describe('KCS ERC20 transactions', () => {
    it('should test valid custom transaction ERC20 data', async () => {
      const body = new TransferErc20()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.amount = '10'
      body.contractAddress = '0x0b9808fce74030c87aae334a30f6c8f6c66b090d'
      body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      body.digits = 10
      const txData = await prepareKccTransferErc20SignedTransaction(body, 'https://rpc-testnet.kcc.network')
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
      const txData = await prepareKccDeployErc20SignedTransaction(body, 'https://rpc-testnet.kcc.network')
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
        await prepareKccDeployErc20SignedTransaction(body, 'https://rpc-testnet.kcc.network')
        fail('Validation did not pass.')
      } catch (e) {
        console.error(e)
      }
    })
  })

  describe('KCS 721 transactions', () => {
    it('should test 721 deploy transaction', async () => {
      const deployBep721Token = await prepareKccDeployErc721SignedTransaction(
        {
          symbol: '1oido3id3',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          name: '2123kd',
        },
        'https://rpc-testnet.kcc.network'
      )
      expect(deployBep721Token).not.toBeNull()
      console.log(await broadcast(deployBep721Token))
    })

    it('should test 721 mint transaction', async () => {
      try {
        const tokenId = new Date().getTime().toString()
        const mintedToken = await prepareKccMintErc721SignedTransaction(
          {
            to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
            tokenId,
            url: 'https://www.seznam.cz',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
          },
          'https://rpc-testnet.kcc.network'
        )
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
      const mintedTokens = await prepareKccMintMultipleErc721SignedTransaction(
        {
          to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
          tokenId: [firstTokenId.toString(), secondTokenId.toString()],
          url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
        },
        'https://rpc-testnet.kcc.network'
      )
      expect(mintedTokens).not.toBeNull()
      console.log(await broadcast(mintedTokens))
    })

    it('should test 721 burn transaction', async () => {
      const burnBep721Token = await prepareKccBurnErc721SignedTransaction(
        {
          tokenId: '1626437687633',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
        },
        'https://rpc-testnet.kcc.network'
      )
      expect(burnBep721Token).not.toBeNull()
      console.log(await broadcast(burnBep721Token))
    })

    it('should test 721 send transaction', async () => {
      const sendBep721Token = await prepareKccTransferErc721SignedTransaction(
        {
          to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
          tokenId: '1626437745973',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
        },
        'https://rpc-testnet.kcc.network'
      )
      expect(sendBep721Token).not.toBeNull()
      console.log(await broadcast(sendBep721Token))
    })
  })
})
