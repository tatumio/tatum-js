import {
  NotificationType,
  AddressBasedNotificationDetail,
  AddressBasedNotification,
  BlockBasedNotificationDetail,
  BlockBasedNotification,
  FailedTxPerBlockChain,
  IncomingNftTxChain,
  OutgoingInternalTxChain,
  OutgoingNativeTxChain,
  IncomingMultitokenTxChain,
  OutgoingFungibleTxChain,
  OutgoingFailedTxChain,
  IncomingNativeTxChain,
  OutgoingNftTxChain,
  IncomingFungibleTxChain,
  PaidFeeChain, OutgoingMultitokenTxChain, IncomingInternalTxChain
} from './notification.dto'
import { TatumConnector } from '../../connector/tatum.connector'
import { Container, Service } from 'typedi'
import { Utils, ErrorUtils, ResponseDto } from '../../util'
import { IdDto } from '../../dto/shared.dto'
import {Chain} from "../tatum";

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

  private async addressBasedNotification<TChainEnum extends keyof typeof Chain>({address, chain, url}: AddressBasedNotificationDetail<TChainEnum>, type: NotificationType): Promise<ResponseDto<AddressBasedNotification<TChainEnum>>> {
    return ErrorUtils.tryFail(async () => {
      const { id } = await this.connector.post<IdDto>({
        path: 'subscription',
        body: {
          type: type,
          attr: {
            chain: Utils.mapChain(Chain[chain]),
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

  private async blockBasedNotification<TChainEnum extends keyof typeof Chain>({ chain, url }: BlockBasedNotificationDetail<TChainEnum>, type: NotificationType): Promise<ResponseDto<BlockBasedNotification<TChainEnum>>> {
    return ErrorUtils.tryFail(async () => {
      const { id } = await this.connector.post<IdDto>({
        path: 'subscription',
        body: {
          type: type,
          attr: {
            chain: Utils.mapChain(Chain[chain]),
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
  addressEvent = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<Chain>)
    : Promise<ResponseDto<AddressBasedNotification<Chain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.ADDRESS_EVENT)

  /**
   * Subscribe to address event (INCOMING_NATIVE_TX).
   */
  incomingNativeTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<IncomingNativeTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<IncomingNativeTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_NATIVE_TX);

  /**
   * Subscribe to address event (OUTGOING_NATIVE_TX).
   */
  outgoingNativeTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<OutgoingNativeTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<OutgoingNativeTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_NATIVE_TX);

  /**
   * Subscribe to address event (OUTGOING_FAILED_TX).
   */
  outgoingFailedTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<OutgoingFailedTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<OutgoingFailedTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_FAILED_TX);

  /**
   * Subscribe to address event (PAID_FEE).
   */
  paidFee = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<PaidFeeChain>)
    : Promise<ResponseDto<AddressBasedNotification<PaidFeeChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.PAID_FEE);

  /**
   * Subscribe to address event (INCOMING_INTERNAL_TX).
   */
  incomingInternalTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<IncomingInternalTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<IncomingInternalTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_INTERNAL_TX);

  /**
   * Subscribe to address event (OUTGOING_INTERNAL_TX).
   */
  outgoingInternalTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<OutgoingInternalTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<OutgoingInternalTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_INTERNAL_TX);

  /**
   * Subscribe to address event (INCOMING_FUNGIBLE_TX).
   */
  incomingFungibleTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<IncomingFungibleTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<IncomingFungibleTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_FUNGIBLE_TX);

  /**
   * Subscribe to address event (OUTGOING_FUNGIBLE_TX).
   */
  outgoingFungibleTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<OutgoingFungibleTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<OutgoingFungibleTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_FUNGIBLE_TX);

  /**
   * Subscribe to address event (INCOMING_NFT_TX).
   */
  incomingNftTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<IncomingNftTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<IncomingNftTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_NFT_TX);

  /**
   * Subscribe to address event (OUTGOING_NFT_TX).
   */
  outgoingNftTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<OutgoingNftTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<OutgoingNftTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_NFT_TX);

  /**
   * Subscribe to address event (INCOMING_MULTITOKEN_TX).
   */
  incomingMultitokenTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<IncomingMultitokenTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<IncomingMultitokenTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.INCOMING_MULTITOKEN_TX);

  /**
   * Subscribe to address event (OUTGOING_MULTITOKEN_TX).
   */
  outgoingMultitokenTx = async (addressBasedNotificationDetail: AddressBasedNotificationDetail<OutgoingMultitokenTxChain>)
    : Promise<ResponseDto<AddressBasedNotification<OutgoingMultitokenTxChain>>> =>
    this.addressBasedNotification(addressBasedNotificationDetail, NotificationType.OUTGOING_MULTITOKEN_TX);

  /**
   * Subscribe to address event (FAILED_TXS_PER_BLOCK).
   */
  failedTxsPerBlock = async ({chain, url}: BlockBasedNotificationDetail<FailedTxPerBlockChain>)
    : Promise<ResponseDto<BlockBasedNotification<FailedTxPerBlockChain>>> =>
    this.blockBasedNotification({chain, url}, NotificationType.FAILED_TXS_PER_BLOCK)
}
