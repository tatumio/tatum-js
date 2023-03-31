import {TatumSDK} from '@tatumcom/js'

const run = async () => {
  const tatumSdk = await TatumSDK.init({rpc: {ignoreLoadBalancing: true}});
  console.log(await tatumSdk.notification.getAll())
}
run()
