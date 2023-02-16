import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import {
  AddressTransactionNotificationApi,
  GetAllNotificationsQuery, GetAllExecutedWebhooksQuery, Notifications,
  NotificationType, Webhook,
} from './notification.dto'
import { Subscribe } from './subscribe'
import { ChainMapInverse } from '../tatum/tatum.dto'
import { ErrorUtils } from '../../util/error'
import { ResponseDto } from '../../dto/shared.dto'

@Service()
export class Notification {
  private connector: TatumConnector = Container.get(TatumConnector)

  public subscribe: Subscribe = Container.get(Subscribe)

  async getAll(body?: GetAllNotificationsQuery): Promise<ResponseDto<Notifications>> {
    return ErrorUtils.tryFail(async () => {
      const notifications = await this.connector.get<AddressTransactionNotificationApi[]>({
        path: 'subscription',
        params: {
          pageSize: body?.pageSize ?? '50',
          ...(body?.offset && { offset: body.offset }),
          ...(body?.address && { address: body.address }),
        },
      })
      const addressTransactions = notifications.filter(n => (n.type === NotificationType.ADDRESS_TRANSACTION))
      return {
        addressTransactions: addressTransactions.map((notification) => ({
          id: notification.id,
          chain: ChainMapInverse[notification.attr.chain],
          address: notification.attr.address,
          url: notification.attr.url,
          type: notification.type,
        })),
      }
    })
  }

  async unsubscribe(id: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => this.connector.delete({ path: `subscription/${id}` }))
  }

  async getAllExecutedWebhooks(body?: GetAllExecutedWebhooksQuery): Promise<ResponseDto<Webhook[]>> {
    return ErrorUtils.tryFail(async () =>
      this.connector.get<Webhook[]>({
        path: 'subscription/webhook',
        params: {
          pageSize: body?.pageSize ?? '50',
          ...(body?.offset && { offset: body.offset }),
          ...(body?.direction && { direction: body.direction }),
          ...(body?.filterFailed && { failed: body.filterFailed.toString() }),
        },
      }))
  }
}
