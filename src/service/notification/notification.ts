import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import {
  AddressTransactionNotificationApi,
  GetAllNotificationsQuery, GetAllExecutedWebhooksQuery,
  Webhook, AddressTransactionNotification,
} from './notification.dto'
import { Subscribe } from './subscribe'
import { ChainMapInverse } from '../tatum/tatum.dto'
import { ErrorUtils, ResponseDto } from '../../util/error'

@Service()
export class Notification {
  private connector: TatumConnector = Container.get(TatumConnector)

  public subscribe: Subscribe = Container.get(Subscribe)

  async getAll(body?: GetAllNotificationsQuery): Promise<ResponseDto<AddressTransactionNotification[]>> {
    return ErrorUtils.tryFail(async () => {
      const subscriptions = await this.connector.get<AddressTransactionNotificationApi[]>({
        path: 'subscription',
        params: {
          pageSize: body?.pageSize?.toString() ?? '10',
          ...(body?.offset && { offset: body.offset.toString() }),
          ...(body?.address && { address: body.address }),
        },
      })
      return subscriptions.map((notification) => ({
        id: notification.id,
        chain: ChainMapInverse[notification.attr.chain],
        address: notification.attr.address,
        url: notification.attr.url,
        type: notification.type,
      }))
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
          pageSize: body?.pageSize?.toString() ?? '10',
          ...(body?.offset && { offset: body.offset.toString() }),
          ...(body?.direction && { direction: body.direction }),
          ...(body?.filterFailed && { failed: body.filterFailed.toString() }),
        },
      }))
  }
}
