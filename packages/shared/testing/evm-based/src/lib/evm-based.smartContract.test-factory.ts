import { SdkWithSmartContractFunctions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData } from '@tatumio/shared-testing-common'

export const smartContractTestFactory = {
  prepare: {
    smartContractWriteMethodInvocationTransaction: (
      sdk: SdkWithSmartContractFunctions,
      testData: BlockchainTestData,
    ) => {
      const fromPrivateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const provider = testData.TESTNET?.PROVIDER
      const contractAddress = testData.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS

      it('valid with signatureId', async () => {
        const resultWithSignatureId = await sdk.prepare.smartContractWriteMethodInvocationTransaction(
          {
            contractAddress,
            methodName: 'transferFrom',
            methodABI: {
              constant: false,
              inputs: [
                {
                  name: 'from',
                  type: 'address',
                },
                {
                  name: 'to',
                  type: 'address',
                },
                {
                  name: 'value',
                  type: 'uint256',
                },
              ],
              name: 'transferFrom',
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
            params: [
              '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
              '0x8c76887d2e738371bd750362fb55887343472346',
              '1',
            ],
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            fee: { gasLimit: '100000', gasPrice: '3' },
          },
          provider,
        )
        expect(resultWithSignatureId).not.toBeNull()
      })

      it('valid from privateKey', async () => {
        const resultWithPrivateKey = await sdk.prepare.smartContractWriteMethodInvocationTransaction(
          {
            contractAddress,
            methodName: 'transferFrom',
            methodABI: {
              constant: false,
              inputs: [
                {
                  name: 'from',
                  type: 'address',
                },
                {
                  name: 'to',
                  type: 'address',
                },
                {
                  name: 'value',
                  type: 'uint256',
                },
              ],
              name: 'transferFrom',
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
            params: [
              '0x811dfbff13adfbc3cf653dcc373c03616d3471c9',
              '0x8c76887d2e738371bd750362fb55887343472346',
              '1',
            ],
            fromPrivateKey,
            fee: { gasLimit: '100000', gasPrice: '3' },
          },
          provider,
        )
        expect(resultWithPrivateKey).not.toBeNull()
      })
    },
  },
  send: {
    smartContractReadMethodInvocationTransaction: (
      sdk: SdkWithSmartContractFunctions,
      testData: BlockchainTestData,
    ) => {
      const provider = testData.TESTNET?.PROVIDER
      const contractAddress = testData.TESTNET?.SMART_CONTRACT?.CONTRACT_ADDRESS
      it('should invoke smart contract read', async () => {
        try {
          const result = await sdk.send.smartContractReadMethodInvocationTransaction(
            {
              contractAddress,
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
              params: ['0x9ac64cc6e4415144c455bd8e4837fea55603e5c3'],
            },
            provider,
          )
          expect(result).not.toBeNull()
        } catch (e) {
          expect(e).not.toBeDefined()
        }
      })
    },
  },
}
