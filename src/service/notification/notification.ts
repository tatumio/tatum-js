import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import {
  AddressNotification,
  AddressTransactionNotification,
  AddressTransactionNotificationApi,
  GetAllExecutedWebhooksQuery,
  GetAllNotificationsQuery, Listen,
  NotificationType,
  Webhook,
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
      const notifications = await this.connector.get<AddressTransactionNotificationApi[]>({
        path: 'subscription',
        params: {
          pageSize: body?.pageSize?.toString() ?? '10',
          ...(body?.offset && { offset: body.offset.toString() }),
          ...(body?.address && { address: body.address }),
        },
      })
      const addressTransactions = notifications.filter(n => (n.type === NotificationType.ADDRESS_TRANSACTION))
      return addressTransactions.map((notification) => ({
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

  async listen({ address, chain, handleWebhook, interval }: Listen): Promise<ResponseDto<{ intervalId: NodeJS.Timeout, subscriptionId: string }>> {
    return ErrorUtils.tryFail(async () => {
      const { data: subscription, error } = await this.subscribe.addressTransaction({
        url: 'https://dashboard.tatum.io/webhook-handler',
        chain,
        address,
      })
      const now = Date.now()
      const executedWebhooks: string[] = []

      if (error) {
        throw new Error(error.message.toString())
      }

      const poll = async (executedWebhooks: string[], now: number, subscription: AddressNotification) => {
        try {
          console.log('testing')
          const { data } = await this.getAllExecutedWebhooks()
          const filteredWebhooks = data.filter(webhook => now > webhook.timestamp && webhook.subscriptionId === subscription.id && !executedWebhooks.includes(webhook.id))
          console.log(filteredWebhooks)
          if (filteredWebhooks.length > 0) {
            try {
              await handleWebhook()
            } catch (e) {
              console.log(`Webhook execution failed.`)
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
      const intervalId = setInterval(() => poll(executedWebhooks, now, subscription), interval)
      return {
        intervalId,
        subscriptionId: subscription.id
      }
    })
  }
}
