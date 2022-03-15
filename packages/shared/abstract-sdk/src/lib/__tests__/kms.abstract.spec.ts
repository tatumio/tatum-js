import * as apiClient from '@tatumio/api-client'
import { commonTestFactory, TestCasesApiCallMapping } from '@tatumio/shared-testing-common'
import { abstractSdkKms } from '../services/kms.abstract'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('SDK - kms', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const kms = abstractSdkKms()
  const api = mockedApi.kms

  const pendingId = 'id-of-pending'
  const kmsFunctionsMapping: TestCasesApiCallMapping<typeof kms> = {
    complete: [api.completePendingSignature, pendingId, 'tx-id'],
    delete: [api.deletePendingTransactionToSign, pendingId, true],
    get: [api.getPendingTransactionToSign, pendingId],
  }

  describe('API methods mapping', () => {
    commonTestFactory.apiMethods(kms, kmsFunctionsMapping)
  })
})
