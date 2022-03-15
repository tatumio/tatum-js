import '@tatumio/shared-testing-common'
import { terraOffchainService } from '../services/terra.offchain'
import { mockHelper, REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { Currency } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { Tx } from '@terra-money/terra.js'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('TerraSDK - offchain', () => {
  const offchainService = terraOffchainService({
    blockchain: Blockchain.TERRA, apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    provider: 'https://bombay-lcd.terra.dev',
  })

  const PRIVATE_KEY = '42833dd2c36df40d5e4f0ba525d665a25103fc8e01ef86a9d962941855b9902b'
  const ACCOUNT_ID = '1'
  const ACCOUNT = 'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn'
  const AMOUNT = '0.0001'
  const MEMO = '123'
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('send offchain transaction', () => {
    it('valid', async () => {
      mockedApi.ledger.account.getAccountByAccountId.mockResolvedValue({
        currency: Currency.LUNA,
        id: '1',
        frozen: false,
        active: true,
        balance: { accountBalance: '1', availableBalance: '1' },
      })
      mockedApi.offChain.withdrawal.broadcastBlockchainTransaction.mockResolvedValue({ txId: '1234' })
      mockedApi.offChain.withdrawal.storeWithdrawal.mockResolvedValue({ id: '1' })

      const result = await offchainService.send(true, {
        senderAccountId: ACCOUNT_ID,
        address: ACCOUNT,
        amount: AMOUNT,
        fromPrivateKey: PRIVATE_KEY,
        fee: '0.2',
      })

      expect(result.txId).toBe('1234')
      expect(mockedApi.offChain.withdrawal.broadcastBlockchainTransaction).toBeCalled()
      const txData = mockedApi.offChain.withdrawal.broadcastBlockchainTransaction.mock.calls[0][0].txData
      expect(txData).not.toBeNull()
      const tx = Tx.fromBuffer(Buffer.from(txData, 'hex'))
      expect(tx.auth_info.signer_infos).toHaveLength(1)
      expect(tx.body.memo).toBe('')
      expect(tx.body.messages).toHaveLength(1)
      expect(tx.body.messages[0]['from_address']).toBe(ACCOUNT)
      expect(tx.body.messages[0]['to_address']).toBe(ACCOUNT)
      expect(tx.body.messages[0]['amount']._coins.uluna.denom).toBe('uluna')
      expect(tx.auth_info.fee.amount.toData()[0].amount).toBe('200000')
    })

    it('!fee', async () => {

      await expect(
        offchainService.send(true, {
          senderAccountId: ACCOUNT_ID,
          address: ACCOUNT,
          amount: AMOUNT,
          fromPrivateKey: PRIVATE_KEY,
        }),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.FEE_TOO_SMALL)
    })

    it('fee = 0', async () => {

      await expect(
        offchainService.send(true, {
          senderAccountId: ACCOUNT_ID,
          address: ACCOUNT,
          amount: AMOUNT,
          fee: '0',
          fromPrivateKey: PRIVATE_KEY,
        }),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.FEE_TOO_SMALL)
    })
  })
})
