import {
  Currency,
  deployMultiToken,
  mintMultiToken,
  mintMultiTokenBatch,
  burnMultiToken,
  burnMultiTokenBatch,
  transferMultiToken,
  transferMultiTokenBatch,
  prepareAddMultiTokenMinter,
  sendAddMultiTokenMinter,
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
  getMultiTokenTransactionsByAddress,
} from '@tatumio/tatum-defi'

describe('Multitoken tests - ETH', () => {
  jest.setTimeout(99999)
  process.env.TATUM_API_KEY = 'd341d8f5-5f6a-43ca-a57c-c67839d1a1cb'
  it('should deploy multitoken', async () => {
    try {
      const body = {
        chain: Currency.ETH,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        uri: 'tatum-test',
      }
      const deployMultiTokenToken = await deployMultiToken(true, body)
      expect(deployMultiTokenToken).toBeDefined()
      console.log('Deploy multi token: ', deployMultiTokenToken)
    } catch (e) {
      console.log('Deploy multi token error: ', e.response)
      expect(e).not.toBeDefined()
    }
  })

  it('should prepare minter', async () => {
    try {
      const minter = await prepareAddMultiTokenMinter(true, {
        minter: '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef',
        chain: Currency.ETH,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
      })
      console.log('Prepare add multitoken minter: ', minter)
      expect(minter).toBeDefined()
    } catch (e) {
      console.log('Prepare add multitoken minter error: ', e.response)
      expect(e).not.toBeDefined()
    }
  })

  it('should send minter', async () => {
    try {
      const minter = await sendAddMultiTokenMinter(true, {
        minter: '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef',
        chain: Currency.ETH,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
      })
      console.log('Send add multitoken minter: ', minter)
      expect(minter).toBeDefined()
    } catch (e) {
      console.log('Send add multitoken minter error: ', e)
      expect(e).not.toBeDefined()
    }
  })

  it('should mint multitoken', async () => {
    try {
      const tokenId = new Date().getTime() + 1
      const body = {
        to: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
        chain: Currency.ETH,
        tokenId: tokenId.toString(),
        data: '0x1234',
        amount: '100',
        fromPrivateKey: '0xc313f7e1303ce1c344df819d1d48c79a834c493c73e12b4389bfb50127c8aaa7',
        contractAddress: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
      }
      const mintedToken = await mintMultiToken(true, body)
      console.log('Mint multitoken: ', mintedToken)
      expect(mintedToken).toBeDefined()
    } catch (e) {
      console.log('Mint multitoken error: ', e.response)
      expect(e).not.toBeDefined()
    }
  })

  it('should mint multitoken batch', async () => {
    try {
      const firstTokenId = new Date().getTime() + 2
      const secondTokenId = new Date().getTime() + 3
      const tokenId = [
        [firstTokenId.toString(), secondTokenId.toString()],
        [firstTokenId.toString(), secondTokenId.toString()],
      ]
      const body = {
        to: ['0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88', '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88'],
        chain: Currency.ETH,
        tokenId,
        data: '0x1234',
        amounts: [
          ['100', '100'],
          ['100', '100'],
        ],
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
      }
      const mintedToken = await mintMultiTokenBatch(true, body)
      console.log('Mint multitoken batch: ', mintedToken)
      expect(mintedToken).toBeDefined()
    } catch (e) {
      console.log('Mint multitoken batch error: ', e.response)
      expect(e).not.toBeDefined()
    }
  })

  it('should burn multitoken', async () => {
    try {
      const tokenId = new Date().getTime() + 4
      const body = {
        account: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
        tokenId: tokenId.toString(),
        amount: '1',
        chain: Currency.ETH,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
      }
      const burnMultiTokenToken = await burnMultiToken(true, body)
      console.log(burnMultiTokenToken)
      expect(burnMultiTokenToken).toBeDefined()
    } catch (e) {
      console.log('Burn multitoken error: ', e.response)
      expect(e).not.toBeDefined()
    }
  })

  it('should burn batch multitoken', async () => {
    try {
      const firstTokenId = new Date().getTime() + 10
      const secondTokenId = new Date().getTime() + 12
      const body = {
        account: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        amounts: ['10', '10'],
        chain: Currency.ETH,
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
      }
      const burnMultiTokenToken = await burnMultiTokenBatch(true, body)
      expect(burnMultiTokenToken).toBeDefined()
    } catch (e) {
      console.log('Burn multitoken batch error: ', e.response)
      expect(e).not.toBeDefined()
    }
  })

  it('should transfer multitoken', async () => {
    try {
      const tokenId = new Date().getTime() + 20
      const body = {
        to: '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef',
        chain: Currency.ETH,
        tokenId: tokenId.toString(),
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
        amount: '1',
        data: '0x1234',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
      }
      const sendMultiTokenToken = await transferMultiToken(true, body)
      console.log('Transfer multitoken: ', sendMultiTokenToken)
      expect(sendMultiTokenToken).toBeDefined()
    } catch (e) {
      console.log('Transfer multitoken error: ', e.response)
      expect(e).not.toBeDefined()
    }
  })

  it('should transfer multitoken batch', async () => {
    const firstTokenId = new Date().getTime() + 30
    const secondTokenId = new Date().getTime() + 40

    try {
      const body = {
        to: '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef',
        chain: Currency.ETH,
        tokenId: [firstTokenId.toString(), secondTokenId.toString()],
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        contractAddress: '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88',
        amounts: ['10', '10'],
        data: '0x1234',
        fee: {
          gasLimit: '5000000',
          gasPrice: '100',
        },
      }
      const sendMultiTokenToken = await transferMultiTokenBatch(true, body)
      console.log('Transfer multitoken batch: ', sendMultiTokenToken)
      expect(sendMultiTokenToken).toBeDefined()
    } catch (e) {
      console.log('Transfer multitoken batch error: ', e.response)
      expect(e).not.toBeDefined()
    }
  })

  it('should get multitoken contract address', async () => {
    try {
      const txId = '0xa6bce2332117e5e3e29393aa3e3931bdeef3f913438ee446ce9f517b52544e6c'
      const contractAddress = await getMultiTokenContractAddress(Currency.ETH, txId)
      expect(contractAddress).toBeDefined()
      console.log('Get multitoken contract address: ', contractAddress)
    } catch (e) {
      console.log('Get multitoken contract address error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should get multitoken transaction', async () => {
    try {
      const txId = '0xa6bce2332117e5e3e29393aa3e3931bdeef3f913438ee446ce9f517b52544e6c'
      const transaction = await getMultiTokenTransaction(Currency.ETH, txId)
      expect(transaction).toBeDefined()
      console.log('Get multitoken transaction: ', transaction)
    } catch (e) {
      console.log('Get multitoken transaction error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should get multitoken metadata', async () => {
    try {
      const contractAddress = '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88'
      const tokenId = new Date().getTime() + 50
      const metadata = await getMultiTokenMetadata(Currency.ETH, contractAddress, tokenId.toString())
      expect(metadata).toBeDefined()
      console.log('Get multitoken metadata: ', metadata)
    } catch (e) {
      console.log('Get multitoken metadata error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should get multitoken balance', async () => {
    try {
      const contractAddress = '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88'
      const tokenId = new Date().getTime() + 60
      const account = '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef'
      const balance = await getMultiTokensBalance(Currency.ETH, contractAddress, account, tokenId.toString())
      expect(balance).toBeDefined()
      console.log('Get multitoken balance ', balance)
    } catch (e) {
      console.log('Get multitoken balance error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })

  it('should multitoken balance batch', async () => {
    try {
      const address = '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef'
      const contractAddress = '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88'
      const firstTokenId = new Date().getTime() + 70
      const secondTokenId = new Date().getTime() + 80
      const tokenIds = [firstTokenId.toString(), secondTokenId.toString()].toString()
      const batchBalance = await getMultiTokensBatchBalance(Currency.ETH, contractAddress, address, tokenIds)
      expect(batchBalance).toBeDefined()
      console.log('Get multitoken balance batch: ', batchBalance)
    } catch (e) {
      console.log('Get multitoken balance batch error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
  it('should get multitoken transactions by address', async () => {
    try {
      const address = '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef'
      const tokenAddress = '0xe520E9aB6d4CF47C3e270e42Cef63F437Df19E88'
      const transactions = await getMultiTokenTransactionsByAddress(Currency.ETH, address, tokenAddress, 1, 0)
      expect(transactions).toBeDefined()
      console.log('Get multitoken transactions by address: ', transactions)
    } catch (e) {
      console.log('Get multitoken transactions by address error: ', e.response.data)
      expect(e).not.toBeDefined()
    }
  })
})
