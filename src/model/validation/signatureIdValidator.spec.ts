import { Currency, GenerateCustodialAddressBatch } from '../request'
import { validateBody } from '../../connector/tatum'

describe('SignatureId validator tests', () => {
  describe('Validations with PK', () => {
    it('should test mint ETH with private key', async () => {
      await validateBody({
        'chain': Currency.ETH,

        batchCount: 1,
        'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
        'owner': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, GenerateCustodialAddressBatch)
    })
    it('should test mint ETH with private key - feesCovered false', async () => {
      await validateBody({
        'chain': Currency.ETH,
        feesCovered: false,
        batchCount: 1,
        'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
        'owner': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, GenerateCustodialAddressBatch)
    })

    it('should not test mint ETH with private key - wrong PK length', async () => {
      try {
        await validateBody({
          'chain': Currency.ETH,
          'url': 'https://www.seznam.cz',

          batchCount: 1,
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805dasdasd89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805dasdasd',
          'owner': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, GenerateCustodialAddressBatch)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint ETH with private key - signatureId present', async () => {
      try {
        await validateBody({
          'chain': Currency.ETH,
          'url': 'https://www.seznam.cz',

          batchCount: 1,
          'fromPrivateKey': '0x89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805',
          'signatureId': '0x89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805',
          'owner': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, GenerateCustodialAddressBatch)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })
  })

  describe('Validations with signature ID', () => {
    it('should test mint ETH', async () => {
      await validateBody({
        'chain': Currency.ETH,
        'url': 'https://www.seznam.cz',
        batchCount: 1,
        'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
        'owner': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, GenerateCustodialAddressBatch)
    })

    it('should not test mint ETH - wrong contractAddress length', async () => {
      try {
        await validateBody({
          'chain': Currency.ETH,
          'url': 'https://www.seznam.cz',

          batchCount: 1,
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'contractAddress': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, GenerateCustodialAddressBatch)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not test mint ETH - wrong signatureId format', async () => {
      try {
        await validateBody({
          'chain': Currency.ETH,
          'url': 'https://www.seznam.cz',

          batchCount: 1,
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fada',
          'owner': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, GenerateCustodialAddressBatch)
        fail('Wrong validation')
      } catch (e) {
        console.log(e)
      }
    })
  })

  describe('Validations with feesCovered', () => {
    it('should mint without PK or signatureID', async () => {
      await validateBody({
        'chain': Currency.ETH,
        'url': 'https://www.seznam.cz',
        feesCovered: true,
        batchCount: 1,
        'owner': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
      }, GenerateCustodialAddressBatch)
    })

    it('should not mint - PK present', async () => {
      try {
        await validateBody({
          'chain': Currency.ETH,
          'url': 'https://www.seznam.cz',
          feesCovered: true,
          batchCount: 1,
          'fromPrivateKey': '89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
          'owner': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, GenerateCustodialAddressBatch)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })

    it('should not mint - signatureId present', async () => {
      try {
        await validateBody({
          'chain': Currency.ETH,
          'url': 'https://www.seznam.cz',
          feesCovered: true,
          batchCount: 1,
          'signatureId': 'e23c9cb0-0650-4d41-b8c1-dfa3f9b76fad',
          'owner': '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        }, GenerateCustodialAddressBatch)
        fail('Should not pass')
      } catch (e) {
        console.log(e)
      }
    })
  })

  it('should not mint - feesCovered not present', async () => {
    try {
      await validateBody({
        'chain': Currency.ETH,
        'url': 'https://www.seznam.cz',
        owner: '0x45871ED5F15203C0ce791eFE5f4B5044833aE10e',
        batchCount: 1,
      }, GenerateCustodialAddressBatch)
      fail('Should not pass')
    } catch (e) {
      console.log(e)
    }
  })
})