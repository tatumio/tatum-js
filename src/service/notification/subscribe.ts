import { AddressNotificationDetail, AddressNotification, NotificationType } from './notification.dto'
import { TatumConnector } from '../../connector/tatum.connector'
import { Container, Service } from 'typedi'
import { Utils } from '../../util/util.shared'
import { IdDto } from '../../dto/shared.dto'

@Service()
export class Subscribe {
  private connector: TatumConnector = Container.get(TatumConnector)

  async addressTransaction({ chain, address, url }: AddressNotificationDetail): Promise<AddressNotification> {
    const { id } = await this.connector.post<IdDto>({
      path: 'subscription',
      body: {
        type: NotificationType.ADDRESS_TRANSACTION,
        attr: {
          chain: Utils.mapChain(chain),
          address,
          url,
        },
      },
    })
    return {
      id,
      address,
      chain,
      url,
    }
  }
}
