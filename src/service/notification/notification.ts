import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { CreateSubscription, CreateSubscriptionResponse, PageSize } from './notification.dto'

@Service()
export class Notification {
  private connector: TatumConnector = Container.get(TatumConnector)

  getSubscriptions(pageSize?: PageSize) {
    return this.connector.get({
      path: 'subscription',
      params: { pageSize: pageSize?.pageSize ?? '50' },
    })
  }

  async deleteSubscription(id: string): Promise<void> {
    await this.connector.delete({ path: `subscription/${id}` })
  }

  createSubscription({ chain, address, url }: CreateSubscription): Promise<CreateSubscriptionResponse> {
    return this.connector.post({
      path: 'subscription',
      body: {
        type: 'ADDRESS_TRANSACTION',
        attr: {
          chain,
          address,
          url,
        },
      },
    })
  }
}
