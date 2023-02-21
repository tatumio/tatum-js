import { initTatum } from '../tatum'
import { Status } from '@tatumcom/js'

export const getAllWebhooks = async () => {
  const tatum = await initTatum()
  const { data, status, error } = await tatum.notification.getAllExecutedWebhooks()

  if (status === Status.ERROR) {
    console.log(error)
  } else {
    console.log(data)
  }
}
