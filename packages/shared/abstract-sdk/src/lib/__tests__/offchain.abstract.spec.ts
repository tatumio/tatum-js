import * as apiClient from '@tatumio/api-client'
import { abstractSdkOffChain } from '../services/offchain.abstract'
import { commonTestFactory, TestCasesApiCallMapping, testHelper } from '@tatumio/shared-testing-common'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('SDK - offchain', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const accountId = 'some-id'
  const index = 1
  const address = 'some-address'

  describe('depositAddress', () => {
    const depositAddress = abstractSdkOffChain().depositAddress

    const api = mockedApi.offChain.account

    const depositAddressFunctionsMapping: TestCasesApiCallMapping<typeof depositAddress> = {
      create: [api.generateDepositAddress, accountId, index],
      createMultiple: [
        api.generateDepositAddressesBatch,
        { addresses: [{ accountId, derivationKey: index }] },
      ],
      checkExists: [api.addressExists, 'DOGE', address, index],
      assign: [api.assignAddress, accountId, address, index],
      getByAccount: [api.getAllDepositAddresses, accountId],
      remove: [api.removeAddress, accountId, address, index],
    }

    describe('API methods mapping', () => {
      commonTestFactory.apiMethods(depositAddress, depositAddressFunctionsMapping)
    })
  })

  it('storeTokenAddress', async () => {
    const name = 'some-name'

    await abstractSdkOffChain().storeTokenAddress(address, name)

    testHelper.expectMockCalled(mockedApi.offChain.blockchain.storeTokenAddress, [address, name])
  })

  describe('withdrawal', () => {
    const withdrawal = abstractSdkOffChain().withdrawal

    const api = mockedApi.offChain.withdrawal

    const withdrawalFunctionsMapping: TestCasesApiCallMapping<typeof withdrawal> = {
      broadcast: [
        api.broadcastBlockchainTransaction,
        { currency: 'DOGE', txData: 'some-data', signatureId: 'some-id' },
      ],
      complete: [api.completeWithdrawal, 'some-withdrawal-id', 'tx-id'],
      create: [
        api.storeWithdrawal,
        { senderAccountId: accountId, address, amout: '10', fee: '20', senderNote: 'hello' },
      ],
      getAll: [api.getWithdrawals, 10, 'DOGE'],
    }

    describe('API methods mapping', () => {
      commonTestFactory.apiMethods(withdrawal, withdrawalFunctionsMapping)
    })
  })
})
