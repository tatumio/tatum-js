import {Ethereum, Network, TatumSDK} from '@tatumcom/js'

const run = async () => {
  const tatumSdk = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM_SEPOLIA});
  console.log(await tatumSdk.notification.getAll())
}
run()
