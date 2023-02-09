import { AddressNotification, CreateSubscriptionResponse } from './notification.dto'
import { TatumConnector } from '../../connector/tatum.connector'
import { Container, Service } from 'typedi'
import { Utils } from '../../util/util.shared'

@Service()
export class Subscribe {
  private connector: TatumConnector = Container.get(TatumConnector)

  addressTransaction({ chain, address, url }: AddressNotification): Promise<CreateSubscriptionResponse> {
    return this.connector.post({
      path: 'subscription',
      body: {
        type: 'ADDRESS_TRANSACTION',
        attr: {
          chain: Utils.mapChain(chain),
          address,
          url,
        },
      },
    })
  }
}
