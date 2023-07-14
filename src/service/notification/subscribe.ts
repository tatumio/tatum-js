import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { IdDto } from '../../dto'
import { CONFIG, ErrorUtils, ResponseDto, Utils } from '../../util'
import { TatumConfig } from '../tatum'
import {
  AddressBasedNotification,
  AddressBasedNotificationDetail,
  BlockBasedNotification,
  BlockBasedNotificationDetail,
  ContractBasedNotification,
  ContractBasedNotificationDetail,
  NotificationType,
} from './notification.dto'

@Service({
  factory: (data: { id: string }) => {
    return new Subscribe(data.id)
  },
  transient: true,
})
export class Subscribe {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
    this.config = Container.of(this.id).get(CONFIG)
  }

  private async addressBasedNotification(
    { address, url }: AddressBasedNotificationDetail,
    type: NotificationType,
  ): Promise<ResponseDto<AddressBasedNotification>> {
    return ErrorUtils.tryFail(async () => {
      const chain = Utils.mapNetworkToNotificationChain(this.config.network)
      const { id } = await this.connector.post<IdDto>({
        path: 'subscription',
        body: {
          type: type,
          attr: {
            chain,
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

  private async contractBasedNotification(
    { contractAddress, url, event }: ContractBasedNotificationDetail,
    type: NotificationType,
  ): Promise<ResponseDto<ContractBasedNotification>> {
    return ErrorUtils.tryFail(async () => {
      const chain = Utils.mapNetworkToNotificationChain(this.config.network)
      const { id } = await this.connector.post<IdDto>({
        path: 'subscription',
        body: {
          type: type,
          attr: {
            chain,
            contractAddress,
            url,
            event,
          },
        },
      })
      return {
        id,
        contractAddress,
        chain,
        url,
        event,
      }
    })
  }

  private async blockBasedNotification(
    { url }: BlockBasedNotificationDetail,
    type: NotificationType,
  ): Promise<ResponseDto<BlockBasedNotification>> {
    return ErrorUtils.tryFail(async () => {
      const chain = Utils.mapNetworkToNotificationChain(this.config.network)
      const { id } = await this.connector.post<IdDto>({
        path: 'subscription',
        body: {
          type: type,
          attr: {
            chain,
            url,
          },
        },
      })
      return {
        id,
        chain,
        url,
      }
    })
  }

  /**
   * Subscribe to address event.
   */
  addressEvent = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.ADDRESS_EVENT)

  /**
   * Subscribe to incoming native tx.
   */
  incomingNativeTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_NATIVE_TX)

  /**
   * Subscribe to outgoing native tx.
   */
  outgoingNativeTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_NATIVE_TX)

  /**
   * Subscribe to outgoing failed tx.
   */
  outgoingFailedTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_FAILED_TX)

  /**
   * Subscribe to paid fee.
   */
  paidFee = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.PAID_FEE)

  /**
   * Subscribe to incoming internal tx.
   */
  incomingInternalTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_INTERNAL_TX)

  /**
   * Subscribe to outgoing internal tx.
   */
  outgoingInternalTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_INTERNAL_TX)

  /**
   * Subscribe to incoming fungible tx.
   */
  incomingFungibleTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_FUNGIBLE_TX)

  /**
   * Subscribe to outgoing fungible tx.
   */
  outgoingFungibleTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_FUNGIBLE_TX)

  /**
   * Subscribe to incoming NFT tx.
   */
  incomingNftTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_NFT_TX)

  /**
   * Subscribe to outgoing NFT tx.
   */
  outgoingNftTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_NFT_TX)

  /**
   * Subscribe to incoming multitoken tx.
   */
  incomingMultitokenTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_MULTITOKEN_TX)

  /**
   * Subscribe to outgoing multitoken tx.
   */
  outgoingMultitokenTx = async (
    addressBasedNotificationDetail: AddressBasedNotificationDetail,
  ): Promise<ResponseDto<AddressBasedNotification>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_MULTITOKEN_TX)

  /**
   * Subscribe to outgoing multitoken tx.
   */
  contractAddressLogEvent = async (
    contractBasedNotificationDetail: ContractBasedNotificationDetail,
  ): Promise<ResponseDto<ContractBasedNotification>> =>
    this.contractBasedNotification(
      contractBasedNotificationDetail,
      NotificationType.CONTRACT_ADDRESS_LOG_EVENT,
    )

  /**
   * Subscribe to failed txs per block.
   */
  failedTxsPerBlock = async ({
    url,
  }: BlockBasedNotificationDetail): Promise<ResponseDto<BlockBasedNotification>> =>
    this.blockBasedNotification({ url }, NotificationType.FAILED_TXS_PER_BLOCK)
}
