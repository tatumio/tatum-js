import {TatumSdk} from '@tatumcom/js'

const run = async () => {
  const tatumSdk = await TatumSdk.init({rpc: {ignoreLoadBalancing: true}});
  console.log(await tatumSdk.notification.getAll())
}
run()
