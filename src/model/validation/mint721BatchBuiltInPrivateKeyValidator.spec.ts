import { CeloMintMultipleErc721, Currency, MintErc721, TronMintMultipleTrc721 } from '../request'
import { validateBody } from '../../connector/tatum'

describe('Mint721BatchBuiltInPrivateKeyValidator tests', () => {
  describe('Validations with PK', () => {
    it('should test mint CELO with private key', async () => {
      await validateBody({
        'chain': Currency.CELO,
        'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
        'url': ['https://www.seznam.cz'],
        'feeCurrency': Currency.CELO,
        'tokenId': [`${Date.now()}`],
        'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
        'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, CeloMintMultipleErc721)
    })

    it('should not test mint CELO with private key - missing tokenId', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO with private key - both PK and sigID are present', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          tokenId: ['123'],
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO with private key - wrong contractAddress length', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'tokenId': [`1`],
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO with private key - wrong PK length', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'tokenId': [`1`],
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805dasdasd',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
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
        'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
        'url': ['https://www.seznam.cz'],
        'feeCurrency': Currency.CELO,
        'tokenId': [`${Date.now()}`],
        'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
        'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, CeloMintMultipleErc721)
    })

    it('should not test mint CELO - missing tokenId', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO - wrong contractAddress length', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'tokenId': [`1`],
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint CELO - wrong signatureId format', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'tokenId': [`1`],
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fada',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })
  })

  describe('Built IN contract minting', () => {
    it('should not mint CELO without private key or signature id', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'tokenId': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'contractAddress': '0xBCa2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
        }, CeloMintMultipleErc721)
        fail('should not pass')
      } catch (e) {
        console.error(e)
      }
    })

    it('should not mint TRON without private key or signature id - we dont mint on tron', async () => {
      try {
        await validateBody({
          'chain': Currency.TRON,
          'to': ['TMk4gbr7KydL52nXUR8VacmbxyUPU31Asj'],
          'url': ['https://www.seznam.cz'],
        }, TronMintMultipleTrc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
      try {
        await validateBody({
          'chain': Currency.TRON,
          'to': ['TMk4gbr7KydL52nXUR8VacmbxyUPU31Asj'],
          'url': ['https://www.seznam.cz'],
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
        'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
        'url': ['https://www.seznam.cz'],
        'feeCurrency': Currency.CELO,
        'tokenId': [`${Date.now()}`],
        'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
        'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, CeloMintMultipleErc721)
    })

    it('should not mint - PK present', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'tokenId': [`${Date.now()}`],
          'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not mint - signatureId present', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'tokenId': [`${Date.now()}`],
          'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not mint - tokenId not present', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, CeloMintMultipleErc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not mint - contractAddress not present', async () => {
      try {
        await validateBody({
          'chain': Currency.CELO,
          'to': ['0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F'],
          'url': ['https://www.seznam.cz'],
          'feeCurrency': Currency.CELO,
          'minter': '0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F',
          'tokenId': ['1'],
        }, CeloMintMultipleErc721)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })
  })
})