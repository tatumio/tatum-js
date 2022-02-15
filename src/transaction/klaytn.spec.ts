import Web3 from 'web3';
import erc721Provenance_abi from '../contracts/erc721Provenance/erc721Provenance_abi';
import { CreateRecord, Currency, DeployErc20, SmartContractReadMethodInvocation, TransferErc20 } from '../model';
import {
  prepareKlaytnBurnErc721SignedTransaction,
  prepareKlaytnDeployErc20SignedTransaction,
  prepareKlaytnDeployErc721SignedTransaction,
  prepareKlaytnMintErc721ProvenanceSignedTransaction,
  prepareKlaytnMintErc721SignedTransaction,
  prepareKlaytnMintMultipleErc721ProvenanceSignedTransaction,
  prepareKlaytnMintMultipleErc721SignedTransaction,
  prepareKlaytnSignedTransaction,
  prepareKlaytnSmartContractWriteMethodInvocation,
  prepareKlaytnStoreDataTransaction,
  prepareKlaytnTransferErc20SignedTransaction,
  prepareKlaytnTransferErc721SignedTransaction,
  sendKlaytnSmartContractReadMethodInvocationTransaction,
} from './klaytn';

describe('KLAY transactions', () => {
  jest.setTimeout(99999)
  const broadcast = async (txData: string) => {
    const client = new Web3('https://api.baobab.klaytn.net:8651/')
    return await new Promise((resolve, reject) => {
      client.eth.sendSignedTransaction(txData)
        .once('transactionHash', txId => resolve({ txId }))
        .on('error', e => reject(new Error(`Unable to broadcast transaction due to ${e.message}.`)))
    })
  }

  describe('KLAY common transactions', () => {
    it('should test valid transaction KLAY data', async () => {
      const body = new TransferErc20();
      body.fromPrivateKey = '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c';
      body.amount = '0.0001';
      body.currency = Currency.KLAY;
      body.to = '0xf7a771bb9f013381f388abe12b38e3634c4a8f89';
      const txData = await prepareKlaytnSignedTransaction(true, body, 'https://api.baobab.klaytn.net:8651/');
      expect(txData).toContain('0x');

      console.log(await broadcast(txData));
    })

    it('should test valid transaction KLAY store data', async () => {
      const body = new CreateRecord();
      body.fromPrivateKey = '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c';
      body.data = 'Hello hi';
      body.chain = Currency.KLAY;
      const txData = await prepareKlaytnStoreDataTransaction(true, body, 'https://api.baobab.klaytn.net:8651/');
      expect(txData).toContain('0x');

      console.log(await broadcast(txData));
    });


    it('should test read smart contract method invocation', async () => {
      const result = await sendKlaytnSmartContractReadMethodInvocationTransaction(true, {
        contractAddress: '0xb506267c2f2976fc6b7e72e5d9d322916c32df98',
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
        params: ['0xf7a771bb9f013381f388abe12b38e3634c4a8f89'],
      }, 'https://api.baobab.klaytn.net:8651/')
      console.log(result)
      expect(result).not.toBeNull()
    })

    it('should test write smart contract method invocation', async () => {
      const result = await prepareKlaytnSmartContractWriteMethodInvocation(true, {
        fromPrivateKey: '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c',
        contractAddress: '0xb506267c2f2976fc6b7e72e5d9d322916c32df98',
        fee: { gasLimit: '100000', gasPrice: '25' },
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
      }, 'https://api.baobab.klaytn.net:8651/')
      expect(result).not.toBeNull()
      console.log(await broadcast(result))
    })
  })

  describe('KLAY ERC20 transactions', () => {
    it('should test valid custom transaction ERC20 data', async () => {
      const body = new TransferErc20();
      body.fromPrivateKey = '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c'
      body.amount = '10'
      body.contractAddress = '0xb506267c2f2976fc6b7e72e5d9d322916c32df98'
      body.to = '0xf7a771bb9f013381f388abe12b38e3634c4a8f89'
      body.digits = 10
      const txData = await prepareKlaytnTransferErc20SignedTransaction(true, body, 'https://api.baobab.klaytn.net:8651/')
      expect(txData).toContain('0x')

      console.log(await broadcast(txData))
    })

    it('should test valid custom deployment ERC20', async () => {
      const body = new DeployErc20()
      body.fromPrivateKey = '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c'
      body.symbol = 'SYMBOL'
      body.name = 'Test_ERC20'
      body.supply = '100'
      body.address = '0xf7a771bb9f013381f388abe12b38e3634c4a8f89'
      body.digits = 10
      const txData = await prepareKlaytnDeployErc20SignedTransaction(true, body, 'https://api.baobab.klaytn.net:8651/')
      expect(txData).toContain('0x')
      console.log(await broadcast(txData))
    })

    it('should test invalid custom deployment ERC20, missing supply', async () => {
      const body = new DeployErc20()
      body.fromPrivateKey = '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c'
      body.symbol = 'SYMBOL'
      body.name = 'Test_ERC20'
      body.address = '0xf7a771bb9f013381f388abe12b38e3634c4a8f89'
      body.digits = 10
      try {
        await prepareKlaytnDeployErc20SignedTransaction(true, body, 'https://api.baobab.klaytn.net:8651/')
        fail('Validation did not pass.')
      } catch (e) {
        console.error(e)
      }
    })
  })

  describe('KLAY 721 transactions', () => {

    it('should test 721 deploy transaction', async () => {
      const deploy721Token = await prepareKlaytnDeployErc721SignedTransaction(true, {
        symbol: '1oido3id3',
        fromPrivateKey: '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c',
        chain: Currency.KLAY,
        name: '2123kd',
      }, 'https://api.baobab.klaytn.net:8651/')
      expect(deploy721Token).not.toBeNull()
      console.log(await broadcast(deploy721Token))
    })

    it('should test 721 mint transaction', async () => {
      try {
        const tokenId = new Date().getTime().toString()
        const mintedToken = await prepareKlaytnMintErc721SignedTransaction(true, {
          to: '0xf7a771bb9f013381f388abe12b38e3634c4a8f89',
          tokenId,
          url: 'https://www.seznam.cz',
          fromPrivateKey: '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c',
          chain: Currency.KLAY,
          contractAddress: '0x989b4b92c81abb963e1dcec5b46ac8a5c9f1431b',
        }, 'https://api.baobab.klaytn.net:8651/')
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
      const mintedTokens = await prepareKlaytnMintMultipleErc721SignedTransaction(true, {
        to: ['0xf7a771bb9f013381f388abe12b38e3634c4a8f89', '0xf7a771bb9f013381f388abe12b38e3634c4a8f89'],
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        fromPrivateKey: '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c',
        chain: Currency.KLAY,
        contractAddress: '0x989b4b92c81abb963e1dcec5b46ac8a5c9f1431b',
      }, 'https://api.baobab.klaytn.net:8651/')
      expect(mintedTokens).not.toBeNull()
      console.log(await broadcast(mintedTokens))
    })

    it('should test 721 burn transaction', async () => {
      const burn721Token = await prepareKlaytnBurnErc721SignedTransaction(true, {
        tokenId: '1626437687633',
        fromPrivateKey: '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c',
        chain: Currency.KLAY,
        contractAddress: '0x989b4b92c81abb963e1dcec5b46ac8a5c9f1431b',
      }, 'https://api.baobab.klaytn.net:8651/')
      expect(burn721Token).not.toBeNull()
      console.log(await broadcast(burn721Token))
    })

    it('should test 721 send transaction', async () => {
      const send721Token = await prepareKlaytnTransferErc721SignedTransaction(true, {
        to: '0xf7a771bb9f013381f388abe12b38e3634c4a8f89',
        tokenId: '1626437745973',
        fromPrivateKey: '0xcf3b62b29d73b94d78a893e3cef81d9020cd2a50c3f9be770ead5824a5faee3c',
        chain: Currency.KLAY,
        contractAddress: '0x989b4b92c81abb963e1dcec5b46ac8a5c9f1431b',
      }, 'https://api.baobab.klaytn.net:8651/')
      expect(send721Token).not.toBeNull()
      console.log(await broadcast(send721Token))
    })
  })
  describe('KLAY 721 provenance transactions', () => {
    it('should test 721 deploy transaction', async () => {
      const deploy721Token = await prepareKlaytnDeployErc721SignedTransaction(true, {
        symbol: '1oido3id3',
        fromPrivateKey: '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564',
        chain: Currency.KLAY,
        provenance: true,
        name: '2123kd',
      }, 'https://api.baobab.klaytn.net:8651/')
      expect(deploy721Token).not.toBeNull()
      console.log(await broadcast(deploy721Token))
    })
    it('should test 721 provenance mint transaction', async () => {
      try {
        const tokenId = new Date().getTime().toString()
        const mintedToken = await prepareKlaytnMintErc721ProvenanceSignedTransaction(true, {
          to: '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF',
          tokenId,
          url: 'https://www.seznam.cz',
          fromPrivateKey: '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564',
          chain: Currency.KLAY,
          contractAddress: '0x8D2A0dd3855ECA8591756a606DA9829f703cA26B',
        }, 'https://api.baobab.klaytn.net:8651/')
        console.log(tokenId)
        expect(mintedToken).not.toBeNull()
        console.log(await broadcast(mintedToken))
      } catch (e) {
        console.log(e)
      }
    })
    it('should test 721 provenance mint with cashback transaction', async () => {
      try {
        const mintedToken = await prepareKlaytnMintErc721ProvenanceSignedTransaction(true, {
          to: '0x80D8BAc9a6901698b3749Fe336bBd1385C1f98f2',
          tokenId: '12',
          url: 'https://www.seznam.cz',
          fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
          authorAddresses: ['0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF'],
          cashbackValues: ['2'],
          fixedValues: ['0.01'],
          chain: Currency.KLAY,
          contractAddress: '0x44ef7a380c34E76a39Cb00410956dE2aeeaf3B1B',
        }, 'https://api.baobab.klaytn.net:8651/')
        expect(mintedToken).not.toBeNull()
        console.log(await broadcast(mintedToken))
      } catch (e) {
        console.log(e)
      }
    })
    it('should test 721 mint multiple with cashback transaction', async () => {
      const mintedTokens = await prepareKlaytnMintMultipleErc721ProvenanceSignedTransaction(true, {
        to: ['0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF', '0x75Bd6dFA13C0086b9C8C4b510b1F758c720B79BF'],
        tokenId: ['5', '6'],
        url: ['https://www.seznam.cz', 'https://www.seznam.cz'],
        authorAddresses: [['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be'], ['0xD25031B1aB4D82e5fDFb700234b2a22e272232Be']],
        cashbackValues: [['1'], ['1']],
        fixedValues: [['1'], ['1']],
        fromPrivateKey: '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564',
        chain: Currency.KLAY,
        contractAddress: '0xe54a147b6ebe25bda0eec07e8a0051c1b9d08338',
      }, 'https://api.baobab.klaytn.net:8651/')
      expect(mintedTokens).not.toBeNull()
      console.log(await broadcast(mintedTokens))
    })
    it('should test 721 send transaction', async () => {
      const senderc721Token = await prepareKlaytnTransferErc721SignedTransaction(true, {
        to: '0xD25031B1aB4D82e5fDFb700234b2a22e272232Be',
        tokenId: '12',
        fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
        chain: Currency.KLAY,
        provenance: true,
        provenanceData: 'testMatic',
        tokenPrice: '1.5',
        value: '2',
        fee: {
          gasLimit: '1200000',
          gasPrice: '3',
        },
        contractAddress: '0x44ef7a380c34E76a39Cb00410956dE2aeeaf3B1B',
      }, 'https://api.baobab.klaytn.net:8651/')
      console.log(senderc721Token)
      expect(senderc721Token).not.toBeNull()
      console.log(await broadcast(senderc721Token))
    })
    it('should test valid transfer data 721 transaction', async () => {
      const body = new SmartContractReadMethodInvocation()
      body.contractAddress = '0xe54a147b6ebe25bda0eec07e8a0051c1b9d08338';
      body.params = ['1634501273645'];
      body.methodName = 'getTokenData'
      body.methodABI = erc721Provenance_abi.find((a: any) => a.name === 'getTokenData')
      const response = await sendKlaytnSmartContractReadMethodInvocationTransaction(true, body, 'https://api.baobab.klaytn.net:8651/');
      // @ts-ignore
      console.log(JSON.stringify(response))
    })
    it('should test 721 burn transaction', async () => {
      const burn721Token = await prepareKlaytnBurnErc721SignedTransaction(true, {
        tokenId: '5',
        fromPrivateKey: '0xf17abcb517d759efee24bc4859183c7219c588540754318baebb3f9c31449564',
        chain: Currency.KLAY,
        contractAddress: '0xe54a147b6ebe25bda0eec07e8a0051c1b9d08338',
      }, 'https://api.baobab.klaytn.net:8651/')
      expect(burn721Token).not.toBeNull()
      // console.log(await broadcast(burn721Token))
    })

  })

})
