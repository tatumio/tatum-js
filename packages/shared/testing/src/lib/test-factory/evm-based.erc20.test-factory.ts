import { SdkWithErc20Functions } from '@tatumio/shared-blockchain-abstract';
import { BlockchainTestData } from '../shared-testing';

export const erc20TestFactory = {
  decimals: (
    sdk: SdkWithErc20Functions,
    testData: BlockchainTestData,
  ) => {
    describe('mainnet', () => {
      it('valid', async () => {
        // Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
        const result = await sdk.decimals('0x0b9808fce74030c87aae334a30f6c8f6c66b090d')

        console.log(result)
      })
    })
  }
}