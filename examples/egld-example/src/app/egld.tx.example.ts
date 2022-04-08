import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumEgldSDK } from '@tatumio/egld'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldTxExample() {
  await egldSDK.transaction.send.deploy({
    from: 'erd1uajkmmpxf9s355qmf0nwftc65987fzhzx7gahncymsjvcdwy7tgq7k2ye7',
    fromPrivateKey: '6ee8378f00ac59c597e06a454c2fda821430747caf49a094de38e8ee2e76da68',
    to: 'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
    amount: '0.1',
    fee: {
      gasLimit: '50000',
    },
  })

  await egldSDK.transaction.send.signedTransaction({
    from: 'erd1uajkmmpxf9s355qmf0nwftc65987fzhzx7gahncymsjvcdwy7tgq7k2ye7',
    fromPrivateKey: '6ee8378f00ac59c597e06a454c2fda821430747caf49a094de38e8ee2e76da68',
    to: 'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
    amount: '0.1',
    fee: {
      gasLimit: '50000',
    },
  })

  await egldSDK.transaction.send.smartContractMethodInvocation({
    from: 'erd1uajkmmpxf9s355qmf0nwftc65987fzhzx7gahncymsjvcdwy7tgq7k2ye7',
    fromPrivateKey: '6ee8378f00ac59c597e06a454c2fda821430747caf49a094de38e8ee2e76da68',
    to: 'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
    amount: '0.1',
    fee: {
      gasLimit: '50000',
    },
    data: `{"tokenId": "test", "value": "1"}`,
  })

  await egldSDK.transaction.send.deployNft({
    from: 'erd1uajkmmpxf9s355qmf0nwftc65987fzhzx7gahncymsjvcdwy7tgq7k2ye7',
    fromPrivateKey: '6ee8378f00ac59c597e06a454c2fda821430747caf49a094de38e8ee2e76da68',
    to: 'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
    amount: '1',
    fee: {
      gasLimit: '50000',
    },
    data: `{"tokenId": "testNft", "value": "1", "name": "My Nft", "symbol": "NftSymbol"}`,
  })

  await egldSDK.transaction.send.transferNft({
    from: 'erd1uajkmmpxf9s355qmf0nwftc65987fzhzx7gahncymsjvcdwy7tgq7k2ye7',
    fromPrivateKey: '6ee8378f00ac59c597e06a454c2fda821430747caf49a094de38e8ee2e76da68',
    amount: '1',
    fee: {
      gasLimit: '50000',
    },
    data: `{"tokenId": "testNft", "value": "1", "name": "My Nft", "symbol": "NftSymbol", "to": "erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp"}`,
  })
}
