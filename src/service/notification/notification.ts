import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import {
  AddressTransactionNotificationApi,
  GetAllNotificationsQuery,
  Notifications,
  NotificationType,
} from './notification.dto'
import { Subscribe } from './subscribe'
import { ChainMapInverse, TatumChain } from '../tatum/tatum.dto'
import { log } from '../../util/decorators/try-catch.decorator'

@Service()
@log
export class Notification {
  private connector: TatumConnector = Container.get(TatumConnector)

  public subscribe: Subscribe = Container.get(Subscribe)

  async getAll(pageSize?: GetAllNotificationsQuery): Promise<Notifications> {
    const notifications = await this.connector.get<AddressTransactionNotificationApi[]>({
      path: 'subscription',
      params: {
        pageSize: pageSize?.pageSize ?? '50',
        offset: pageSize?.offset ?? '0',
        address: pageSize?.address,
      },
    })
    const addressTransactions =  notifications.filter(n => (n.type === NotificationType.ADDRESS_TRANSACTION) && n.attr.chain === TatumChain.ETH)
    return {
      addressTransactions: addressTransactions.map((notification) => ({
        id: notification.id,
        chain: ChainMapInverse[notification.attr.chain],
        address: notification.attr.address,
        url: notification.attr.url,
        type: notification.type,
      })),
    }
  }

  async unsubscribe(id: string): Promise<void> {
    await this.connector.delete({ path: `subscription/${id}` })
  }


}
