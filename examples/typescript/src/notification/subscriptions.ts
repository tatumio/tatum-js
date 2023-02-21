import { initTatum } from '../tatum'
import { Status } from '@tatumcom/js'

export const getAllSubscriptions = async () => {
  const tatum = await initTatum()
  const { data, status, error } = await tatum.notification.getAll()

  if (status === Status.ERROR) {
    console.log(error)
  } else {
    console.log(data)
  }
}
