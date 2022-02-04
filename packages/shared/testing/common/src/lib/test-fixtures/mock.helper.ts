import * as apiClient from '@tatumio/api-client'
const { ApiError } = jest.requireActual('@tatumio/api-client')

export const mockHelper = {
  /**
   * Make sure to add
   * jest.mock('@tatumio/api-client')
   */
  mockApi: (client: typeof apiClient) => {
    return jest.mocked(client.ApiServices, true)
  },
  apiError: {
    notFound: (status = 403, errorCode = 'errorCode'): typeof ApiError => {
      return new ApiError(
        {
          ok: false,
          status,
          url: 'mocked_url',
          statusText: 'Forbidden',
          body: {
            statusCode: status,
            errorCode,
          },
        },
        '',
      )
    },
  },
}

export type MockedApi = ReturnType<typeof mockHelper.mockApi>
