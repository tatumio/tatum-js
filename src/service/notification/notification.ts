import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { PageSize } from './notification.dto'
import { Subscribe } from './subscribe'

@Service()
export class Notification {
  private connector: TatumConnector = Container.get(TatumConnector)

  public subscribe: Subscribe = Container.get(Subscribe)

  getSubscriptions(pageSize?: PageSize) {
    return this.connector.get({
      path: 'subscription',
      params: { pageSize: pageSize?.pageSize ?? '50' },
    })
  }

  async deleteSubscription(id: string): Promise<void> {
    await this.connector.delete({ path: `subscription/${id}` })
  }


}
