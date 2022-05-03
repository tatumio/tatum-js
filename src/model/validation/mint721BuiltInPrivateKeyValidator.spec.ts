import { CeloMintErc721, Currency, EthMintErc721, MintAlgoNft, MintErc721, TronMintTrc721 } from '../request'
import { validateBody } from '../../connector/tatum'

describe('Mint721BuiltInPrivateKeyValidator tests', () => {
  describe('Validations with PK', () => {
    it('should test mint CELO with private key', async () => {
      await validateBody({
        'chain': Currency.CELO,
        'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
        'url': 'https://www.seznam.cz',
        'feeCurrency': Currency.CELO,
        'tokenId': `${Date.now()}`,
        'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
        'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, CeloMintErc721)
    })

    it('should test mint ALGO with private key', async () => {
      await validateBody({
        'chain': Currency.ALGO,
        'tokenId': 'TEST',
        'url': 'https://www.seznam.cz',
        'name': Currency.CELO,
        'fromPrivateKey': '72TCV5BRQPBMSAFPYO3CPWVDBYWNGAYNMTW5QHENOMQF7I6QLNMJWCJZ7A3V5YKD7QD6ZZPEHG2PV2ZVVEDDO6BCRGXWIL3DIUMSUCI',
      }, MintAlgoNft)
    })

    it('should not test mint CELO with private key - wrong tokenId', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'tokenId': `89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d`,
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO with private key - missing tokenId', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO with private key - wrong contractAddress length', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'tokenId': `1`,
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO with private key - wrong PK length', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'tokenId': `1`,
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805dasdasd89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805dasdasd89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805dasdasd',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })
  })

  describe('Validations with signature ID', () => {
    it('should test mint CELO', async () => {
      await validateBody({
        'chain': Currency.CELO,
        'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
        'url': 'https://www.seznam.cz',
        'feeCurrency': Currency.CELO,
        'tokenId': `${Date.now()}`,
        'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
        'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, CeloMintErc721)
    })

    it('should not test mint CELO - wrong tokenId', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'tokenId': `89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d`,
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO - missing tokenId', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO - wrong contractAddress length', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'tokenId': `1`,
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO - wrong signatureId format', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'tokenId': `1`,
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fada',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })
  })

  describe('Built IN contract minting', () => {
    it('should mint CELO without private key or signature id', async () => {
      await validateBody({
        'chain': Currency.CELO,
        'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
        'url': 'https://www.seznam.cz',
        'feeCurrency': Currency.CELO,
      }, CeloMintErc721)
    })

    it('should mint ETH without private key or signature id', async () => {
      await validateBody({
        'chain': Currency.ETH,
        'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
        'url': 'https://www.seznam.cz',
      }, EthMintErc721)
    })

    it('should mint ALGO without private key or signature id', async () => {
      await validateBody({
        'chain': Currency.ALGO,
        'tokenId': 'TEST',
        'url': 'https://www.seznam.cz',
        'name': Currency.CELO,
      }, MintAlgoNft)
    })

    it('should not mint TRON without private key or signature id - we dont mint on tron', async () => {
      try {
        await validateBody({
          'chain': Currency.TRON,
          'to': 'TMk4gbr7KydL52nXUR8VacmbxyUPU31Asj',
          'url': 'https://www.seznam.cz',
        }, TronMintTrc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
      try {
        await validateBody({
          'chain': Currency.TRON,
          'to': 'TMk4gbr7KydL52nXUR8VacmbxyUPU31Asj',
          'url': 'https://www.seznam.cz',
        }, MintErc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })
  })

  describe('Built IN with externalMinter', () => {
    it('should mint without PK or signatureID', async () => {
      await validateBody({
        'chain': Currency.CELO,
        'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
        'url': 'https://www.seznam.cz',
        'feeCurrency': Currency.CELO,
        'tokenId': `${Date.now()}`,
        'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
        'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, CeloMintErc721)
    })

    it('should not mint - PK present', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'tokenId': `${Date.now()}`,
          'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not mint - signatureId present', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'tokenId': `${Date.now()}`,
          'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not mint - tokenId not present', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintErc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not mint - contractAddress not present', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': 'https://www.seznam.cz',
          'feeCurrency': Currency.CELO,
          'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'tokenId': '1',
        }, CeloMintErc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })
  })
})