import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import {
  AddressEventNotification,
  AddressEventNotificationApi,
  GetAllExecutedWebhooksQuery,
  GetAllNotificationsQuery,
  Webhook,
} from './notification.dto'
import { Subscribe } from './subscribe'
import { ChainMapInverse } from '../tatum'
import { ErrorUtils, ResponseDto } from '../../util'

@Service({
  factory: (data: { id: string }) => {
    return new Notification(data.id)
  },
  transient: true,
})
export class Notification {

  private id: string
  private connector: TatumConnector
  public subscribe: Subscribe

  constructor(id: string) {
    this.id = id
    this.subscribe = Container.of(this.id).get(Subscribe)
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  /**
   * Get all existing subscriptions for given address.
   * @param body
   */
  async getAll(body?: GetAllNotificationsQuery): Promise<ResponseDto<AddressEventNotification[]>> {
    return ErrorUtils.tryFail(async () => {
      const subscriptions = await this.connector.get<AddressEventNotificationApi[]>({
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

  /**
   * Unsubscribe from monitoring of the specific address.
   * @param id ID of a subscription.
   */
  async unsubscribe(id: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => this.connector.delete({ path: `subscription/${id}` }))
  }

  /**
   * Get all fired webhook notifications.
   * @param body
   */
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
