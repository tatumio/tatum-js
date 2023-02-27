import { AddressNotificationDetail, AddressNotification, NotificationType } from './notification.dto'
import { TatumConnector } from '../../connector/tatum.connector'
import { Container, Service } from 'typedi'
import { Utils } from '../../util/util.shared'
import { IdDto } from '../../dto/shared.dto'
import { ErrorUtils, ResponseDto } from '../../util/error'

@Service({
  factory: (data: { id: string }) => {
    return new Subscribe(data.id)
  }, transient: true,
})
export class Subscribe {
  private id: string
  private connector: TatumConnector


  constructor(id: string) {
    this.id = id
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  /**
   * Subscribe to address event.
   */
  async addressEvent({ chain, address, url }: AddressNotificationDetail): Promise<ResponseDto<AddressNotification>> {
    return ErrorUtils.tryFail(async () => {
      const { id } = await this.connector.post<IdDto>({
        path: 'subscription',
        body: {
          type: NotificationType.ADDRESS_EVENT,
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
    })
  }
}
