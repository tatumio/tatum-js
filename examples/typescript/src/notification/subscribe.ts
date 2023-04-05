import { initTatum } from '../tatum'
import { Chain, Status } from '@tatumcom/js'

export const subscribe = async () => {
  const tatum = await initTatum()
  const { data, status, error } = await tatum.notification.subscribe.addressEvent({
    chain: Chain.Ethereum,
    address: '0xb0D3C544eA882FD174B29DE5DFCb1B4a573BAcaF',
    url: 'https://example.com',
  })

  if (status === Status.ERROR) {
    console.log(new Date().toISOString(), error)
  } else {
    console.log(new Date().toISOString(), data)
  }
  tatum.destroy()
}
