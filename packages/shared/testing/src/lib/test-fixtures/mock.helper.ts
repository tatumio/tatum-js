import * as apiClient from '@tatumio/api-client'

export const mockHelper = {
  /**
   * Make sure to add
   * jest.mock('@tatumio/api-client')
   */
  mockApi: (client: typeof apiClient) => {
    return jest.mocked(client.ApiServices, true)
  },
}
