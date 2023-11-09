import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector'
import { ErrorUtils, ResponseDto, Utils } from '../../util'
import {
  AddressEventNotificationApi,
  ContractAddressLogEventNotificationApi,
  GetAllExecutedWebhooksQuery,
  GetAllSubscriptionsQuery,
  NotificationSubscription,
  NotificationType,
  Webhook,
} from './notification.dto'
import { Subscribe } from './subscribe'

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
  async getAll(body?: GetAllSubscriptionsQuery): Promise<ResponseDto<NotificationSubscription[]>> {
    return ErrorUtils.tryFail(async () => {
      const subscriptions = await this.connector.get<
        [AddressEventNotificationApi | ContractAddressLogEventNotificationApi]
      >({
        path: 'subscription',
        params: {
          pageSize: body?.pageSize?.toString() ?? '10',
          ...(body?.offset && { offset: body.offset.toString() }),
          ...(body?.address && { address: body.address }),
        },
      })

      return subscriptions.map((notification) => {
        const result: Partial<NotificationSubscription> = {
          id: notification.id,
          network: Utils.mapNotificationChainToNetwork(notification.attr.chain),
          url: notification.attr.url,
          type: notification.type,
        }

        if (notification.type === NotificationType.CONTRACT_ADDRESS_LOG_EVENT) {
          return {
            ...result,
            contractAddress: notification.attr.contractAddress,
            event: notification.attr.event,
          } as NotificationSubscription
        }

        if (notification.attr.address) {
          return {
            ...result,
            address: notification.attr.address,
          } as NotificationSubscription
        }

        return result as NotificationSubscription
      })
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
      }),
    )
  }
}
