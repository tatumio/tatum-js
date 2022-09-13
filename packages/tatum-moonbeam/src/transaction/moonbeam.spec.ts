import {
  CreateRecord,
  Currency,
  DeployErc20,
  erc721Provenance_abi,
  SmartContractReadMethodInvocation,
  TransferErc20,
} from '@tatumio/tatum-core'
import Web3 from 'web3'
import {
  getGasPriceInWei,
  prepareBurnErc721SignedTransaction,
  prepareDeployErc20SignedTransaction,
  prepareDeployErc721SignedTransaction,
  prepareMintErc721ProvenanceSignedTransaction,
  prepareMintErc721SignedTransaction,
  prepareMintMultipleErc721ProvenanceSignedTransaction,
  prepareMintMultipleErc721SignedTransaction,
  prepareSignedTransaction,
  prepareSmartContractWriteMethodInvocation,
  prepareStoreDataTransaction,
  prepareTransferErc20SignedTransaction,
  prepareTransferErc721SignedTransaction,
  sendMoonbeamSmartContractReadMethodInvocationTransaction,
} from './moonbeam'

const PROVIDER = 'https://moonbeam-alpha.api.onfinality.io/public'

describe('GLMR transactions', () => {
  jest.setTimeout(99999)
  const broadcast = async (txData: string) => {
    const client = new Web3(PROVIDER)
    return await new Promise((resolve, reject) => {
      client.eth
        .sendSignedTransaction(txData)
        .once('transactionHash', (txId) => resolve({ txId }))
        .on('error', (e) => reject(new Error(`Unable to broadcast transaction due to ${e.message}.`)))
    })
  }

  describe('GLMR common transactions', () => {
    it('should test valid transaction GLMR data', async () => {
      const body = new TransferErc20()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.amount = '0.0001'
      body.currency = Currency.GLMR
      body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      const txData = await prepareSignedTransaction(body, PROVIDER)
      expect(txData).toContain('0x')

      console.log(await broadcast(txData))
    })

    it('should test valid transaction GLMR store data', async () => {
      const body = new CreateRecord()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.data = 'Hello hi'
      body.chain = Currency.GLMR
      const txData = await prepareStoreDataTransaction(body, PROVIDER)
      expect(txData).toContain('0x')

      console.log(await broadcast(txData))
    })

    it('should test ethGetGasPriceInWei', async () => {
      const gasPrice = await getGasPriceInWei()
      expect(gasPrice).not.toBeNull()
    })

    it('should test read smart contract method invocation', async () => {
      const result = await sendMoonbeamSmartContractReadMethodInvocationTransaction(
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
        PROVIDER
      )
      console.log(result)
      expect(result).not.toBeNull()
    })

    it('should test write smart contract method invocation', async () => {
      const result = await prepareSmartContractWriteMethodInvocation(
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
        { provider: PROVIDER }
      )
      expect(result).not.toBeNull()
      console.log(await broadcast(result))
    })
  })

  describe('GLMR ERC20 transactions', () => {
    it('should test valid custom transaction ERC20 data', async () => {
      const body = new TransferErc20()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.amount = '10'
      body.contractAddress = '0x0b9808fce74030c87aae334a30f6c8f6c66b090d'
      body.to = '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'
      body.digits = 10
      const txData = await prepareTransferErc20SignedTransaction(body, PROVIDER)
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
      const txData = await prepareDeployErc20SignedTransaction(body, PROVIDER)
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
        await prepareDeployErc20SignedTransaction(body, PROVIDER)
        fail('Validation did not pass.')
      } catch (e) {
        console.error(e)
      }
    })
  })

  describe('GLMR 721 transactions', () => {
    it('should test 721 deploy transaction', async () => {
      const deployBep721Token = await prepareDeployErc721SignedTransaction(
        {
          symbol: '1oido3id3',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          name: '2123kd',
        },
        PROVIDER
      )
      expect(deployBep721Token).not.toBeNull()
      console.log(await broadcast(deployBep721Token))
    })

    it('should test 721 mint transaction', async () => {
      try {
        const tokenId = new Date().getTime().toString()
        const mintedToken = await prepareMintErc721SignedTransaction(
          {
            to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
            tokenId,
            url: 'https://www.seznam.cz',
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
          },
          PROVIDER
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
      const mintedTokens = await prepareMintMultipleErc721SignedTransaction(
        {
          to: ['0x811dfbff13adfbc3cf653dcc373c03616d3471c9', '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'],
          tokenId: [firstTokenId.toString(), secondTokenId.toString()],
          url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
        },
        PROVIDER
      )
      expect(mintedTokens).not.toBeNull()
      console.log(await broadcast(mintedTokens))
    })

    it('should test 721 burn transaction', async () => {
      const burnBep721Token = await prepareBurnErc721SignedTransaction(
        {
          tokenId: '1626437687633',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
        },
        PROVIDER
      )
      expect(burnBep721Token).not.toBeNull()
      console.log(await broadcast(burnBep721Token))
    })

    it('should test 721 send transaction', async () => {
      const sendBep721Token = await prepareTransferErc721SignedTransaction(
        {
          to: '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
          tokenId: '1626437745973',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
        },
        PROVIDER
      )
      expect(sendBep721Token).not.toBeNull()
      console.log(await broadcast(sendBep721Token))
    })
  })
  describe('GLMR 721 provenance transactions', () => {
    it('should test 721 deploy transaction', async () => {
      const deployBep721Token = await prepareDeployErc721SignedTransaction(
        {
          symbol: '1oido3id3',
          fromPrivateKey: '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564',
          provenance: true,
          name: '2123kd',
        },
        PROVIDER
      )
      expect(deployBep721Token).not.toBeNull()
      console.log(await broadcast(deployBep721Token))
    })
    it('should test 721 provenance mint transaction', async () => {
      try {
        const tokenId = new Date().getTime().toString()
        const mintedToken = await prepareMintErc721ProvenanceSignedTransaction(
          {
            to: '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF',
            tokenId,
            url: 'https://www.seznam.cz',
            fromPrivateKey: '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564',
            contractAddress: '0x8D2A0dd3855ECA8591756a606DA9829f703cA26B',
          },
          PROVIDER
        )
        console.log(tokenId)
        expect(mintedToken).not.toBeNull()
        console.log(await broadcast(mintedToken))
      } catch (e) {
        console.log(e)
      }
    })
    it('should test 721 provenance mint with cashback transaction', async () => {
      try {
        const mintedToken = await prepareMintErc721ProvenanceSignedTransaction(
          {
            to: '0x80D8BAc9a6901698b3749Fe336bBd1385C1f98f2',
            tokenId: '12',
            url: 'https://www.seznam.cz',
            fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
            authorAddresses: ['0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF'],
            cashbackValues: ['2'],
            fixedValues: ['0.01'],
            contractAddress: '0x44ef7a380c34E76a39Cb00410956dE2aeeaf3B1B',
          },
          PROVIDER
        )
        expect(mintedToken).not.toBeNull()
        console.log(await broadcast(mintedToken))
      } catch (e) {
        console.log(e)
      }
    })
    it('should test 721 mint multiple with cashback transaction', async () => {
      const mintedTokens = await prepareMintMultipleErc721ProvenanceSignedTransaction(
        {
          to: ['0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF', '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF'],
          tokenId: ['5', '6'],
          url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
          authorAddresses: [['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be'], ['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be']],
          cashbackValues: [['1'], ['1']],
          fixedValues: [['1'], ['1']],
          fromPrivateKey: '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564',
          contractAddress: '0xe54a147b6ebe25bda0eec07e8a0051c1b9d08338',
        },
        PROVIDER
      )
      expect(mintedTokens).not.toBeNull()
      console.log(await broadcast(mintedTokens))
    })
    it('should test 721 send transaction', async () => {
      const senderc721Token = await prepareTransferErc721SignedTransaction(
        {
          to: '0xD25031B1aB4D82e5fDFb700234b2a22e272232Be',
          tokenId: '12',
          fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
          provenance: true,
          provenanceData: 'testMatic',
          tokenPrice: '1.5',
          value: '2',
          fee: {
            gasLimit: '1200000',
            gasPrice: '3',
          },
          contractAddress: '0x44ef7a380c34E76a39Cb00410956dE2aeeaf3B1B',
        },
        PROVIDER
      )
      console.log(senderc721Token)
      expect(senderc721Token).not.toBeNull()
      console.log(await broadcast(senderc721Token))
    })
    it('should test valid transfer data 721 transaction', async () => {
      const body = new SmartContractReadMethodInvocation()
      body.contractAddress = '0xe54a147b6ebe25bda0eec07e8a0051c1b9d08338'
      body.params = ['1634501273645']
      body.methodName = 'getTokenData'
      body.methodABI = erc721Provenance_abi.find((a) => a.name === 'getTokenData')
      const response = await sendMoonbeamSmartContractReadMethodInvocationTransaction(body, PROVIDER)
      // @ts-ignore
      console.log(JSON.stringify(response))
    })
    it('should test 721 burn transaction', async () => {
      const burnBep721Token = await prepareBurnErc721SignedTransaction(
        {
          tokenId: '5',
          fromPrivateKey: '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564',
          contractAddress: '0xe54a147b6ebe25bda0eec07e8a0051c1b9d08338',
        },
        PROVIDER
      )
      expect(burnBep721Token).not.toBeNull()
      // console.log(await broadcast(burnBep721Token))
    })
  })
})