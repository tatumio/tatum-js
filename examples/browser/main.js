import { Network, TatumSdk } from '@tatumcom/js'

const run = async () => {
  const tatumSdk = await TatumSdk.init({ apiKey: '452826a8-5cd4-4c46-b710-e130934b5102_1000', network: Network.Testnet });
  const { data } = await tatumSdk.getApiInfo()
  console.log(data)
  console.log(await tatumSdk.notification.getAll())
}
run()
